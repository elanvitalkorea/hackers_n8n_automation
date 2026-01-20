# 관리자 클라이언트 구축 (Flutter 모바일 앱) 

### 1\. 프로젝트 기획 (PRD 요약)

  * **🎯 목표**: AI Agent가 처리하는 `campaigns` 테이블의 상태를 실시간으로 모니터링하고, 관리자가 '승인' 버튼을 눌러(HITL) n8n Agent의 다음 단계를 트리거하는 C\&C 모바일 앱을 구축합니다.
  * **🤖 기술 스택**: Flutter, `supabase_flutter` (실시간 스트림 구독), `http` (n8n 웹훅 호출용), **`flutter_markdown` (제안서 렌더링용)**, **`flutter_dotenv` (API 키 및 환경 변수 관리용)**.
  * **🎨 UI/UX 컨셉**: **"실시간 C\&C 대시보드 (Real-time C\&C Dashboard)"**
      * 'Dark Glassmorphism'이 외부 광고주용의 화려한 UI라면, 이 앱은 **내부 관리자용**이므로 **기능성, 즉각성, 명확성**에 초점을 맞춥니다.
      * **Dark Mode (어두운 테마)** 를 기본으로 하여 "Mission Control" (관제 센터)의 느낌을 주며, 관리자의 눈의 피로를 줄입니다.
      * 모든 데이터는 사용자가 새로고침할 필요 없이 **Supabase Realtime**을 통해 즉시 화면에 반영되어야 합니다.

-----

### 2\. 화면 명세

#### 2-1. `home_screen.dart` (메인: 실시간 대시보드)

  * **역할**: `campaigns` 테이블의 모든 항목을 실시간으로 구독하고, 상태별로 분류하여 섹션으로 표시합니다.
  * **데이터 소스**: `supabase.from('campaigns').stream(primaryKey: ['id'])`
  * **UI 컴포넌트**:
      * **AppBar**: "AI Agent C\&C 대시보드" 타이틀.
      * **Body**: `StreamBuilder`를 사용하여 Supabase 스트림을 구독.
          * **로딩 중일 시**: `Center(child: CircularProgressIndicator())`
          * **에러 발생 시**: 에러 메시지를 표시합니다.
          * **데이터가 없을 시 (빈 리스트)**:
              * 아이콘 (`Icons.inbox_outlined`)과 함께 "대기 중인 캠페인이 없습니다." 메시지 표시
              * 추가 안내: "S3에 파일이 있어도 Agent 1이 분석하기 전까지는 대시보드에 표시되지 않습니다." (작은 글씨)
      * **상태별 섹션 (Card 기반)**:
          * 데이터를 상태별로 분류하여 3개의 섹션으로 표시합니다.
          * **1차 섹션: "1차 승인 대기"**
              * 상태: `pending_approval`
              * 아이콘: `Icons.warning_amber_rounded` (노란색)
              * 헤더: "1차 승인 대기 (AI 분석 검토 필요)" - 제목 옆에 덜 강조된 텍스트로 설명 표시
              * 헤더에 항목 개수 배지 표시
              * 해당 상태의 캠페인만 리스트로 표시
          * **2차 섹션: "2차 승인 대기"**
              * 상태: `pending_proposal_approval`
              * 아이콘: `Icons.edit_note_rounded` (주황색)
              * 헤더: "2차 승인 대기 (제안서 검토 필요)" - 제목 옆에 덜 강조된 텍스트로 설명 표시
              * 헤더에 항목 개수 배지 표시
              * 해당 상태의 캠페인만 리스트로 표시
          * **3차 섹션: "완료"**
              * 상태: `completed`
              * 아이콘: `Icons.check_circle_outline_rounded` (녹색)
              * 헤더: "완료" (설명 없음)
              * 헤더에 항목 개수 배지 표시
              * 해당 상태의 캠페인만 리스트로 표시
          * **섹션 헤더**: 각 섹션은 Card로 감싸져 있으며, 헤더에 아이콘, 제목(및 설명), 항목 개수 배지가 표시됩니다.
          * **섹션 내 항목 (ListTile)**:
              * `leading`: 상태에 따른 아이콘
              * `title`: 캠페인 제목 (`ai_analysis`에서 `companyName`과 `productName`을 조합하여 "회사명 - 제품명" 형식으로 표시. `ai_analysis`가 없으면 `s3_key`에서 파일명 추출)
              * `subtitle`: 파일명 (`s3_key`에서 파일명만 추출)
              * `trailing`: `Icons.chevron_right`
              * **Null 안전성**: 모든 필드에 대해 null 체크 및 기본값 처리 필수
          * **빈 섹션 처리**: 항목이 없는 섹션은 표시하지 않습니다.
  * **핵심 로직**:
      * `StreamBuilder`로 받은 데이터를 상태별로 필터링합니다.
      * 각 섹션은 `_buildSection` 메서드로 생성되며, 빈 섹션은 표시하지 않습니다.
      * `ListTile`의 `onTap` 시, 해당 `campaign` 맵 데이터를 `DetailScreen`으로 전달하며 화면을 전환합니다 (`Navigator.push`).

