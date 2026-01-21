import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:convert';
import 'models/quote.dart';
import 'config/env.dart';
import 'services/quote_history_service.dart';
import 'screens/history_screen.dart';

// main() 함수는 앱의 시작점입니다
// async 함수로 만들어서 비동기 초기화 작업을 수행합니다
Future<void> main() async {
  // Flutter 위젯 바인딩을 초기화합니다
  WidgetsFlutterBinding.ensureInitialized();

  // .env 파일을 로드합니다
  await dotenv.load(fileName: '.env');

  // Supabase를 초기화합니다
  // 환경 변수에서 URL과 anon key를 가져옵니다
  await Supabase.initialize(
    url: Env.supabaseUrl,
    anonKey: Env.supabaseAnonKey,
  );

  // 앱을 실행합니다
  runApp(const QuotesApp());
}

// StatelessWidget 예시: MyApp
// StatelessWidget은 상태(state)가 없는 위젯입니다.
// 즉, 위젯이 생성된 후 변경할 수 있는 데이터가 없습니다.
// 앱의 기본 설정(테마, 라우팅 등)은 변경되지 않으므로 StatelessWidget이 적합합니다.
class QuotesApp extends StatelessWidget {
  const QuotesApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '오늘의 명언',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.brown),
        useMaterial3: true,
      ),
      // 초기 화면을 DisplayScreen으로 설정
      initialRoute: '/',
      routes: {
        '/': (context) => const DisplayScreen(),
        '/history': (context) => const HistoryScreen(),
      },
    );
  }
}

// StatelessWidget 예시: QuoteCard
// 이 위젯은 명언 데이터를 받아서 화면에 표시만 합니다.
// 자체적으로 상태를 변경하지 않으므로 StatelessWidget이 적합합니다.
//
// StatelessWidget의 특징:
// - build() 메서드만 가지고 있습니다
// - setState()를 사용할 수 없습니다
// - 부모 위젯으로부터 데이터를 받아서 표시합니다
class QuoteCard extends StatelessWidget {
  final Quote quote;

  const QuoteCard({super.key, required this.quote});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.all(16.0),
      elevation: 4,
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            // 명언 내용
            Text(
              quote.message,
              style: const TextStyle(
                fontSize: 18,
                height: 1.6,
                fontWeight: FontWeight.w400,
              ),
            ),
            const SizedBox(height: 24),
            // 구분선
            const Divider(),
            const SizedBox(height: 16),
            // 작가 이름
            Text(
              quote.author,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 4),
            // 작가 프로필
            Text(
              quote.authorProfile,
              style: TextStyle(fontSize: 14, color: Colors.grey[600]),
            ),
          ],
        ),
      ),
    );
  }
}

// StatefulWidget 예시: DisplayScreen
// 이 위젯은 상태(state)를 관리합니다.
// API에서 명언을 가져오고, 로딩 상태를 관리하며, 새로고침 버튼을 누르면 상태를 변경합니다.
//
// StatefulWidget의 특징:
// - State 클래스를 별도로 가집니다 (_DisplayScreenState)
// - setState()를 사용하여 상태를 변경하고 UI를 업데이트할 수 있습니다
// - 상태가 변경되면 build() 메서드가 다시 호출되어 화면이 업데이트됩니다
class DisplayScreen extends StatefulWidget {
  const DisplayScreen({super.key});

  @override
  State<DisplayScreen> createState() => _DisplayScreenState();
}

// State 클래스: 실제 상태 관리와 로직이 있는 곳입니다
class _DisplayScreenState extends State<DisplayScreen> {
  // 상태 변수들
  Quote? _quote; // 현재 표시할 명언 (null일 수 있음)
  bool _isLoading = false; // 로딩 중인지 여부
  String? _errorMessage; // 에러 메시지 (있다면)

  // 위젯이 처음 생성될 때 호출되는 메서드
  @override
  void initState() {
    super.initState();
    // 앱 시작 시 자동으로 첫 번째 명언을 가져옵니다
    _fetchQuote();
  }

  // API에서 명언을 가져오는 메서드
  // async/await를 사용하여 비동기 작업을 처리합니다
  Future<void> _fetchQuote() async {
    // 로딩 상태로 변경
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      // HTTP GET 요청을 보냅니다
      final response = await http.get(
        Uri.parse('https://korean-advice-open-api.vercel.app/api/advice'),
      );

      // HTTP 응답이 성공적인지 확인 (200번대 상태 코드)
      if (response.statusCode == 200) {
        // JSON 문자열을 Dart 객체(Map)로 변환
        final jsonData = json.decode(response.body) as Map<String, dynamic>;

        // Quote 모델로 변환
        final quote = Quote.fromJson(jsonData);

        // 명언을 Supabase에 저장합니다
        // 에러가 발생해도 화면 표시에는 영향을 주지 않도록 try-catch로 감쌉니다
        try {
          await QuoteHistoryService.saveQuote(quote);
        } catch (e) {
          // 저장 실패는 무시하고 계속 진행합니다
          // 실제 앱에서는 사용자에게 알림을 표시할 수도 있습니다
          debugPrint('명언 저장 실패: $e');
        }

        // setState()를 호출하여 상태를 업데이트합니다
        // 이렇게 하면 build() 메서드가 다시 호출되어 UI가 업데이트됩니다
        setState(() {
          _quote = quote;
          _isLoading = false;
        });
      } else {
        // HTTP 요청이 실패한 경우
        setState(() {
          _errorMessage = '명언을 가져오는데 실패했습니다. (${response.statusCode})';
          _isLoading = false;
        });
      }
    } catch (e) {
      // 네트워크 오류 등 예외가 발생한 경우
      setState(() {
        _errorMessage = '오류가 발생했습니다: $e';
        _isLoading = false;
      });
    }
  }

  // History 화면으로 이동하는 메서드
  void _navigateToHistory() {
    Navigator.pushNamed(context, '/history');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('오늘의 명언'),
      ),
      body: Center(child: _buildBody()),
      // 하단에 새로고침 버튼과 history 버튼 배치
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            children: [
              // 새로고침 버튼
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: _isLoading ? null : _fetchQuote,
                  icon: _isLoading
                      ? const SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                          ),
                        )
                      : const Icon(Icons.refresh),
                  label: const Text('새로고침'),
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              // History 버튼
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: _navigateToHistory,
                  icon: const Icon(Icons.history),
                  label: const Text('히스토리'),
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // body 내용을 빌드하는 메서드
  Widget _buildBody() {
    // 로딩 중일 때
    if (_isLoading && _quote == null) {
      return const Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CircularProgressIndicator(),
          SizedBox(height: 16),
          Text('명언을 가져오는 중...'),
        ],
      );
    }

    // 에러가 발생한 경우
    if (_errorMessage != null && _quote == null) {
      return Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.error_outline, size: 64, color: Colors.red),
            const SizedBox(height: 16),
            Text(
              _errorMessage!,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 16),
            ElevatedButton(onPressed: _fetchQuote, child: const Text('다시 시도')),
          ],
        ),
      );
    }

    // 명언이 있는 경우
    if (_quote != null) {
      return SingleChildScrollView(child: QuoteCard(quote: _quote!));
    }

    // 기본 상태 (명언이 없고 로딩도 안 되는 경우)
    return const Text('명언을 불러올 수 없습니다.');
  }
}
