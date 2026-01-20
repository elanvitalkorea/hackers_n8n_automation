// QuoteHistoryService 클래스
// StatelessWidget 개념을 보여주기 위한 예시로, 상태가 없는 서비스 클래스입니다.
//
// StatelessWidget의 특징:
// - 상태(state)가 없습니다
// - 데이터를 받아서 처리만 하고, 자체적으로 상태를 변경하지 않습니다
// - 여러 곳에서 재사용 가능한 유틸리티 역할을 합니다
import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/quote.dart';

class QuoteHistoryService {
  // 생성자를 private로 만들어서 인스턴스 생성을 막습니다
  // 모든 메서드가 static이므로 인스턴스가 필요 없기 때문입니다
  QuoteHistoryService._();

  // Supabase 클라이언트 인스턴스를 가져옵니다
  static SupabaseClient get _supabase => Supabase.instance.client;

  // 명언을 Supabase에 저장하는 메서드
  // async/await를 사용하여 비동기 작업을 처리합니다
  static Future<void> saveQuote(Quote quote) async {
    try {
      // quotes_history 테이블에 데이터를 삽입합니다
      await _supabase.from('quotes_history').insert({
        'author': quote.author,
        'author_profile': quote.authorProfile,
        'message': quote.message,
        // created_at은 데이터베이스에서 자동으로 설정됩니다
      });
    } catch (e) {
      // 에러가 발생하면 예외를 다시 던집니다
      // 호출하는 쪽에서 에러 처리를 할 수 있도록 합니다
      throw Exception('명언 저장 실패: $e');
    }
  }

  // 저장된 명언 목록을 조회하는 메서드
  // 최신순으로 정렬하여 최대 30개까지 반환합니다
  static Future<List<Map<String, dynamic>>> getQuotes() async {
    try {
      // quotes_history 테이블에서 데이터를 조회합니다
      // created_at을 기준으로 내림차순 정렬 (최신순)
      // limit(30)으로 최대 30개까지만 가져옵니다
      final response = await _supabase
          .from('quotes_history')
          .select()
          .order('created_at', ascending: false)
          .limit(30);

      // response는 List<Map<String, dynamic>> 형태입니다
      return List<Map<String, dynamic>>.from(response);
    } catch (e) {
      // 에러가 발생하면 예외를 다시 던집니다
      throw Exception('명언 조회 실패: $e');
    }
  }
}