#### 2-2. `detail_screen.dart` (상세: HITL 승인 화면)

  * **역할**: `HomeScreen`에서 전달받은 캠페인 상세 정보를 표시하고, 관리자의 '승인' 액션을 처리합니다.
  * **데이터 소스**: `HomeScreen`에서 생성자(Constructor)를 통해 전달받은 `Map<String, dynamic> campaignData`.
  * **UI 컴포넌트**:
      * **AppBar**: 상태에 따라 동적으로 타이틀이 변경됩니다.
          * `pending_approval`: "캠페인 상세 승인"
          * `pending_proposal_approval`: "제안서 검토"
          * `completed`: "캠페인 완료 결과"
      * **Body**: `Padding`과 `SingleChildScrollView` (데이터가 길어질 수 있으므로)
          * **회사명/제품명 헤더**: `ai_analysis`에서 `companyName`과 `productName`을 추출하여 상단에 크게 표시합니다.
          * **상태별 메인 섹션 구성**:
              * **1차 승인 대기 (`pending_approval`)**: "제출 내용" 섹션 (AI 분석 결과 포함)
              * **2차 승인 대기 (`pending_proposal_approval`)**: "AI 제안서 내용" 섹션 (메인)
              * **완료 (`completed`)**: "캠페인 완료 결과" 섹션 (메인, 제안서 + 계약서)
          * **섹션 1-1: 제출 내용** (1차 승인 대기 상태일 때만 표시)
              * **섹션 헤더**: 아이콘(`Icons.description_outlined`)과 함께 "제출 내용" 제목 표시.
              * **레이아웃 순서** (위에서 아래로):
                  1. **기본 정보** (회사명, 광고주명, 이메일, 제품/서비스명)
                  2. **예산 및 성과 목표** (Chip으로 표시: `budgetUSD`, `targetCPM`, `targetCTR`, `targetDemographics`)
                  3. **캠페인 상세** (`summary` - AI 분석 결과 포함, `details`)
              * **AI 분석 결과**: `summary` 필드는 "AI 분석: 캠페인 핵심 의도" 레이블과 함께 청록색 박스로 강조 표시됩니다.
          * **섹션 1-2: AI 제안서 내용** (2차 승인 대기 또는 완료 상태일 때 표시)
              * **섹션 헤더**: 
                  * 2차 승인 대기: 아이콘(`Icons.description`)과 함께 "AI 제안서 내용" 제목 표시.
                  * 완료: 아이콘(`Icons.check_circle`, 녹색)과 함께 "캠페인 완료 결과" 제목 표시 (녹색 강조).
              * **레이아웃 순서** (위에서 아래로):
                  1. **최종 선정 유튜버 정보** (제일 상단)
                  2. **캠페인 상세** (`summary`, `details` - `ai_analysis`에서 가져옴)
                  3. **예산 및 성과 목표** (Chip으로 표시: `budgetUSD`, `targetCPM`, `targetCTR`, `targetDemographics`)
                  4. **제안서 마크다운** (가장 아래)
                  5. **계약서 내용** (완료 상태일 때만 표시)
              * **1. 최종 선정 유튜버 정보** (제일 상단에 표시):
                  * `campaignData['matched_youtubers']` **단일 JSON 객체**를 파싱하여 유튜버 정보를 카드 형식으로 표시합니다.
                  * **(중요)** `matched_youtubers`는 배열이 아닌 **단일 객체**입니다. Agent 2가 여러 후보를 분석한 후 최적의 후보 1명만 선택하여 저장합니다. 따라서 이 데이터는 **"최종 선정 유튜버"**를 의미합니다.
                  * 각 카드에는 다음 정보가 포함됩니다:
                      * 채널명 (`channel_name`) - 별 아이콘(⭐)과 함께 강조 표시
                      * 채널 설명 요약 (`content_summary`) - RAG 검색 결과에서 추출된 유튜버 소개글 요약
                      * **원본 단가와 집행예산 구분 표시**:
                          * 원본 단가 (`original_cost_per_video_usd`) - 회색 박스로 표시 (유튜버의 실제 단가)
                          * 집행예산 (`cost_per_video_usd` - Agent 2가 총 예산으로 덮어쓴 값) - 초록색 박스로 표시, 아이콘 포함
                      * 성과 지표 Chip: CPM (`avg_cpm`), CTR (`avg_ctr_percent`) - AI 유사도는 칩에서 제거하고 `reason` 필드에만 포함
                      * 선정 사유 (`reason`) - 파란색 박스로 강조 표시, AI가 생성한 정성적+정량적 매칭 근거 (유사도 점수 포함)
                  * **UX 목적**: 관리자가 제안서를 읽기 전에 최종 선정된 유튜버의 핵심 정보를 먼저 확인할 수 있도록 최상단에 배치합니다.
                  * **시각적 강조**: 제목에 별 아이콘(⭐)을 추가하고, 카드 내부의 채널명 옆에도 별 아이콘을 표시하여 "최종 선정"의 의미를 명확히 합니다.
                  * **Null 처리**: `matched_youtubers`가 `null`이거나 비어있으면 표시하지 않음.
              * **2. 캠페인 상세** (`ai_analysis`에서 가져옴):
                  * 캠페인 핵심 의도 (`summary`) - 청록색 박스로 강조 표시
                  * 캠페인 상세 내용 (`details`) - Key-Value 형식으로 표시
              * **3. 예산 및 성과 목표** (Chip으로 강조 표시):
                  * 총 예산 (`budgetUSD`), 목표 CPM (`targetCPM`), 목표 CTR (`targetCTR`), 타겟 인구통계 (`targetDemographics`)
              * **4. 제안서 마크다운**: `campaignData['generated_proposal']`을 `MarkdownBody` 위젯으로 렌더링합니다.
                  * (UX Tip) `flutter_markdown` 패키지의 **`MarkdownBody`** 위젯을 사용하여 렌더링합니다. (단순 `Text` 위젯이 아님).
                  * **Null 처리**: `generated_proposal`이 `null`이거나 비어있으면 표시하지 않음.
              * **5. 계약서 내용** (완료 상태일 때만 표시):
                  * `generated_contract` (Markdown 형식 계약서)를 `MarkdownBody` 위젯으로 렌더링합니다.
                  * `final_contract_s3_key` (PDF S3 키) 정보를 표시합니다.
          * **섹션 2: 원본 제출 내용** (2차 승인 대기 또는 완료 상태일 때만 참고용으로 표시)
              * `campaignData['ai_analysis']`를 **섹션별로 그룹화**하여 시각적으로 강조하여 표시합니다.
              * **섹션 헤더**: 아이콘(`Icons.archive_outlined`, 회색)과 함께 "원본 제출 내용" 제목 표시.
              * **참고 안내**: "참고용: 광고주가 최초 제출한 내용입니다" 안내 문구를 작은 회색 텍스트로 표시하여 덜 강조합니다.
              * **1) 기본 정보 섹션**:
                  * 회사명 (`companyName`) - 아이콘: `Icons.business`
                  * 광고주명 (`advertiserName`) - 아이콘: `Icons.person`
                  * 이메일 (`email`) - 아이콘: `Icons.email`
                  * 제품/서비스명 (`productName`) - 아이콘: `Icons.inventory_2`
                  * 각 필드는 아이콘과 함께 Key-Value 레이블 형식으로 표시 (레이블: 작은 회색 텍스트, 값: 큰 흰색 텍스트).
              * **2) 예산 및 성과 목표 섹션** (Chip으로 강조 표시):
                  * **총 예산** (`budgetUSD`) - 초록색 Chip, 아이콘: `Icons.attach_money`, "USD" 접미사
                  * **목표 CPM** (`targetCPM`) - 파란색 Chip, 아이콘: `Icons.trending_up`
                  * **목표 CTR** (`targetCTR`) - 주황색 Chip, 아이콘: `Icons.touch_app`
                  * **타겟 인구통계** (`targetDemographics`) - 보라색 Chip, 아이콘: `Icons.people`
                  * 각 Chip은 레이블(작은 텍스트)과 값(큰 굵은 텍스트)을 2줄로 표시하며, 색상으로 구분하여 한눈에 파악 가능하도록 합니다.
              * **3) 캠페인 상세 섹션**:
                  * **캠페인 핵심 의도** (`summary`) - 청록색 박스로 강조 표시, 아이콘: `Icons.auto_awesome`, 이탤릭체 텍스트
                  * **캠페인 상세 내용** (`details`) - 아이콘: `Icons.description`과 함께 Key-Value 형식으로 표시
              * **Null 처리**: `ai_analysis`가 `null`이면 "제출된 데이터가 아직 없습니다. Agent 1이 분석을 완료하면 여기에 표시됩니다." 메시지 표시.
              * **에러 처리**: JSON 파싱 실패 시 원본 데이터를 문자열로 표시 (try-catch 사용).
      * **ActionButton (`ElevatedButton`)**:
          * 화면 하단에 배치되며, **`status`에 따라 버튼의 텍스트와 기능이 완전히 변경**되어야 합니다.
  * **핵심 로직 (조건부 UI 및 액션)**:
      * `build` 메서드 내에서 `status`를 확인하여 버튼의 텍스트와 `onPressed` 콜백을 동적으로 결정합니다.
      * **상태 1: `status == 'pending_approval'`**
          * **버튼 텍스트**: "✅ 1차 승인 (AI 분석 검토 완료)"
          * **버튼 활성화**: `onPressed`에 `_triggerN8nAgent` 함수 연결.
          * **호출할 웹훅 (Target)**: **`dotenv.env['N8N_WEBHOOK_URL_APPROVE']!`** (환경 변수에서 로드)
      * **상태 2: `status == 'pending_proposal_approval'`**
          * **버튼 텍스트**: "✍️ 2차 승인 (제안서 검토 완료)"
          * **버튼 활성화**: `onPressed`에 `_triggerN8nAgent` 함수 연결.
          * **호출할 웹훅 (Target)**: **`dotenv.env['N8N_WEBHOOK_URL_CONTRACT']!`** (환경 변수에서 로드)
      * **그 외 상태 (예: `completed`, `pending` 등)**
          * **버튼 텍스트**: "🎉 작업 완료" 또는 "처리 중..."
          * **버튼 비활성화**: `onPressed: null` (클릭 불가)

