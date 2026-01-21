import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/business_card.dart';
import '../utils/constants.dart';

class N8nService {
  static Future<bool> sendBusinessCard(BusinessCard card) async {
    try {
      final response = await http.post(
        Uri.parse(Constants.n8nWebhookUrl),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(card.toJson()),
      );

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return true;
      } else {
        throw Exception('n8n 웹훅 전송 실패: ${response.statusCode} - ${response.body}');
      }
    } catch (e) {
      throw Exception('n8n 전송 중 오류 발생: $e');
    }
  }
}

