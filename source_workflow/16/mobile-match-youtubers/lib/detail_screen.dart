import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:http/http.dart' as http;

class DetailScreen extends StatefulWidget {
  final Map<String, dynamic> campaignData;

  const DetailScreen({
    super.key,
    required this.campaignData,
  });

  @override
  State<DetailScreen> createState() => _DetailScreenState();
}

class _DetailScreenState extends State<DetailScreen> {
  bool _isLoading = false;

  Future<void> _triggerN8nAgent({
    required String webhookUrl,
    required String campaignId,
  }) async {
    // campaignId 검증
    if (campaignId.isEmpty) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('오류: 캠페인 ID가 없습니다.'),
            backgroundColor: Colors.red,
          ),
        );
      }
      return;
    }

    setState(() {
      _isLoading = true;
    });

    try {
      final response = await http.post(
        Uri.parse(webhookUrl),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'campaign_id': campaignId}),
      );

      if (response.statusCode >= 200 && response.statusCode < 300) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('승인 요청이 전송되었습니다.'),
              backgroundColor: Colors.green,
            ),
          );
          Navigator.pop(context);
        }
      } else {
        // 응답 본문에서 오류 메시지 추출 시도
        String errorMessage = '오류 발생: ${response.statusCode}';
        try {
          final errorBody = json.decode(response.body);
          if (errorBody is Map && errorBody.containsKey('error')) {
            errorMessage = '오류: ${errorBody['error']}';
          } else if (errorBody is Map && errorBody.containsKey('message')) {
            errorMessage = '오류: ${errorBody['message']}';
          } else {
            errorMessage = '오류 발생: ${response.statusCode}\n${response.body}';
          }
        } catch (_) {
          // JSON 파싱 실패 시 원본 응답 본문 사용
          if (response.body.isNotEmpty) {
            errorMessage = '오류 발생: ${response.statusCode}\n${response.body}';
          }
        }

        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(errorMessage),
              backgroundColor: Colors.red,
              duration: const Duration(seconds: 5),
            ),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('네트워크 오류: $e'),
            backgroundColor: Colors.red,
            duration: const Duration(seconds: 5),
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  Widget _buildActionButton() {
    final status = widget.campaignData['status'] as String?;
    final campaignId = widget.campaignData['id']?.toString() ?? '';

    if (status == 'pending_approval') {
      return ElevatedButton.icon(
        onPressed: _isLoading
            ? null
            : () {
                final webhookUrl = dotenv.env['N8N_WEBHOOK_URL_APPROVE'];
                if (webhookUrl == null || webhookUrl.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text(
                          '웹훅 URL이 설정되지 않았습니다.\n.env 파일의 N8N_WEBHOOK_URL_APPROVE를 확인하세요.'),
                      backgroundColor: Colors.red,
                      duration: Duration(seconds: 5),
                    ),
                  );
                  return;
                }

                // campaignId 검증
                if (campaignId.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('오류: 캠페인 ID가 없습니다.\n데이터를 다시 불러와주세요.'),
                      backgroundColor: Colors.red,
                      duration: Duration(seconds: 5),
                    ),
                  );
                  return;
                }

                _triggerN8nAgent(
                  webhookUrl: webhookUrl,
                  campaignId: campaignId,
                );
              },
        icon: const Icon(Icons.check_circle),
        label: const Text('✅ 1차 승인 (AI 분석 검토 완료)'),
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          minimumSize: const Size(double.infinity, 56),
        ),
      );
    } else if (status == 'pending_proposal_approval') {
      return ElevatedButton.icon(
        onPressed: _isLoading
            ? null
            : () {
                final webhookUrl = dotenv.env['N8N_WEBHOOK_URL_CONTRACT'];
                if (webhookUrl == null || webhookUrl.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text(
                          '웹훅 URL이 설정되지 않았습니다.\n.env 파일의 N8N_WEBHOOK_URL_CONTRACT를 확인하세요.'),
                      backgroundColor: Colors.red,
                      duration: Duration(seconds: 5),
                    ),
                  );
                  return;
                }

                // campaignId 검증
                if (campaignId.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('오류: 캠페인 ID가 없습니다.\n데이터를 다시 불러와주세요.'),
                      backgroundColor: Colors.red,
                      duration: Duration(seconds: 5),
                    ),
                  );
                  return;
                }

                _triggerN8nAgent(
                  webhookUrl: webhookUrl,
                  campaignId: campaignId,
                );
              },
        icon: const Icon(Icons.edit_note),
        label: const Text('✍️ 2차 승인 (제안서 검토 완료)'),
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          minimumSize: const Size(double.infinity, 56),
        ),
      );
    } else {
      return ElevatedButton(
        onPressed: null,
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          minimumSize: const Size(double.infinity, 56),
        ),
        child: Text(
          status == 'completed' ? '🎉 작업 완료' : '처리 중...',
          style: const TextStyle(fontSize: 16),
        ),
      );
    }
  }

  // AI 분석 데이터에서 회사명과 제품명 추출
  String _getCompanyName(Map<String, dynamic>? aiAnalysis) {
    if (aiAnalysis == null) return '';
    return aiAnalysis['companyName'] as String? ?? '';
  }

  String _getProductName(Map<String, dynamic>? aiAnalysis) {
    if (aiAnalysis == null) return '';
    return aiAnalysis['productName'] as String? ?? '';
  }

  // JSON을 Map으로 변환
  Map<String, dynamic>? _parseAiAnalysis(dynamic aiAnalysis) {
    if (aiAnalysis == null) return null;
    try {
      if (aiAnalysis is String) {
        return json.decode(aiAnalysis) as Map<String, dynamic>?;
      } else if (aiAnalysis is Map) {
        return aiAnalysis as Map<String, dynamic>;
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  // Key-Value 레이블 위젯 생성 (기본 정보용)
  Widget _buildKeyValueRow(String label, dynamic value, {IconData? icon}) {
    String displayValue;
    if (value == null) {
      displayValue = 'N/A';
    } else if (value is num) {
      displayValue = value.toString();
    } else if (value is bool) {
      displayValue = value ? '예' : '아니오';
    } else {
      displayValue = value.toString();
    }

    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 20, color: Colors.grey[400]),
            const SizedBox(width: 8),
          ],
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey[400],
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 4),
                SelectableText(
                  displayValue,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // 중요 정보 Chip 위젯 생성 (예산, 성과 목표 등)
  Widget _buildImportantChip({
    required String label,
    required dynamic value,
    required Color color,
    IconData? icon,
    String? suffix,
  }) {
    String displayValue;
    if (value == null) {
      displayValue = 'N/A';
    } else if (value is num) {
      if (value is double && value < 1) {
        // 퍼센트 값 (예: 0.03 -> 3.0%)
        displayValue = '${(value * 100).toStringAsFixed(1)}%';
      } else {
        displayValue =
            value.toStringAsFixed(value.truncateToDouble() == value ? 0 : 1);
      }
    } else {
      displayValue = value.toString();
    }

    if (suffix != null) {
      displayValue = '$displayValue $suffix';
    }

    return Container(
      margin: const EdgeInsets.only(right: 8, bottom: 8),
      child: Chip(
        avatar: icon != null ? Icon(icon, size: 16, color: color) : null,
        label: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Flexible(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    label,
                    style: TextStyle(
                      fontSize: 10,
                      color: color.withOpacity(0.8),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    displayValue,
                    style: TextStyle(
                      fontSize: 14,
                      color: color,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        backgroundColor: color.withOpacity(0.15),
        side: BorderSide(color: color.withOpacity(0.3), width: 1),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      ),
    );
  }

  // 최종 선정 유튜버 데이터 파싱 (단일 객체를 리스트로 변환하여 처리)
  // Agent 2가 최종적으로 선택한 단일 유튜버 1명을 파싱합니다.
  List<Map<String, dynamic>>? _parseMatchedYoutubers(dynamic matchedYoutubers) {
    if (matchedYoutubers == null) return null;
    try {
      if (matchedYoutubers is String) {
        final decoded = json.decode(matchedYoutubers);
        if (decoded is List) {
          return decoded.cast<Map<String, dynamic>>();
        } else if (decoded is Map) {
          // 단일 객체인 경우 리스트로 변환
          return [decoded.cast<String, dynamic>()];
        }
      } else if (matchedYoutubers is List) {
        return matchedYoutubers.cast<Map<String, dynamic>>();
      } else if (matchedYoutubers is Map) {
        // 단일 객체인 경우 리스트로 변환
        return [matchedYoutubers.cast<String, dynamic>()];
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  // 최종 선정 유튜버 카드 위젯 생성
  Widget _buildMatchedYoutuberCard(Map<String, dynamic> youtuber, int index) {
    final channelName = youtuber['channel_name'] as String? ?? 'Unknown';
    final costPerVideo =
        youtuber['cost_per_video_usd'] as num?; // 집행예산 (Agent 2가 총 예산으로 덮어쓴 값)
    final originalCost =
        youtuber['original_cost_per_video_usd'] as num?; // 원본 단가
    final avgCpm = youtuber['avg_cpm'] as num?;
    final avgCtr = youtuber['avg_ctr_percent'] as num?;
    // similarity는 reason 필드에 포함되어 있으므로 별도 표시하지 않음
    final reason = youtuber['reason'] as String?;
    final contentSummary = youtuber['content_summary'] as String?;

    return Card(
      margin: const EdgeInsets.only(bottom: 12.0),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  width: 32,
                  height: 32,
                  decoration: BoxDecoration(
                    color: Colors.amber.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: const Center(
                    child: Icon(
                      Icons.star,
                      color: Colors.amber,
                      size: 20,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    channelName,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
            if (contentSummary != null && contentSummary.isNotEmpty) ...[
              const SizedBox(height: 12),
              Text(
                contentSummary,
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.grey[300],
                ),
              ),
            ],
            const SizedBox(height: 12),
            // 원본 단가와 집행예산 구분 표시
            if (originalCost != null || costPerVideo != null) ...[
              Row(
                children: [
                  if (originalCost != null) ...[
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          color: Colors.grey[800],
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(
                            color: Colors.grey[600]!,
                            width: 1,
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              '원본 단가',
                              style: TextStyle(
                                fontSize: 11,
                                color: Colors.grey[400],
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              '\$${originalCost.toStringAsFixed(0)}',
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                  ],
                  if (costPerVideo != null) ...[
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          color: Colors.green.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(
                            color: Colors.green.withOpacity(0.5),
                            width: 1,
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                const Icon(
                                  Icons.attach_money,
                                  size: 14,
                                  color: Colors.green,
                                ),
                                const SizedBox(width: 4),
                                Text(
                                  '집행예산',
                                  style: TextStyle(
                                    fontSize: 11,
                                    color: Colors.green[300],
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 4),
                            Text(
                              '\$${costPerVideo.toStringAsFixed(0)}',
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ],
              ),
              const SizedBox(height: 12),
            ],
            // 성과 지표 Chip (AI 유사도 제외)
            Wrap(
              spacing: 12,
              runSpacing: 8,
              children: [
                if (avgCpm != null)
                  Chip(
                    label: Text('CPM: ${avgCpm.toStringAsFixed(0)}'),
                    backgroundColor: Colors.blue.withOpacity(0.2),
                    labelStyle: const TextStyle(fontSize: 12),
                  ),
                if (avgCtr != null)
                  Chip(
                    label: Text('CTR: ${avgCtr.toStringAsFixed(1)}%'),
                    backgroundColor: Colors.orange.withOpacity(0.2),
                    labelStyle: const TextStyle(fontSize: 12),
                  ),
              ],
            ),
            if (reason != null && reason.isNotEmpty) ...[
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.blue.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(
                    color: Colors.blue.withOpacity(0.3),
                    width: 1,
                  ),
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Icon(
                      Icons.lightbulb_outline,
                      size: 16,
                      color: Colors.blue,
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        reason,
                        style: TextStyle(
                          fontSize: 13,
                          color: Colors.grey[200],
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final status = widget.campaignData['status'] as String? ?? 'unknown';
    final aiAnalysis = widget.campaignData['ai_analysis'];
    final matchedYoutubers = widget.campaignData['matched_youtubers'];
    final generatedProposal =
        widget.campaignData['generated_proposal'] as String?;
    final generatedContract =
        widget.campaignData['generated_contract'] as String?;
    final finalContractS3Key =
        widget.campaignData['final_contract_s3_key'] as String?;

    // AI 분석 데이터 파싱
    final parsedAnalysis = _parseAiAnalysis(aiAnalysis);
    final companyName = _getCompanyName(parsedAnalysis);
    final productName = _getProductName(parsedAnalysis);

    // 최종 선정 유튜버 데이터 파싱 (단일 객체)
    final parsedMatchedYoutubers = _parseMatchedYoutubers(matchedYoutubers);

    // 필드명 매핑 (한글)
    final fieldLabels = {
      'companyName': '회사명',
      'advertiserName': '광고주명',
      'email': '이메일',
      'productName': '제품/서비스명',
      'budgetUSD': '캠페인 총 예산 (USD)',
      'targetDemographics': '핵심 타겟 인구통계',
      'targetCPM': '목표 CPM',
      'targetCTR': '목표 CTR (%)',
      'details': '캠페인 상세 내용',
      'summary': '캠페인 핵심 의도',
    };

    // 상태에 따른 타이틀 결정
    String appBarTitle;
    if (status == 'pending_approval') {
      appBarTitle = '캠페인 상세 승인';
    } else if (status == 'pending_proposal_approval') {
      appBarTitle = '제안서 검토';
    } else if (status == 'completed') {
      appBarTitle = '캠페인 완료 결과';
    } else {
      appBarTitle = '캠페인 상세';
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(appBarTitle),
        centerTitle: true,
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // 회사명/제품명 헤더 (제일 위)
                if (companyName.isNotEmpty || productName.isNotEmpty) ...[
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          if (companyName.isNotEmpty)
                            Text(
                              companyName,
                              style: const TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          if (companyName.isNotEmpty && productName.isNotEmpty)
                            const SizedBox(height: 8),
                          if (productName.isNotEmpty)
                            Text(
                              productName,
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.w600,
                                color: Colors.grey[300],
                              ),
                            ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                ],

                // 섹션 1: 상태별 메인 콘텐츠
                // 1차 승인 대기: 제출 내용 (AI 분석 결과 포함)
                if (status == 'pending_approval') ...[
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const Icon(
                                Icons.description_outlined,
                                color: Colors.white70,
                                size: 24,
                              ),
                              const SizedBox(width: 8),
                              const Text(
                                '제출 내용',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white70,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 20),

                          // 기본 정보 섹션
                          if (parsedAnalysis != null &&
                              (parsedAnalysis['companyName'] != null ||
                                  parsedAnalysis['advertiserName'] != null ||
                                  parsedAnalysis['email'] != null ||
                                  parsedAnalysis['productName'] != null)) ...[
                            Text(
                              '기본 정보',
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                color: Colors.grey[300],
                              ),
                            ),
                            const SizedBox(height: 12),
                            if (parsedAnalysis['companyName'] != null)
                              _buildKeyValueRow(
                                fieldLabels['companyName'] ?? '회사명',
                                parsedAnalysis['companyName'],
                                icon: Icons.business,
                              ),
                            if (parsedAnalysis['advertiserName'] != null)
                              _buildKeyValueRow(
                                fieldLabels['advertiserName'] ?? '광고주명',
                                parsedAnalysis['advertiserName'],
                                icon: Icons.person,
                              ),
                            if (parsedAnalysis['email'] != null)
                              _buildKeyValueRow(
                                fieldLabels['email'] ?? '이메일',
                                parsedAnalysis['email'],
                                icon: Icons.email,
                              ),
                            if (parsedAnalysis['productName'] != null)
                              _buildKeyValueRow(
                                fieldLabels['productName'] ?? '제품/서비스명',
                                parsedAnalysis['productName'],
                                icon: Icons.inventory_2,
                              ),
                            const SizedBox(height: 20),
                          ],

                          // 예산 및 성과 목표 섹션
                          if (parsedAnalysis != null &&
                              (parsedAnalysis['budgetUSD'] != null ||
                                  parsedAnalysis['targetCPM'] != null ||
                                  parsedAnalysis['targetCTR'] != null ||
                                  parsedAnalysis['targetDemographics'] !=
                                      null)) ...[
                            Text(
                              '예산 및 성과 목표',
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                color: Colors.grey[300],
                              ),
                            ),
                            const SizedBox(height: 12),
                            Wrap(
                              spacing: 8,
                              runSpacing: 8,
                              children: [
                                if (parsedAnalysis['budgetUSD'] != null)
                                  _buildImportantChip(
                                    label: '총 예산',
                                    value: parsedAnalysis['budgetUSD'],
                                    color: Colors.green,
                                    icon: Icons.attach_money,
                                    suffix: 'USD',
                                  ),
                                if (parsedAnalysis['targetCPM'] != null)
                                  _buildImportantChip(
                                    label: '목표 CPM',
                                    value: parsedAnalysis['targetCPM'],
                                    color: Colors.blue,
                                    icon: Icons.trending_up,
                                  ),
                                if (parsedAnalysis['targetCTR'] != null)
                                  _buildImportantChip(
                                    label: '목표 CTR',
                                    value: parsedAnalysis['targetCTR'],
                                    color: Colors.orange,
                                    icon: Icons.touch_app,
                                  ),
                                if (parsedAnalysis['targetDemographics'] !=
                                    null)
                                  _buildImportantChip(
                                    label: '타겟 인구통계',
                                    value: parsedAnalysis['targetDemographics'],
                                    color: Colors.purple,
                                    icon: Icons.people,
                                  ),
                              ],
                            ),
                            const SizedBox(height: 20),
                          ],

                          // 캠페인 상세 섹션 (AI 분석 결과 포함)
                          if (parsedAnalysis != null &&
                              (parsedAnalysis['summary'] != null ||
                                  parsedAnalysis['details'] != null)) ...[
                            Text(
                              '캠페인 상세',
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                color: Colors.grey[300],
                              ),
                            ),
                            const SizedBox(height: 12),
                            if (parsedAnalysis['summary'] != null) ...[
                              Container(
                                width: double.infinity,
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: Colors.cyan.withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(
                                    color: Colors.cyan.withOpacity(0.3),
                                    width: 1,
                                  ),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        const Icon(
                                          Icons.auto_awesome,
                                          size: 16,
                                          color: Colors.cyan,
                                        ),
                                        const SizedBox(width: 6),
                                        Text(
                                          'AI 분석: ${fieldLabels['summary'] ?? '캠페인 핵심 의도'}',
                                          style: TextStyle(
                                            fontSize: 12,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.cyan[300],
                                          ),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 8),
                                    SelectableText(
                                      parsedAnalysis['summary'].toString(),
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: Colors.grey[200],
                                        fontStyle: FontStyle.italic,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(height: 12),
                            ],
                            if (parsedAnalysis['details'] != null)
                              _buildKeyValueRow(
                                fieldLabels['details'] ?? '캠페인 상세 내용',
                                parsedAnalysis['details'],
                                icon: Icons.description,
                              ),
                          ],
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                ]
                // 2차 승인 대기 또는 완료: AI 제안서/완료 결과 (메인)
                else if (status == 'pending_proposal_approval' ||
                    status == 'completed') ...[
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Icon(
                                status == 'completed'
                                    ? Icons.check_circle
                                    : Icons.description,
                                color: status == 'completed'
                                    ? Colors.green
                                    : Colors.white70,
                                size: 24,
                              ),
                              const SizedBox(width: 8),
                              Text(
                                status == 'completed'
                                    ? '캠페인 완료 결과'
                                    : 'AI 제안서 내용',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: status == 'completed'
                                      ? Colors.green[300]
                                      : Colors.white70,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 16),

                          // 1. 최종 선정 유튜버 정보 (가장 위에 표시)
                          if (parsedMatchedYoutubers != null &&
                              parsedMatchedYoutubers.isNotEmpty) ...[
                            Row(
                              children: [
                                const Icon(
                                  Icons.star,
                                  color: Colors.amber,
                                  size: 20,
                                ),
                                const SizedBox(width: 8),
                                const Text(
                                  '최종 선정 유튜버',
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white70,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 12),
                            ...parsedMatchedYoutubers
                                .asMap()
                                .entries
                                .map((entry) {
                              return _buildMatchedYoutuberCard(
                                  entry.value, entry.key);
                            }).toList(),
                            const SizedBox(height: 24),
                          ],

                          // 2. 캠페인 상세 (summary, details)
                          if (parsedAnalysis != null &&
                              (parsedAnalysis['summary'] != null ||
                                  parsedAnalysis['details'] != null)) ...[
                            Row(
                              children: [
                                const Icon(
                                  Icons.campaign,
                                  color: Colors.cyan,
                                  size: 20,
                                ),
                                const SizedBox(width: 8),
                                const Text(
                                  '캠페인 상세',
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white70,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 12),
                            if (parsedAnalysis['summary'] != null) ...[
                              Container(
                                width: double.infinity,
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: Colors.cyan.withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(
                                    color: Colors.cyan.withOpacity(0.3),
                                    width: 1,
                                  ),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        const Icon(
                                          Icons.auto_awesome,
                                          size: 16,
                                          color: Colors.cyan,
                                        ),
                                        const SizedBox(width: 6),
                                        Text(
                                          fieldLabels['summary'] ?? '캠페인 핵심 의도',
                                          style: TextStyle(
                                            fontSize: 12,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.cyan[300],
                                          ),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 8),
                                    SelectableText(
                                      parsedAnalysis['summary'].toString(),
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: Colors.grey[200],
                                        fontStyle: FontStyle.italic,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(height: 12),
                            ],
                            if (parsedAnalysis['details'] != null)
                              _buildKeyValueRow(
                                fieldLabels['details'] ?? '캠페인 상세 내용',
                                parsedAnalysis['details'],
                                icon: Icons.description,
                              ),
                            const SizedBox(height: 24),
                          ],

                          // 3. 예산 및 성과 목표 (Chip으로 강조)
                          if (parsedAnalysis != null &&
                              (parsedAnalysis['budgetUSD'] != null ||
                                  parsedAnalysis['targetCPM'] != null ||
                                  parsedAnalysis['targetCTR'] != null ||
                                  parsedAnalysis['targetDemographics'] !=
                                      null)) ...[
                            Row(
                              children: [
                                const Icon(
                                  Icons.track_changes,
                                  color: Colors.orange,
                                  size: 20,
                                ),
                                const SizedBox(width: 8),
                                const Text(
                                  '예산 및 성과 목표',
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white70,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 12),
                            Wrap(
                              spacing: 8,
                              runSpacing: 8,
                              children: [
                                if (parsedAnalysis['budgetUSD'] != null)
                                  _buildImportantChip(
                                    label: '총 예산',
                                    value: parsedAnalysis['budgetUSD'],
                                    color: Colors.green,
                                    icon: Icons.attach_money,
                                    suffix: 'USD',
                                  ),
                                if (parsedAnalysis['targetCPM'] != null)
                                  _buildImportantChip(
                                    label: '목표 CPM',
                                    value: parsedAnalysis['targetCPM'],
                                    color: Colors.blue,
                                    icon: Icons.trending_up,
                                  ),
                                if (parsedAnalysis['targetCTR'] != null)
                                  _buildImportantChip(
                                    label: '목표 CTR',
                                    value: parsedAnalysis['targetCTR'],
                                    color: Colors.orange,
                                    icon: Icons.touch_app,
                                  ),
                                if (parsedAnalysis['targetDemographics'] !=
                                    null)
                                  _buildImportantChip(
                                    label: '타겟 인구통계',
                                    value: parsedAnalysis['targetDemographics'],
                                    color: Colors.purple,
                                    icon: Icons.people,
                                  ),
                              ],
                            ),
                            const SizedBox(height: 24),
                          ],

                          // 4. 제안서 마크다운 내용
                          if (generatedProposal != null &&
                              generatedProposal.isNotEmpty) ...[
                            Row(
                              children: [
                                const Icon(
                                  Icons.description,
                                  color: Colors.white70,
                                  size: 20,
                                ),
                                const SizedBox(width: 8),
                                const Text(
                                  'AI 제안서 전문',
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white70,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 12),
                            Container(
                              width: double.infinity,
                              padding: const EdgeInsets.all(12),
                              decoration: BoxDecoration(
                                color: Colors.grey[900],
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: MarkdownBody(
                                data: generatedProposal,
                                styleSheet: MarkdownStyleSheet(
                                  p: TextStyle(
                                    fontSize: 14,
                                    color: Colors.grey[200],
                                  ),
                                  h1: const TextStyle(
                                    fontSize: 24,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white,
                                  ),
                                  h2: const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white70,
                                  ),
                                  h3: const TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white60,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(height: 16),
                          ],

                          // 5. 계약서 내용 (완료 상태일 때만 표시)
                          if (status == 'completed' &&
                              generatedContract != null &&
                              generatedContract.isNotEmpty) ...[
                            Row(
                              children: [
                                const Icon(
                                  Icons.description,
                                  color: Colors.purple,
                                  size: 20,
                                ),
                                const SizedBox(width: 8),
                                const Text(
                                  '생성된 계약서',
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white70,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 12),
                            Container(
                              width: double.infinity,
                              padding: const EdgeInsets.all(12),
                              decoration: BoxDecoration(
                                color: Colors.purple.withOpacity(0.1),
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(
                                  color: Colors.purple.withOpacity(0.3),
                                  width: 1,
                                ),
                              ),
                              child: MarkdownBody(
                                data: generatedContract,
                                styleSheet: MarkdownStyleSheet(
                                  p: TextStyle(
                                    fontSize: 14,
                                    color: Colors.grey[200],
                                  ),
                                  h1: const TextStyle(
                                    fontSize: 24,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white,
                                  ),
                                  h2: const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white70,
                                  ),
                                  h3: const TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white60,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(height: 12),
                            if (finalContractS3Key != null &&
                                finalContractS3Key.isNotEmpty) ...[
                              Container(
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: Colors.blue.withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(
                                    color: Colors.blue.withOpacity(0.3),
                                    width: 1,
                                  ),
                                ),
                                child: Row(
                                  children: [
                                    const Icon(
                                      Icons.picture_as_pdf,
                                      color: Colors.blue,
                                      size: 20,
                                    ),
                                    const SizedBox(width: 8),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            'PDF 계약서',
                                            style: TextStyle(
                                              fontSize: 12,
                                              fontWeight: FontWeight.bold,
                                              color: Colors.blue[300],
                                            ),
                                          ),
                                          const SizedBox(height: 4),
                                          Text(
                                            finalContractS3Key,
                                            style: TextStyle(
                                              fontSize: 11,
                                              color: Colors.grey[400],
                                            ),
                                            maxLines: 1,
                                            overflow: TextOverflow.ellipsis,
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(height: 16),
                            ],
                          ],
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                ],

                // 섹션 2: 원본 제출 내용 (2차 승인 대기 또는 완료 상태일 때만 참고용으로 표시)
                if ((status == 'pending_proposal_approval' ||
                        status == 'completed') &&
                    parsedAnalysis != null) ...[
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const Icon(
                                Icons.archive_outlined,
                                color: Colors.grey,
                                size: 24,
                              ),
                              const SizedBox(width: 8),
                              Text(
                                '원본 제출 내용',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.grey[400],
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Text(
                            '참고용: 광고주가 최초 제출한 내용입니다',
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.grey[500],
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                          const SizedBox(height: 20),

                          // 기본 정보 섹션
                          if (parsedAnalysis['companyName'] != null ||
                              parsedAnalysis['advertiserName'] != null ||
                              parsedAnalysis['email'] != null ||
                              parsedAnalysis['productName'] != null) ...[
                            Text(
                              '기본 정보',
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                color: Colors.grey[300],
                              ),
                            ),
                            const SizedBox(height: 12),
                            if (parsedAnalysis['companyName'] != null)
                              _buildKeyValueRow(
                                fieldLabels['companyName'] ?? '회사명',
                                parsedAnalysis['companyName'],
                                icon: Icons.business,
                              ),
                            if (parsedAnalysis['advertiserName'] != null)
                              _buildKeyValueRow(
                                fieldLabels['advertiserName'] ?? '광고주명',
                                parsedAnalysis['advertiserName'],
                                icon: Icons.person,
                              ),
                            if (parsedAnalysis['email'] != null)
                              _buildKeyValueRow(
                                fieldLabels['email'] ?? '이메일',
                                parsedAnalysis['email'],
                                icon: Icons.email,
                              ),
                            if (parsedAnalysis['productName'] != null)
                              _buildKeyValueRow(
                                fieldLabels['productName'] ?? '제품/서비스명',
                                parsedAnalysis['productName'],
                                icon: Icons.inventory_2,
                              ),
                            const SizedBox(height: 20),
                          ],

                          // 예산 및 성과 목표 섹션
                          if (parsedAnalysis['budgetUSD'] != null ||
                              parsedAnalysis['targetCPM'] != null ||
                              parsedAnalysis['targetCTR'] != null ||
                              parsedAnalysis['targetDemographics'] != null) ...[
                            Text(
                              '예산 및 성과 목표',
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                color: Colors.grey[300],
                              ),
                            ),
                            const SizedBox(height: 12),
                            Wrap(
                              spacing: 8,
                              runSpacing: 8,
                              children: [
                                if (parsedAnalysis['budgetUSD'] != null)
                                  _buildImportantChip(
                                    label: '총 예산',
                                    value: parsedAnalysis['budgetUSD'],
                                    color: Colors.green,
                                    icon: Icons.attach_money,
                                    suffix: 'USD',
                                  ),
                                if (parsedAnalysis['targetCPM'] != null)
                                  _buildImportantChip(
                                    label: '목표 CPM',
                                    value: parsedAnalysis['targetCPM'],
                                    color: Colors.blue,
                                    icon: Icons.trending_up,
                                  ),
                                if (parsedAnalysis['targetCTR'] != null)
                                  _buildImportantChip(
                                    label: '목표 CTR',
                                    value: parsedAnalysis['targetCTR'],
                                    color: Colors.orange,
                                    icon: Icons.touch_app,
                                  ),
                                if (parsedAnalysis['targetDemographics'] !=
                                    null)
                                  _buildImportantChip(
                                    label: '타겟 인구통계',
                                    value: parsedAnalysis['targetDemographics'],
                                    color: Colors.purple,
                                    icon: Icons.people,
                                  ),
                              ],
                            ),
                            const SizedBox(height: 20),
                          ],

                          // 캠페인 상세 섹션
                          if (parsedAnalysis['summary'] != null ||
                              parsedAnalysis['details'] != null) ...[
                            Text(
                              '캠페인 상세',
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                color: Colors.grey[300],
                              ),
                            ),
                            const SizedBox(height: 12),
                            if (parsedAnalysis['summary'] != null) ...[
                              Container(
                                width: double.infinity,
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: Colors.cyan.withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(
                                    color: Colors.cyan.withOpacity(0.3),
                                    width: 1,
                                  ),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        const Icon(
                                          Icons.auto_awesome,
                                          size: 16,
                                          color: Colors.cyan,
                                        ),
                                        const SizedBox(width: 6),
                                        Text(
                                          fieldLabels['summary'] ?? '캠페인 핵심 의도',
                                          style: TextStyle(
                                            fontSize: 12,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.cyan[300],
                                          ),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 8),
                                    SelectableText(
                                      parsedAnalysis['summary'].toString(),
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: Colors.grey[200],
                                        fontStyle: FontStyle.italic,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(height: 12),
                            ],
                            if (parsedAnalysis['details'] != null)
                              _buildKeyValueRow(
                                fieldLabels['details'] ?? '캠페인 상세 내용',
                                parsedAnalysis['details'],
                                icon: Icons.description,
                              ),
                          ],
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                ]
                // 데이터가 없는 경우 (1차 승인 대기 상태에서만 표시)
                else if (status == 'pending_approval' &&
                    aiAnalysis == null) ...[
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const Icon(
                                Icons.description_outlined,
                                color: Colors.white70,
                                size: 24,
                              ),
                              const SizedBox(width: 8),
                              const Text(
                                '제출 내용',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white70,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 16),
                          Text(
                            '제출된 데이터가 아직 없습니다.\nAgent 1이 분석을 완료하면 여기에 표시됩니다.',
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.grey[400],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                ],
              ],
            ),
          ),

          // 하단 고정 버튼
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: Container(
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                color: Theme.of(context).scaffoldBackgroundColor,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.3),
                    blurRadius: 10,
                    offset: const Offset(0, -5),
                  ),
                ],
              ),
              child: _isLoading
                  ? const Center(
                      child: CircularProgressIndicator(),
                    )
                  : _buildActionButton(),
            ),
          ),
        ],
      ),
    );
  }
}
