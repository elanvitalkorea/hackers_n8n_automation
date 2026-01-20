import 'package:flutter_dotenv/flutter_dotenv.dart';

class Constants {
  // Upstage OCR API (환경변수에서 로드)
  static String get upstageApiKey {
    final key = dotenv.env['UPSTAGE_API_KEY'];
    if (key == null || key.isEmpty) {
      throw Exception(
        'UPSTAGE_API_KEY가 설정되지 않았습니다. .env 파일을 확인하세요.',
      );
    }
    return key;
  }

  static String get upstageApiEndpoint {
    return dotenv.env['UPSTAGE_API_ENDPOINT'] ??
        'https://api.upstage.ai/v1/document-digitization';
  }

  // n8n Webhook URL (환경변수에서 로드)
  static String get n8nWebhookUrl {
    final url = dotenv.env['N8N_WEBHOOK_URL'];
    if (url == null || url.isEmpty) {
      throw Exception(
        'N8N_WEBHOOK_URL이 설정되지 않았습니다. .env 파일을 확인하세요.',
      );
    }
    return url;
  }

  // Colors
  static const int primaryBlack = 0xFF000000;
  static const int primaryWhite = 0xFFFFFFFF;
  static const int accentYellow = 0xFFFFD700;
  static const int accentYellow2 = 0xFFFFC107;
}

