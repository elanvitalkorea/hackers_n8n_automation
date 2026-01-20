import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import '../models/business_card.dart';
import '../utils/constants.dart';

// 웹에서는 File을 사용하지 않으므로, 실제 사용은 kIsWeb 체크로 보호됨
// Flutter 웹 빌드 시 트리 셰이킹으로 제거됨
import 'dart:io' show File;

class OCRService {
  static Future<BusinessCard> recognizeBusinessCard(
    String imagePath, {
    Uint8List? imageBytes,
  }) async {
    try {
      // Upstage OCR API 호출 (multipart/form-data)
      // API key는 Constants에서 환경변수로부터 로드되며, 없으면 예외가 발생함
      final request = http.MultipartRequest(
        'POST',
        Uri.parse(Constants.upstageApiEndpoint),
      );
      
      request.headers['Authorization'] = 'Bearer ${Constants.upstageApiKey}';
      
      // 웹에서는 바이트 데이터 사용, 모바일에서는 파일 경로 사용
      if (kIsWeb) {
        if (imageBytes == null) {
          throw Exception('웹 환경에서는 이미지 바이트 데이터가 필요합니다.');
        }
        request.files.add(
          http.MultipartFile.fromBytes(
            'document',
            imageBytes,
            filename: 'image.jpg',
          ),
        );
      } else {
        // 모바일(iOS/Android)에서는 파일 경로 사용
        final file = File(imagePath);
        if (!await file.exists()) {
          throw Exception('이미지 파일을 찾을 수 없습니다: $imagePath');
        }
        request.files.add(
          await http.MultipartFile.fromPath('document', file.path),
        );
      }
      request.fields['model'] = 'ocr';

      final streamedResponse = await request.send();
      final response = await http.Response.fromStream(streamedResponse);

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return _parseOCRResponse(data);
      } else {
        throw Exception('OCR API 호출 실패: ${response.statusCode} - ${response.body}');
      }
    } catch (e) {
      throw Exception('OCR 인식 중 오류 발생: $e');
    }
  }

  static BusinessCard _parseOCRResponse(Map<String, dynamic> data) {
    // Upstage OCR API 응답 형식에 맞게 파싱
    // API는 텍스트를 반환하므로, 텍스트를 파싱하여 명함 필드 추출
    final text = data['text'] ?? '';
    final pages = data['pages'] as List<dynamic>?;
    
    // 모든 페이지의 텍스트를 합침
    String fullText = text;
    if (pages != null && pages.isNotEmpty) {
      final pageTexts = pages.map((page) => page['text'] as String? ?? '').toList();
      fullText = pageTexts.join('\n');
    }

    // 간단한 텍스트 파싱으로 명함 정보 추출
    // 실제로는 더 정교한 파싱이나 NER(Named Entity Recognition) 사용 권장
    return BusinessCard(
      name: _extractName(fullText),
      email: _extractEmail(fullText),
      phone: _extractPhone(fullText),
      company: _extractCompany(fullText),
      position: _extractPosition(fullText),
      website: _extractWebsite(fullText),
      address: _extractAddress(fullText),
    );
  }

  static String? _extractName(String text) {
    // 이메일 주소 앞의 텍스트를 이름으로 추정
    final emailRegex = RegExp(r'([a-zA-Z가-힣\s]+)\s*[<\(]?\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})');
    final match = emailRegex.firstMatch(text);
    if (match != null && match.group(1) != null) {
      return match.group(1)!.trim();
    }
    // 첫 번째 줄을 이름으로 추정 (간단한 방법)
    final lines = text.split('\n').where((line) => line.trim().isNotEmpty).toList();
    if (lines.isNotEmpty) {
      return lines[0].trim();
    }
    return null;
  }

  static String? _extractEmail(String text) {
    final emailRegex = RegExp(r'([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})');
    final match = emailRegex.firstMatch(text);
    return match?.group(1);
  }

  static String? _extractPhone(String text) {
    // 전화번호 패턴 (한국 형식 포함)
    final phoneRegex = RegExp(r'(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}');
    final match = phoneRegex.firstMatch(text);
    return match?.group(0);
  }

  static String? _extractCompany(String text) {
    // 회사명 키워드 찾기
    final companyKeywords = ['주식회사', '㈜', 'Inc', 'Corp', 'Ltd', 'Co', '회사'];
    final lines = text.split('\n');
    for (final line in lines) {
      for (final keyword in companyKeywords) {
        if (line.contains(keyword)) {
          return line.trim();
        }
      }
    }
    return null;
  }

  static String? _extractPosition(String text) {
    final positionKeywords = ['대표', '사장', '부장', '과장', '차장', '대리', '주임', 'CEO', 'CTO', 'CFO', 'Manager', 'Director'];
    final lines = text.split('\n');
    for (final line in lines) {
      for (final keyword in positionKeywords) {
        if (line.contains(keyword)) {
          return line.trim();
        }
      }
    }
    return null;
  }

  static String? _extractWebsite(String text) {
    final websiteRegex = RegExp(r'(https?://[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})');
    final match = websiteRegex.firstMatch(text);
    return match?.group(0);
  }

  static String? _extractAddress(String text) {
    // 주소 패턴 (한국 주소 형식)
    final addressKeywords = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충청', '전라', '경상', '제주'];
    final lines = text.split('\n');
    for (final line in lines) {
      for (final keyword in addressKeywords) {
        if (line.contains(keyword) && line.length > 5) {
          return line.trim();
        }
      }
    }
    return null;
  }
}

