// 환경 변수 관리 클래스
// StatelessWidget 개념을 보여주기 위한 예시로, 상태가 없는 유틸리티 클래스입니다.
//
// StatelessWidget의 특징:
// - 상태(state)가 없습니다
// - 한 번 설정되면 변경되지 않는 값들을 관리합니다
// - build() 메서드가 없지만, 비슷한 개념으로 정적 메서드를 제공합니다
import 'package:flutter_dotenv/flutter_dotenv.dart';

class Env {
  // 생성자를 private로 만들어서 인스턴스 생성을 막습니다
  // 이는 모든 메서드가 static이므로 인스턴스가 필요 없기 때문입니다
  Env._();

  // Supabase URL을 가져오는 메서드
  static String get supabaseUrl {
    return dotenv.env['SUPABASE_URL'] ?? '';
  }

  // Supabase Anon Key를 가져오는 메서드
  static String get supabaseAnonKey {
    return dotenv.env['SUPABASE_ANON_KEY'] ?? '';
  }

  // 환경 변수가 제대로 로드되었는지 확인하는 메서드
  static bool get isLoaded => dotenv.isInitialized;
}

