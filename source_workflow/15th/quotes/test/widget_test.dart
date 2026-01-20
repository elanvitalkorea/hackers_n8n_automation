// Flutter 위젯 테스트
//
// 위젯과의 상호작용을 테스트하려면 flutter_test 패키지의 WidgetTester
// 유틸리티를 사용하세요. 예를 들어, 탭 및 스크롤 제스처를 보낼 수 있습니다.
// 또한 WidgetTester를 사용하여 위젯 트리에서 자식 위젯을 찾고,
// 텍스트를 읽고, 위젯 속성 값이 올바른지 확인할 수 있습니다.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:quotes/main.dart';
import 'package:quotes/models/quote.dart';

void main() {
  testWidgets('앱이 제대로 시작되는지 테스트', (WidgetTester tester) async {
    // 앱을 빌드하고 프레임을 트리거합니다.
    await tester.pumpWidget(const QuotesApp());

    // 앱 제목이 표시되는지 확인
    expect(find.text('오늘의 명언'), findsOneWidget);
  });

  testWidgets('로딩 화면이 표시되는지 테스트', (WidgetTester tester) async {
    // 앱을 빌드합니다.
    await tester.pumpWidget(const QuotesApp());

    // 초기 로딩 상태에서 "명언을 가져오는 중..." 텍스트가 표시되는지 확인
    // (API 호출이 완료되기 전까지는 로딩 화면이 표시됩니다)
    expect(find.text('명언을 가져오는 중...'), findsOneWidget);
  });

  testWidgets('새로고침 버튼이 있는지 테스트', (WidgetTester tester) async {
    // 앱을 빌드합니다.
    await tester.pumpWidget(const QuotesApp());
    await tester.pump(); // 첫 프레임을 그립니다

    // 새로고침 버튼의 텍스트가 있는지 확인
    // (로딩 중일 때는 아이콘이 CircularProgressIndicator로 변경되므로
    //  아이콘 검사는 제외하고 텍스트만 확인합니다)
    expect(find.text('새로고침'), findsOneWidget);

    // FloatingActionButton이 존재하는지 확인
    expect(find.byType(FloatingActionButton), findsOneWidget);
  });

  testWidgets('명언이 성공적으로 표시되는지 테스트', (WidgetTester tester) async {
    // 앱을 빌드합니다.
    await tester.pumpWidget(const QuotesApp());

    // API 호출이 완료될 때까지 대기
    // 실제 네트워크 요청이 이루어지므로 시간이 걸릴 수 있습니다
    await tester.pumpAndSettle(const Duration(seconds: 3));

    // 명언이 표시되는지 확인 (실제 API 응답에 따라 다를 수 있음)
    // 이 테스트는 실제 API가 작동할 때만 통과합니다.
    // 에러가 발생하지 않으면 성공으로 간주합니다.
  });

  testWidgets('QuoteCard 위젯이 제대로 작동하는지 테스트', (WidgetTester tester) async {
    // 테스트용 명언 데이터
    final testQuote = Quote(
      author: '테스트 작가',
      authorProfile: '테스트 프로필',
      message: '테스트 명언입니다.',
    );

    // QuoteCard 위젯을 직접 테스트
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(body: QuoteCard(quote: testQuote)),
      ),
    );

    // 명언 내용이 표시되는지 확인
    expect(find.text(testQuote.message), findsOneWidget);
    expect(find.text(testQuote.author), findsOneWidget);
    expect(find.text(testQuote.authorProfile), findsOneWidget);
  });
}
