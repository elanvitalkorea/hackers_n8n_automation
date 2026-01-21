# 🧪 로컬 Docker Compose 테스트 가이드

이 가이드는 로컬 환경에서 Docker Compose를 사용하여 애플리케이션을 테스트하는 방법을 설명합니다.

## 📋 사전 준비

### 1. Docker 설치 확인
```bash
docker --version
docker-compose --version
```

### 2. AWS 자격증명 준비
- AWS 콘솔에서 IAM 사용자 생성
- S3 버킷 생성
- Access Key ID와 Secret Access Key 확보

### 3. 환경 변수 설정
```bash
# env.sample을 .env로 복사
cp env.sample .env

# .env 파일을 편집하여 실제 AWS 자격증명 입력
# 또는 .env.test를 수정하여 사용
```

## 🚀 Docker Compose 실행

### 1단계: 이미지 빌드
```bash
docker-compose build
```

예상 소요 시간: 2-5분 (처음 실행 시)

### 2단계: 컨테이너 시작
```bash
# 포그라운드 실행 (로그 확인)
docker-compose up

# 또는 백그라운드 실행
docker-compose up -d
```

### 3단계: 로그 확인
```bash
# 실시간 로그 확인
docker-compose logs -f

# 최근 50줄만 확인
docker-compose logs --tail=50
```

### 4단계: 컨테이너 상태 확인
```bash
docker-compose ps
```

예상 출력:
```
NAME                COMMAND             STATUS              PORTS
pdf-generator-1     "npm start"         Up 10 seconds       0.0.0.0:8080->8080/tcp
```

## 🧪 테스트 실행

### 방법 1: Bash 스크립트 (권장)
```bash
# 실행 권한 부여
chmod +x test.sh

# 테스트 실행
./test.sh
```

**필요한 도구:**
- `curl`: HTTP 요청
- `jq`: JSON 파싱 (설치: `brew install jq` 또는 `apt install jq`)

### 방법 2: Node.js 스크립트
```bash
# node-fetch 설치 (필요한 경우)
npm install node-fetch

# 테스트 실행
node test.js
```

### 방법 3: curl 직접 사용
```bash
# 1. Health Check
curl http://localhost:8080/health | jq '.'

# 2. API 정보
curl http://localhost:8080/ | jq '.'

# 3. PDF 생성
curl -X POST http://localhost:8080/generate \
  -H "Content-Type: application/json" \
  -d @test-data.json | jq '.'

# 4. 간단한 테스트
curl -X POST http://localhost:8080/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "테스트",
    "items": [
      {"name": "항목1", "value": "값1"},
      {"name": "항목2", "value": "값2"}
    ]
  }' | jq '.'
```

### 방법 4: Postman/Insomnia 사용
1. POST 요청 생성: `http://localhost:8080/generate`
2. Headers: `Content-Type: application/json`
3. Body (raw JSON):
```json
{
  "title": "테스트 리포트",
  "items": [
    {"name": "매출", "value": "1,000,000원"},
    {"name": "방문자", "value": "5,000명"}
  ]
}
```

## 🔍 테스트 시나리오

### 시나리오 1: 기본 PDF 생성
```bash
curl -X POST http://localhost:8080/generate \
  -H "Content-Type: application/json" \
  -d @test-data.json
```

**예상 결과:**
```json
{
  "success": true,
  "message": "PDF generated and uploaded to S3",
  "bucket": "your-bucket",
  "key": "reports/2025-10-29/report-xxx.pdf",
  "size": 12345,
  "duration": "1234ms"
}
```

### 시나리오 2: 에러 처리 확인
```bash
# 잘못된 데이터 전송
curl -X POST http://localhost:8080/generate \
  -H "Content-Type: application/json" \
  -d '{"invalid": "data"}'
```

**예상 결과:**
```json
{
  "success": false,
  "error": "Request body must contain an \"items\" array",
  "timestamp": "2025-10-29T12:00:00.000Z"
}
```

### 시나리오 3: 대용량 데이터
```bash
# 20개 항목이 포함된 PDF 생성
node -e "
console.log(JSON.stringify({
  title: '대용량 테스트',
  items: Array.from({length: 20}, (_, i) => ({
    name: \`항목 \${i+1}\`,
    value: \`값 \${i+1}\`
  }))
}))
" | curl -X POST http://localhost:8080/generate \
  -H "Content-Type: application/json" \
  -d @-
```

## 📊 결과 확인

### 1. AWS S3 콘솔에서 확인
```
https://s3.console.aws.amazon.com/s3/buckets/YOUR_BUCKET_NAME?prefix=reports/
```

### 2. AWS CLI로 확인
```bash
# 업로드된 파일 목록
aws s3 ls s3://YOUR_BUCKET_NAME/reports/ --recursive

# 최근 파일 확인
aws s3 ls s3://YOUR_BUCKET_NAME/reports/ --recursive | tail -5
```

### 3. PDF 다운로드
```bash
# S3에서 로컬로 다운로드
aws s3 cp s3://YOUR_BUCKET_NAME/reports/2025-10-29/report-xxx.pdf ./test-output.pdf

# 파일 열기 (macOS)
open test-output.pdf

# 파일 열기 (Linux)
xdg-open test-output.pdf
```

## 🛠️ 트러블슈팅

### 문제 1: 컨테이너가 시작되지 않음
```bash
# 로그 확인
docker-compose logs

# 환경 변수 확인
docker-compose config

# 이미지 재빌드
docker-compose build --no-cache
```

### 문제 2: "Missing required environment variables"
```bash
# .env 파일 확인
cat .env

# 환경 변수가 제대로 로드되는지 확인
docker-compose run --rm pdf-generator env | grep AWS
```

### 문제 3: S3 업로드 실패
```bash
# AWS 자격증명 테스트
docker-compose run --rm pdf-generator node -e "
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';
const client = new S3Client({ region: process.env.AWS_REGION });
client.send(new ListBucketsCommand({})).then(console.log).catch(console.error);
"
```

### 문제 4: Puppeteer 에러
```bash
# Chromium 설치 확인
docker-compose exec pdf-generator which chromium

# 브라우저 테스트
docker-compose exec pdf-generator node -e "
import puppeteer from 'puppeteer';
puppeteer.launch({args: ['--no-sandbox']}).then(b => {
  console.log('Browser OK');
  b.close();
});
"
```

## 🧹 정리

### 컨테이너 중지
```bash
docker-compose down
```

### 컨테이너 및 볼륨 삭제
```bash
docker-compose down -v
```

### 이미지까지 삭제
```bash
docker-compose down --rmi all -v
```

## 📝 다음 단계

테스트가 성공적으로 완료되면:
1. ✅ 로컬 환경에서 정상 작동 확인
2. 🚀 프로덕션 배포 (Cloud Run, Render 등)
3. 🔗 n8n 워크플로우와 통합
4. 📊 모니터링 및 로그 설정

## 💡 팁

- **빠른 테스트**: `./test.sh`로 한 번에 모든 테스트 실행
- **디버깅**: `docker-compose logs -f`로 실시간 로그 확인
- **성능 측정**: `test.js`에서 duration 확인
- **S3 비용**: 테스트 후 생성된 PDF 파일 정기적으로 삭제

