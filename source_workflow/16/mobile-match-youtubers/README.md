# AI Agent C&C 대시보드 모바일 앱

AI Agent가 처리하는 `campaigns` 테이블의 상태를 실시간으로 모니터링하고, 관리자가 '승인' 버튼을 눌러(HITL) n8n Agent의 다음 단계를 트리거하는 C&C 모바일 앱입니다.

## 기술 스택

- Flutter
- `supabase_flutter` - 실시간 스트림 구독
- `http` - n8n 웹훅 호출
- `flutter_markdown` - 제안서 렌더링
- `flutter_dotenv` - 환경 변수 관리

## 설정 방법

### 1. 의존성 설치

```bash
flutter pub get
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 입력하세요:

```ini
SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]
N8N_WEBHOOK_URL_APPROVE=https://[YOUR_N8N_URL]/webhook/17-2-approve
N8N_WEBHOOK_URL_CONTRACT=https://[YOUR_N8N_URL]/webhook/17-3-contract
```

### 3. Supabase RLS 정책 설정

Flutter 앱이 `campaigns` 테이블을 읽을 수 있도록 Supabase SQL 편집기에서 다음 정책을 실행하세요:

```sql
CREATE POLICY "Allow anon read access on campaigns"
ON campaigns
FOR SELECT
USING (true);
```

## 실행 방법

```bash
flutter run
```

## 주요 기능

### HomeScreen (메인 대시보드)
- `campaigns` 테이블의 모든 항목을 실시간으로 구독하여 표시
- 상태에 따라 다른 아이콘과 색상으로 표시
- 각 항목을 탭하면 상세 화면으로 이동

### DetailScreen (상세 승인 화면)
- 캠페인 상세 정보 표시
- AI 분석 내용 (JSON) Pretty Print 형식으로 표시
- AI 제안서 내용 (Markdown) 렌더링
- 상태에 따라 다른 승인 버튼 표시:
  - `pending_approval`: 1차 승인 버튼
  - `pending_proposal_approval`: 2차 승인 버튼
  - 그 외: 비활성화된 완료 버튼

## 테스트 시나리오

1. **실시간 수신**: Flutter 앱을 실행하고 빈 대시보드 화면을 확인합니다.
2. **수신**: Supabase 대시보드(웹)에서 `campaigns` 테이블에 `s3_key='test.md'`, `status='pending_approval'`로 레코드를 수동 삽입합니다.
3. **확인**: Flutter 앱이 **새로고침 없이** 즉시 "test.md" 항목을 `ListTile`에 표시하는지 확인합니다.
4. **HITL**: 해당 항목을 탭하여 `DetailScreen`으로 이동한 뒤, [✅ 1차 승인] 버튼을 클릭합니다.
5. **완료**: `DetailScreen`이 닫히고 `HomeScreen`으로 복귀하는지 확인합니다.

