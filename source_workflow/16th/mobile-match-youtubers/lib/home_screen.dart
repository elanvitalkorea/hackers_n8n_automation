import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'detail_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  IconData _getStatusIcon(String? status) {
    switch (status) {
      case 'pending_approval':
        return Icons.warning_amber_rounded;
      case 'pending_proposal_approval':
        return Icons.edit_note_rounded;
      case 'completed':
        return Icons.check_circle_outline_rounded;
      default:
        return Icons.hourglass_empty_rounded;
    }
  }

  Color _getStatusColor(String? status) {
    switch (status) {
      case 'pending_approval':
        return Colors.amber;
      case 'pending_proposal_approval':
        return Colors.orange;
      case 'completed':
        return Colors.green;
      default:
        return Colors.grey;
    }
  }

  String _extractFileName(String? s3Key) {
    if (s3Key == null || s3Key.isEmpty) return 'Unknown';
    final parts = s3Key.split('/');
    return parts.isNotEmpty ? parts.last : s3Key;
  }

  String _getCampaignTitle(Map<String, dynamic> campaign) {
    // ai_analysis에서 회사명과 제품명을 추출하여 제목 생성
    final aiAnalysis = campaign['ai_analysis'];
    if (aiAnalysis != null && aiAnalysis is Map) {
      final companyName = aiAnalysis['companyName'] as String?;
      final productName = aiAnalysis['productName'] as String?;
      
      if (companyName != null && companyName.isNotEmpty && 
          productName != null && productName.isNotEmpty) {
        return '$companyName - $productName';
      } else if (companyName != null && companyName.isNotEmpty) {
        return companyName;
      } else if (productName != null && productName.isNotEmpty) {
        return productName;
      }
    }
    
    // ai_analysis가 없으면 s3_key에서 파일명 추출
    final s3Key = campaign['s3_key'] as String?;
    return _extractFileName(s3Key);
  }

  Widget _buildSection({
    required BuildContext context,
    required String title,
    required String subtitle,
    required IconData icon,
    required Color color,
    required List<Map<String, dynamic>> campaigns,
  }) {
    if (campaigns.isEmpty) {
      return const SizedBox.shrink();
    }

    return Card(
      margin: EdgeInsets.zero,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 섹션 헤더
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              children: [
                Icon(icon, color: color, size: 24),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: color,
                        ),
                      ),
                      if (subtitle.isNotEmpty)
                        Text(
                          '($subtitle)',
                          style: TextStyle(
                            fontSize: 12,
                            color: color.withOpacity(0.7),
                          ),
                        ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: color.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    '${campaigns.length}',
                    style: TextStyle(
                      color: color,
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const Divider(height: 1),
          // 섹션 내 항목 리스트
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: campaigns.length,
            itemBuilder: (context, index) {
              final campaign = campaigns[index];
              final status = campaign['status'] as String? ?? 'unknown';

              return ListTile(
                leading: Icon(
                  _getStatusIcon(status),
                  color: _getStatusColor(status),
                  size: 28,
                ),
                title: Text(
                  _getCampaignTitle(campaign),
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                  ),
                ),
                subtitle: Text(
                  _extractFileName(campaign['s3_key'] as String?),
                  style: TextStyle(
                    color: Colors.grey[400],
                    fontSize: 13,
                  ),
                ),
                trailing: const Icon(Icons.chevron_right, size: 20),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => DetailScreen(
                        campaignData: campaign,
                      ),
                    ),
                  );
                },
              );
            },
          ),
        ],
      ),
    );
  }


  @override
  Widget build(BuildContext context) {
    final supabase = Supabase.instance.client;

    return Scaffold(
      appBar: AppBar(
        title: const Text('AI Agent C&C 대시보드'),
        centerTitle: true,
        elevation: 0,
      ),
      body: StreamBuilder<List<Map<String, dynamic>>>(
        stream: supabase
            .from('campaigns')
            .stream(primaryKey: ['id'])
            .order('created_at', ascending: false),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }

          if (snapshot.hasError) {
            return Center(
              child: Padding(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.error_outline,
                      size: 64,
                      color: Colors.red,
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      '데이터 로드 오류',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Colors.red,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      '${snapshot.error}',
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 14,
                        color: Colors.grey,
                      ),
                    ),
                    const SizedBox(height: 24),
                    const Text(
                      '확인 사항:',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      '1. Supabase 연결 상태 확인\n'
                      '2. RLS 정책이 올바르게 설정되었는지 확인\n'
                      '3. 네트워크 연결 확인',
                      textAlign: TextAlign.left,
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey,
                      ),
                    ),
                  ],
                ),
              ),
            );
          }

          final campaigns = snapshot.data ?? [];

          // 상태별로 캠페인 분류
          final pendingApproval = campaigns.where((c) => (c['status'] as String? ?? '') == 'pending_approval').toList();
          final pendingProposal = campaigns.where((c) => (c['status'] as String? ?? '') == 'pending_proposal_approval').toList();
          final completed = campaigns.where((c) => (c['status'] as String? ?? '') == 'completed').toList();

          // 모든 섹션이 비어있을 때
          if (pendingApproval.isEmpty && pendingProposal.isEmpty && completed.isEmpty) {
            return const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.inbox_outlined,
                    size: 64,
                    color: Colors.grey,
                  ),
                  SizedBox(height: 16),
                  Text(
                    '대기 중인 캠페인이 없습니다.',
                    style: TextStyle(fontSize: 16, color: Colors.grey),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'S3에 파일이 있어도 Agent 1이 분석하기 전까지는\n대시보드에 표시되지 않습니다.',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 12, color: Colors.grey),
                  ),
                ],
              ),
            );
          }

          return SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // 1차 섹션: 제출 상태 (1차 승인 대기)
                _buildSection(
                  context: context,
                  title: '1차 승인 대기',
                  subtitle: 'AI 분석 검토 필요',
                  icon: Icons.warning_amber_rounded,
                  color: Colors.amber,
                  campaigns: pendingApproval,
                ),
                const SizedBox(height: 16),

                // 2차 섹션: 제안서 승인 필요 (2차 승인 대기)
                _buildSection(
                  context: context,
                  title: '2차 승인 대기',
                  subtitle: '제안서 검토 필요',
                  icon: Icons.edit_note_rounded,
                  color: Colors.orange,
                  campaigns: pendingProposal,
                ),
                const SizedBox(height: 16),

                // 3차 섹션: 완료
                _buildSection(
                  context: context,
                  title: '완료',
                  subtitle: '',
                  icon: Icons.check_circle_outline_rounded,
                  color: Colors.green,
                  campaigns: completed,
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

