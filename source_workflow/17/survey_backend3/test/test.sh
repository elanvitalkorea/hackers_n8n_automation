#!/bin/bash

# 색상 정의
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

API_URL="http://localhost:8080"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  n8n PDF Generator - 테스트 스크립트${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 1. 서버 시작 확인
echo -e "${YELLOW}[1/4] 서버 Health Check...${NC}"
HEALTH_RESPONSE=$(curl -s "${API_URL}/health")
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ 서버가 정상 작동 중입니다${NC}"
    echo "${HEALTH_RESPONSE}" | jq '.'
else
    echo -e "${RED}✗ 서버에 연결할 수 없습니다${NC}"
    echo -e "${YELLOW}  docker-compose ps 명령으로 컨테이너 상태를 확인하세요${NC}"
    exit 1
fi

echo ""

# 2. API 정보 확인
echo -e "${YELLOW}[2/4] API 정보 조회...${NC}"
API_INFO=$(curl -s "${API_URL}/")
echo "${API_INFO}" | jq '.'

echo ""

# 3. PDF 생성 테스트 (샘플 데이터 1)
echo -e "${YELLOW}[3/4] PDF 생성 테스트 (test-data.json)...${NC}"
PDF_RESPONSE=$(curl -s -X POST "${API_URL}/generate" \
    -H "Content-Type: application/json" \
    -d @test-data.json)

if echo "${PDF_RESPONSE}" | jq -e '.success' > /dev/null 2>&1; then
    echo -e "${GREEN}✓ PDF 생성 및 S3 업로드 성공!${NC}"
    echo "${PDF_RESPONSE}" | jq '.'
    
    # S3 정보 추출
    BUCKET=$(echo "${PDF_RESPONSE}" | jq -r '.bucket')
    KEY=$(echo "${PDF_RESPONSE}" | jq -r '.key')
    
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}  업로드된 파일 정보:${NC}"
    echo -e "${GREEN}  Bucket: ${BUCKET}${NC}"
    echo -e "${GREEN}  Key: ${KEY}${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
else
    echo -e "${RED}✗ PDF 생성 실패${NC}"
    echo "${PDF_RESPONSE}" | jq '.'
    exit 1
fi

echo ""

# 4. 추가 테스트 (간단한 데이터)
echo -e "${YELLOW}[4/4] 간단한 데이터로 추가 테스트...${NC}"
SIMPLE_DATA='{
  "title": "테스트 리포트",
  "items": [
    {"name": "항목1", "value": "값1"},
    {"name": "항목2", "value": "값2"},
    {"name": "항목3", "value": "값3"}
  ]
}'

SIMPLE_RESPONSE=$(curl -s -X POST "${API_URL}/generate" \
    -H "Content-Type: application/json" \
    -d "${SIMPLE_DATA}")

if echo "${SIMPLE_RESPONSE}" | jq -e '.success' > /dev/null 2>&1; then
    echo -e "${GREEN}✓ 간단한 데이터 테스트 성공!${NC}"
    echo "${SIMPLE_RESPONSE}" | jq '.'
else
    echo -e "${RED}✗ 테스트 실패${NC}"
    echo "${SIMPLE_RESPONSE}" | jq '.'
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  모든 테스트가 완료되었습니다! 🎉${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}AWS S3 콘솔에서 업로드된 PDF를 확인해보세요:${NC}"
echo -e "https://s3.console.aws.amazon.com/s3/buckets/${BUCKET}?region=${AWS_REGION:-ap-northeast-2}&prefix=reports/"

