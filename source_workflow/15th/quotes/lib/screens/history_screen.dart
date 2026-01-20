// HistoryScreen 위젯
// StatefulWidget 예시: 저장된 명언 목록을 표시하는 화면입니다.
//
// StatefulWidget의 특징:
// - 상태(state)를 관리합니다
// - setState()를 사용하여 상태를 변경하고 UI를 업데이트할 수 있습니다
// - API 호출 결과를 저장하고 화면에 표시합니다
import 'package:flutter/material.dart';
import '../services/quote_history_service.dart';

class HistoryScreen extends StatefulWidget {
  const HistoryScreen({super.key});

  @override
  State<HistoryScreen> createState() => _HistoryScreenState();
}

// State 클래스: 실제 상태 관리와 로직이 있는 곳입니다
class _HistoryScreenState extends State<HistoryScreen> {
  // 상태 변수들
  List<Map<String, dynamic>> _quotes = []; // 저장된 명언 목록
  bool _isLoading = false; // 로딩 중인지 여부
  String? _errorMessage; // 에러 메시지 (있다면)

  // 위젯이 처음 생성될 때 호출되는 메서드
  @override
  void initState() {
    super.initState();
    // 화면이 열릴 때 자동으로 저장된 명언 목록을 가져옵니다
    _loadQuotes();
  }

  // Supabase에서 저장된 명언 목록을 가져오는 메서드
  Future<void> _loadQuotes() async {
    // 로딩 상태로 변경
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      // QuoteHistoryService를 사용하여 명언 목록을 가져옵니다
      final quotes = await QuoteHistoryService.getQuotes();

      // setState()를 호출하여 상태를 업데이트합니다
      // 이렇게 하면 build() 메서드가 다시 호출되어 UI가 업데이트됩니다
      setState(() {
        _quotes = quotes;
        _isLoading = false;
      });
    } catch (e) {
      // 에러가 발생한 경우
      setState(() {
        _errorMessage = '명언을 불러오는데 실패했습니다: $e';
        _isLoading = false;
      });
    }
  }

  // 날짜/시간을 읽기 쉬운 형식으로 변환하는 메서드
  String _formatDateTime(String dateTimeString) {
    try {
      final dateTime = DateTime.parse(dateTimeString);
      final now = DateTime.now();
      final difference = now.difference(dateTime);

      // 오늘인 경우
      if (difference.inDays == 0) {
        if (difference.inHours == 0) {
          if (difference.inMinutes == 0) {
            return '방금 전';
          }
          return '${difference.inMinutes}분 전';
        }
        return '${difference.inHours}시간 전';
      }
      // 어제인 경우
      if (difference.inDays == 1) {
        return '어제';
      }
      // 그 외의 경우: YYYY-MM-DD 형식
      return '${dateTime.year}-${dateTime.month.toString().padLeft(2, '0')}-${dateTime.day.toString().padLeft(2, '0')}';
    } catch (e) {
      return dateTimeString;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('명언 히스토리'),
        // 새로고침 버튼 추가
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _isLoading ? null : _loadQuotes,
            tooltip: '새로고침',
          ),
        ],
      ),
      body: _buildBody(),
    );
  }

  // body 내용을 빌드하는 메서드
  Widget _buildBody() {
    // 로딩 중일 때
    if (_isLoading) {
      return const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircularProgressIndicator(),
            SizedBox(height: 16),
            Text('명언을 불러오는 중...'),
          ],
        ),
      );
    }

    // 에러가 발생한 경우
    if (_errorMessage != null) {
      return Center(
        child: Padding(
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
              ElevatedButton(
                onPressed: _loadQuotes,
                child: const Text('다시 시도'),
              ),
            ],
          ),
        ),
      );
    }

    // 명언 목록이 비어있는 경우
    if (_quotes.isEmpty) {
      return const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.history, size: 64, color: Colors.grey),
            SizedBox(height: 16),
            Text(
              '저장된 명언이 없습니다.',
              style: TextStyle(fontSize: 16, color: Colors.grey),
            ),
          ],
        ),
      );
    }

    // 명언 목록을 리스트로 표시
    // 리스트 형태로 간단한 텍스트로 표시합니다
    // ListView.builder는 자동으로 스크롤 가능합니다
    return ListView.builder(
      padding: const EdgeInsets.all(16.0),
      itemCount: _quotes.length,
      // 스크롤 동작을 명시적으로 활성화
      physics: const AlwaysScrollableScrollPhysics(),
      itemBuilder: (context, index) {
        final quoteData = _quotes[index];
        final createdAt = quoteData['created_at'] as String? ?? '';

        return Card(
          margin: const EdgeInsets.only(bottom: 12.0),
          elevation: 2,
          child: ListTile(
            contentPadding: const EdgeInsets.all(16.0),
            title: Text(
              quoteData['message'] as String? ?? '',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
            ),
            subtitle: Padding(
              padding: const EdgeInsets.only(top: 8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '${quoteData['author'] as String? ?? ''} - ${quoteData['author_profile'] as String? ?? ''}',
                    style: TextStyle(fontSize: 14, color: Colors.grey[600]),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    _formatDateTime(createdAt),
                    style: TextStyle(fontSize: 12, color: Colors.grey[500]),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