-----

### 3\. 환경 변수 (ENV) 관리 (신규)

  * **🎯 목표**: Supabase 키, n8n 웹훅 URL 등 민감한 정보를 소스 코드에서 분리하여 `.env` 파일로 관리합니다.
  * **📦 패키지**: `flutter_dotenv`
  * **⚙️ 설정**:
    1.  `pubspec.yaml`에 `flutter_dotenv`를 추가합니다.
    2.  프로젝트 루트(최상위)에 `.env` 파일을 생성합니다.
    3.  `.gitignore` 파일에 `.env`를 추가하여 깃 저장소에 커밋되지 않도록 합니다.
  * **📄 `.env` 파일 내용 (예시)**:
    ```ini
    SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
    SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]
    N8N_WEBHOOK_URL_APPROVE=https://[YOUR_N8N_URL]/webhook/17-2-approve
    N8N_WEBHOOK_URL_CONTRACT=https://[YOUR_N8N_URL]/webhook/17-3-contract
    ```

-----

### 4\. API 및 핵심 로직 명세

#### 4-1. `main.dart`: Supabase 초기화

  * **역할**: 앱 실행 시 `.env` 파일에서 환경 변수를 로드하고 Supabase 클라이언트를 전역으로 초기화합니다.
  * **로직**: `main` 함수 내에서
    1.  `WidgetsFlutterBinding.ensureInitialized();`를 호출하여 Flutter 바인딩을 초기화합니다.
    2.  `try-catch` 블록으로 에러 처리를 감쌉니다.
    3.  `await dotenv.load(fileName: ".env");`를 호출하여 환경 변수를 로드합니다.
    4.  환경 변수 검증:
        * `SUPABASE_URL`과 `SUPABASE_ANON_KEY`가 `null`이거나 비어있으면 예외를 발생시킵니다.
    5.  `await Supabase.initialize(...)`를 호출하여 Supabase 클라이언트를 초기화합니다.
    6.  **에러 처리**: 초기화 실패 시 사용자에게 명확한 에러 화면을 표시합니다.
        * 에러 아이콘과 메시지 표시
        * 확인 사항 체크리스트 제공 (.env 파일 위치, 환경 변수 설정, Supabase 프로젝트 활성화 여부)

