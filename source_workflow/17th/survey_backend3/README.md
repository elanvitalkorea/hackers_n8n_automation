# n8n PDF Generator

Puppeteer와 AWS S3를 활용한 n8n 워크플로우용 PDF 생성 서비스입니다.

## 🚀 주요 기능

- **PDF 생성**: Puppeteer를 이용한 고품질 PDF 렌더링
- **S3 업로드**: AWS S3에 자동 업로드 및 파일 키 반환
- **최적화**: 브라우저 인스턴스 재사용으로 성능 향상
- **보안**: 비루트 사용자 실행, 입력 검증, CORS 설정
- **헬스체크**: Docker/Kubernetes 환경을 위한 헬스체크 엔드포인트

## 📋 요구사항

- Node.js 20 이상
- Docker (배포 시)
- AWS S3 버킷 및 IAM 자격증명

## 🛠️ 설치 및 실행

### 로컬 환경

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 AWS 자격증명을 입력하세요

# 개발 서버 실행
npm run dev

# 프로덕션 서버 실행
npm start
```

### Docker

```bash
# 이미지 빌드
docker build -t n8n-pdf-generator .

# 컨테이너 실행
docker run -p 8080:8080 \
  -e AWS_REGION=ap-northeast-2 \
  -e AWS_ACCESS_KEY_ID=your_access_key \
  -e AWS_SECRET_KEY=your_secret_key \
  -e S3_BUCKET_NAME=your_bucket_name \
  n8n-pdf-generator
```

## 🔧 환경 변수

| 변수명 | 필수 | 기본값 | 설명 |
|--------|------|--------|------|
| `PORT` | ❌ | `8080` | 서버 포트 |
| `NODE_ENV` | ❌ | `development` | 실행 환경 |
| `AWS_REGION` | ✅ | - | AWS 리전 (예: `ap-northeast-2`) |
| `AWS_ACCESS_KEY_ID` | ✅ | - | AWS 액세스 키 |
| `AWS_SECRET_KEY` | ✅ | - | AWS 시크릿 키 |
| `S3_BUCKET_NAME` | ✅ | - | S3 버킷 이름 |
| `PUPPETEER_EXECUTABLE_PATH` | ❌ | - | Chromium 실행 경로 |

## 📡 API 엔드포인트

### 1. 헬스체크

```bash
GET /health
```

**응답 예시:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-29T12:00:00.000Z",
  "uptime": 123.456,
  "memory": {
    "rss": 123456789,
    "heapTotal": 12345678,
    "heapUsed": 1234567
  }
}
```

### 2. PDF 생성 및 S3 업로드

```bash
POST /generate
Content-Type: application/json
```

**요청 본문:**
```json
{
  "title": "월간 리포트",
  "items": [
    { "name": "매출", "value": "1,000,000원" },
    { "name": "방문자", "value": "5,000명" },
    { "name": "전환율", "value": "3.5%" }
  ]
}
```

**응답 예시:**
```json
{
  "success": true,
  "message": "PDF generated and uploaded to S3",
  "bucket": "my-bucket",
  "key": "reports/2025-10-29/report-abc-123.pdf",
  "size": 12345,
  "duration": "1234ms"
}
```

### 3. API 정보

```bash
GET /
```

## 🎯 n8n 워크플로우 통합

### 1단계: HTTP Request 노드
- Method: `POST`
- URL: `https://your-api-endpoint.com/generate`
- Body:
```json
{
  "title": "{{ $json.reportTitle }}",
  "items": {{ $json.items }}
}
```

### 2단계: S3 다운로드 노드
- Bucket: `{{ $json.bucket }}`
- File Key: `{{ $json.key }}`
- Operation: Download File

## 🏗️ 아키텍처 최적화

### 성능 최적화
- ✅ **브라우저 인스턴스 재사용**: 요청마다 새로운 브라우저를 시작하지 않음
- ✅ **멀티스테이지 빌드**: Docker 이미지 크기 최소화
- ✅ **의존성 레이어 캐싱**: npm install 재실행 최소화
- ✅ **메모리 최적화**: `--disable-dev-shm-usage` 플래그 사용

### 보안
- ✅ **비루트 사용자**: 컨테이너 내부에서 `appuser`로 실행
- ✅ **입력 검증**: XSS 방지를 위한 HTML 이스케이핑
- ✅ **환경 변수 검증**: 시작 시 필수 환경 변수 확인
- ✅ **타임아웃 설정**: 무한 대기 방지

### 신뢰성
- ✅ **Graceful Shutdown**: SIGTERM/SIGINT 처리
- ✅ **헬스체크**: Docker/Kubernetes 헬스체크 지원
- ✅ **에러 핸들링**: 상세한 에러 로깅 및 복구
- ✅ **S3 재시도**: 최대 3회 자동 재시도

## 🐳 배포

### Google Cloud Run

```bash
# 이미지 빌드 및 푸시
gcloud builds submit --tag gcr.io/[PROJECT-ID]/n8n-pdf-generator

# Cloud Run 배포
gcloud run deploy n8n-pdf-generator \
  --image gcr.io/[PROJECT-ID]/n8n-pdf-generator \
  --platform managed \
  --region asia-northeast1 \
  --allow-unauthenticated \
  --set-env-vars AWS_REGION=ap-northeast-2 \
  --set-env-vars AWS_ACCESS_KEY_ID=xxx \
  --set-env-vars AWS_SECRET_KEY=xxx \
  --set-env-vars S3_BUCKET_NAME=xxx
```

### Render.com

1. GitHub 저장소 연결
2. Docker 배포 선택
3. 환경 변수 설정
4. 배포

## 📝 라이선스

MIT

## 🤝 기여

이슈 및 PR은 언제든 환영합니다!

## 📧 문의

문제가 있으시면 이슈를 등록해주세요.

