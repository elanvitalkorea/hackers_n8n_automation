로컬 Docker Compose로 테스트하는 전체 과정을 안내하고 테스트 자료를 생성해드리겠습니다!

[6 tools called]

완벽합니다! 🎉 로컬 Docker Compose 테스트를 위한 모든 준비가 완료되었습니다.

## 📦 생성된 테스트 파일들

### 1. **test-data.json** - 샘플 테스트 데이터
월간 판매 리포트 형식의 실제 데이터 (8개 항목 포함)

### 2. **test.sh** - Bash 테스트 스크립트 (권장)
- ✅ Health Check
- ✅ API 정보 조회
- ✅ PDF 생성 (test-data.json)
- ✅ 간단한 데이터 추가 테스트
- ✅ 컬러풀한 출력 및 결과 요약

### 3. **test.js** - Node.js 테스트 스크립트 (고급)
- ✅ 5가지 테스트 카테고리
- ✅ 에러 핸들링 테스트
- ✅ 다양한 데이터 형식 테스트
- ✅ 상세한 결과 리포트

### 4. **TESTING.md** - 완전한 테스트 가이드
모든 테스트 방법과 트러블슈팅 가이드 포함

## 🚀 빠른 시작 가이드

### 1단계: 환경 변수 설정
```bash
# env.sample을 복사하여 .env 생성
cp env.sample .env

# .env 파일을 편집하여 실제 AWS 자격증명 입력
nano .env  # 또는 원하는 에디터 사용
```

**필수 환경 변수:**
```
AWS_REGION=ap-northeast-2
AWS_ACCESS_KEY_ID=실제_액세스_키
AWS_SECRET_KEY=실제_시크릿_키
S3_BUCKET_NAME=실제_버킷_이름
```

### 2단계: Docker Compose 빌드 및 실행
```bash
# 이미지 빌드
docker-compose build

# 컨테이너 시작 (백그라운드)
docker-compose up -d

# 로그 확인
docker-compose logs -f
```

### 3단계: 테스트 실행 (3가지 방법)

#### ✨ 방법 1: Bash 스크립트 (가장 간단)
```bash
./test.sh
```

#### 방법 2: Node.js 스크립트 (더 상세한 테스트)
```bash
node test.js
```

#### 방법 3: curl 직접 사용
```bash
# Health Check
curl http://localhost:8080/health | jq '.'

# PDF 생성
curl -X POST http://localhost:8080/generate \
  -H "Content-Type: application/json" \
  -d @test-data.json | jq '.'
```

## 🎯 예상 테스트 결과

### 성공적인 응답 예시:
```json
{
  "success": true,
  "message": "PDF generated and uploaded to S3",
  "bucket": "your-bucket-name",
  "key": "reports/2025-10-29/report-abc123.pdf",
  "size": 45678,
  "duration": "1234ms"
}
```

### 테스트 스크립트 출력 예시:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  n8n PDF Generator - 테스트 스크립트
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1/4] 서버 Health Check...
✓ 서버가 정상 작동 중입니다

[2/4] API 정보 조회...
✓ API 정보 조회 성공

[3/4] PDF 생성 테스트...
✓ PDF 생성 및 S3 업로드 성공!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  업로드된 파일 정보:
  Bucket: my-bucket
  Key: reports/2025-10-29/report-xxx.pdf
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[4/4] 간단한 데이터로 추가 테스트...
✓ 간단한 데이터 테스트 성공!

  모든 테스트가 완료되었습니다! 🎉
```

## 🔍 결과 확인 방법

### 1. AWS S3 콘솔에서 확인
```bash
# 브라우저에서 열기
open "https://s3.console.aws.amazon.com/s3/buckets/YOUR_BUCKET/reports/"
```

### 2. AWS CLI로 확인
```bash
# 업로드된 파일 목록
aws s3 ls s3://YOUR_BUCKET/reports/ --recursive

# 최신 파일 다운로드
aws s3 cp s3://YOUR_BUCKET/reports/2025-10-29/report-xxx.pdf ./test-result.pdf
open test-result.pdf
```

## 🛠️ 주요 명령어 요약

```bash
# 시작
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 테스트
./test.sh

# 중지
docker-compose down

# 완전 정리
docker-compose down -v --rmi all
```

## 💡 문제 해결

### jq가 설치되지 않은 경우:
```bash
# macOS
brew install jq

# Ubuntu/Debian
sudo apt install jq
```

### 환경 변수 문제:
```bash
# 현재 설정 확인
docker-compose config

# 특정 변수 확인
docker-compose run --rm pdf-generator env | grep AWS
```

### 포트 충돌:
```bash
# docker-compose.yml의 포트 변경
ports:
  - "8081:8080"  # 8080 대신 8081 사용
```

이제 준비가 완료되었습니다! 위의 단계대로 실행하시면 됩니다. 🚀

궁금한 점이나 에러가 발생하면 알려주세요!