#### 4-2. `detail_screen.dart`: n8n Agent 호출 함수

  * **역할**: n8n Agent의 웹훅을 HTTP POST로 호출합니다.
  * **함수 명세**: `Future<void> _triggerN8nAgent({required String webhookUrl, required String campaignId})`
  * **로직**:
    1.  `http` 패키지를 사용 (`import 'package:http/http.dart' as http;`).
    2.  `try...catch` 문으로 네트워크 오류를 감싸야 합니다.
    3.  `http.post` 호출:
          * `Uri.parse(webhookUrl)`
          * `headers`: `{'Content-Type': 'application/json'}`
          * `body`: `json.encode({'campaign_id': campaignId})` (17차시 n8n Agent가 작업을 식별할 ID 전송)
    4.  **(UX)** 호출 시작 시 로딩 인디케이터 표시, 완료 시 `Navigator.pop(context)`로 대시보드 복귀. (대시보드는 `StreamBuilder`이므로 자동으로 상태가 갱신됨)

-----

### 5\. Supabase 연동 및 테스트 계획 (Definition of Done)

1.  **`(수정)`** 프로젝트 루트에 `.env` 파일을 생성하고 3번 섹션(`환경 변수 (ENV) 관리`)에 명시된 **`SUPABASE_URL`**, **`SUPABASE_ANON_KEY`** 및 **n8n 웹훅 URL**들을 입력합니다.
2.  **(중요) Supabase RLS 정책 및 Realtime 설정**:
      * Flutter 앱은 `anonKey`를 사용하므로, **실시간 읽기(`SELECT`)** 가 작동하려면 RLS 정책이 필요합니다.
      * Supabase SQL 편집기에서 아래 정책을 실행합니다.
        ```sql
        CREATE POLICY "Allow anon read access on campaigns"
        ON campaigns
        FOR SELECT
        USING (true);
        ```
      * **Realtime 발행 설정**:
          * Flutter 앱의 `StreamBuilder`가 실시간 업데이트를 받으려면, `campaigns` 테이블을 Realtime 발행에 추가해야 합니다.
          ```sql
          ALTER PUBLICATION supabase_realtime ADD TABLE campaigns;
          ```
3.  **테스트 시나리오**:
      * **1단계 (실시간 수신)**: Flutter 앱을 실행하고 빈 대시보드 화면을 확인합니다.
      * **2단계 (수신)**: Supabase 대시보드(웹)에서 `campaigns` 테이블에 `s3_key='test.json'`, `status='pending_approval'`로 레코드를 수동 삽입합니다.
      * **3단계 (확인)**: Flutter 앱이 **새로고침 없이** 즉시 "test.json" 항목을 `ListTile`에 표시하는지 확인합니다.
      * **4.단계 (HITL)**: 해당 항목을 탭하여 `DetailScreen`으로 이동한 뒤, [✅ 1차 승인] 버튼을 클릭합니다.
      * **5단계 (완료)**: `DetailScreen`이 닫히고 `HomeScreen`으로 복귀하는지, (n8n이 아직 없으므로) `campaigns` 테이블의 상태는 그대로인지 확인합니다. (17차시에서 n8n이 이 상태를 변경할 것입니다.)

### 6\. 에러 처리 및 예외 상황 (신규)

  * **🎯 목표**: 데이터가 없거나 예상치 못한 상황에서도 앱이 안정적으로 동작하도록 방어적 코딩을 구현합니다.
  * **주요 시나리오**:
    1.  **S3에 파일이 있지만 Supabase `campaigns` 테이블에 데이터가 없는 경우**:
        * **원인**: Agent 1이 아직 S3 파일을 분석하지 않았거나, Agent 1이 실행되지 않은 상태
        * **처리**: 빈 리스트 상태로 표시하며, 사용자에게 "S3에 파일이 있어도 Agent 1이 분석하기 전까지는 대시보드에 표시되지 않습니다." 안내 메시지 표시
        * **UX**: 아이콘과 함께 명확한 안내 문구 제공
    2.  **`campaigns` 테이블의 필수 필드가 `null`인 경우**:
        * **`status`가 `null`**: 기본값 'unknown' 사용
        * **`s3_key`가 `null`**: 기본값 'Unknown' 또는 'N/A' 사용
        * **`ai_analysis`가 `null`**: "AI 분석 데이터가 아직 없습니다..." 안내 메시지 표시
    3.  **JSON 파싱 실패**:
        * `ai_analysis`가 유효하지 않은 JSON 형식인 경우, 원본 데이터를 문자열로 표시
        * try-catch로 예외 처리하여 앱 크래시 방지
    4.  **네트워크 오류**:
        * Supabase 연결 실패 시 에러 메시지 표시 (빨간색 텍스트)
        * StreamBuilder의 `snapshot.hasError`로 처리
    5.  **빈 데이터베이스**:
        * `campaigns` 테이블이 완전히 비어있는 경우, 빈 리스트 상태로 처리하여 "대기 중인 캠페인이 없습니다." 메시지 표시
  * **구현 원칙**:
    * 모든 nullable 필드에 대해 null 체크 및 기본값 제공
    * JSON 파싱 시 try-catch 사용
    * 사용자에게 명확한 피드백 제공 (에러 메시지, 안내 문구)
    * 앱이 크래시하지 않도록 방어적 코딩