#!/bin/bash

# campaign_briefs_15 폴더의 브리프를 curl로 제출하는 스크립트
# 사용법: 
#   ./scripts/submit_campaigns.sh                    # 기본 포트 3000 사용, 1개만 제출 (기본값, 다음 미제출 파일)
#   ./scripts/submit_campaigns.sh --all             # 기본 포트 3000 사용, 모든 미제출 파일 제출
#   ./scripts/submit_campaigns.sh --reset            # 제출 이력 초기화
#   PORT=3001 ./scripts/submit_campaigns.sh          # 포트 3001 사용, 1개만 제출
#   PORT=3001 ./scripts/submit_campaigns.sh --all    # 포트 3001 사용, 모든 파일 제출
#   API_URL="http://localhost:3001/api/brief" ./scripts/submit_campaigns.sh  # 전체 URL 지정

PORT=${PORT:-3000}
API_URL=${API_URL:-"http://localhost:${PORT}/api/brief"}

# 제출 이력 파일 경로
STATE_FILE=".submitted_briefs.json"

# 기본값은 1개만 제출 (안전을 위해)
# --all 옵션이 있으면 모든 파일 제출
ONE_MODE=true  # 기본값: 1개만 제출
RESET_MODE=false
if [[ "$*" == *"--all"* ]] || [[ "$*" == *"-a"* ]]; then
  ONE_MODE=false  # --all 옵션이 있으면 모든 파일 제출
fi
if [[ "$*" == *"--reset"* ]] || [[ "$*" == *"-r"* ]]; then
  RESET_MODE=true
fi

# 제출 이력 로드 함수
load_submitted_state() {
  if [ -f "$STATE_FILE" ]; then
    # jq가 있으면 사용, 없으면 간단한 파싱
    if command -v jq &> /dev/null; then
      jq -r '.submitted[]?' "$STATE_FILE" 2>/dev/null
    else
      # 간단한 JSON 파싱 (배열에서 파일명 추출)
      grep -o '"[^"]*"' "$STATE_FILE" | sed 's/"//g' | grep -v 'submitted' || echo ""
    fi
  else
    echo ""
  fi
}

# 제출 이력 저장 함수
save_submitted_state() {
  local filename=$1
  
  # 기존 제출 이력 확인 (중복 방지)
  if [ -f "$STATE_FILE" ]; then
    if grep -q "\"$filename\"" "$STATE_FILE" 2>/dev/null; then
      return 0  # 이미 있으면 스킵
    fi
  fi
  
  # jq가 있으면 사용
  if command -v jq &> /dev/null; then
    if [ -f "$STATE_FILE" ]; then
      jq --arg file "$filename" '.submitted += [$file]' "$STATE_FILE" > "${STATE_FILE}.tmp" && mv "${STATE_FILE}.tmp" "$STATE_FILE"
    else
      echo "{\"submitted\": [\"$filename\"]}" > "$STATE_FILE"
    fi
  else
    # jq가 없으면 간단한 JSON 생성
    if [ -f "$STATE_FILE" ]; then
      # 기존 배열에 추가 (간단한 sed 사용)
      # 마지막 ] 앞에 추가
      sed -i.bak "s/\(.*\]\)/\1,\"$filename\"]/" "$STATE_FILE" 2>/dev/null || {
        # sed 실패 시 새로 생성
        echo "{\"submitted\": [\"$filename\"]}" > "$STATE_FILE"
      }
      rm -f "${STATE_FILE}.bak" 2>/dev/null
    else
      echo "{\"submitted\": [\"$filename\"]}" > "$STATE_FILE"
    fi
  fi
}

# 제출 이력 초기화 함수
reset_submitted_state() {
  if [ -f "$STATE_FILE" ]; then
    rm "$STATE_FILE"
    echo "✅ 제출 이력이 초기화되었습니다."
  else
    echo "ℹ️  제출 이력이 없습니다."
  fi
}

# 각 브리프 파일을 파싱하여 JSON으로 변환하고 제출
submit_brief() {
  local file=$1
  local filename=$(basename "$file")
  
  # 파일 내용 파싱 (마크다운 리스트 형식 처리: - **필드명:** 값)
  # 정규표현식을 사용하여 **필드명:** 뒤의 값을 정확하게 추출
  company_name=$(grep -A 1 "## 1. 광고주 정보" "$file" | grep "회사명:" | sed -E 's/^[[:space:]]*-[[:space:]]*\*\*회사명:\*\*[[:space:]]*//' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')
  advertiser_name=$(grep -A 2 "## 1. 광고주 정보" "$file" | grep "담당자명:" | sed -E 's/^[[:space:]]*-[[:space:]]*\*\*담당자명:\*\*[[:space:]]*//' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')
  email=$(grep -A 3 "## 1. 광고주 정보" "$file" | grep "이메일:" | sed -E 's/^[[:space:]]*-[[:space:]]*\*\*이메일:\*\*[[:space:]]*//' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')
  product_name=$(grep -A 1 "## 2. 캠페인 개요" "$file" | grep "제품/서비스:" | sed -E 's/^[[:space:]]*-[[:space:]]*\*\*제품\/서비스:\*\*[[:space:]]*//' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')
  budget_usd=$(grep -A 2 "## 2. 캠페인 개요" "$file" | grep "캠페인 총 예산" | sed -E 's/^[[:space:]]*-[[:space:]]*\*\*캠페인 총 예산 \(USD\):\*\*[[:space:]]*//' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')
  target_demographics=$(grep -A 1 "## 3. (중요) 캠페인 정량 목표" "$file" | grep "핵심 타겟 인구통계:" | sed -E 's/^[[:space:]]*-[[:space:]]*\*\*핵심 타겟 인구통계:\*\*[[:space:]]*//' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')
  target_cpm=$(grep -A 2 "## 3. (중요) 캠페인 정량 목표" "$file" | grep "목표 CPM" | sed -E 's/^[[:space:]]*-[[:space:]]*\*\*목표 CPM \(이하\):\*\*[[:space:]]*//' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')
  target_ctr=$(grep -A 3 "## 3. (중요) 캠페인 정량 목표" "$file" | grep "목표 CTR" | sed -E 's/^[[:space:]]*-[[:space:]]*\*\*목표 CTR \(이상\):\*\*[[:space:]]*//' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')
  # 섹션 4는 "(의도)"가 있을 수 있으므로 유연하게 처리
  details=$(grep -A 1 "## 4. 캠페인 정성 목표" "$file" | grep "상세 내용:" | sed -E 's/^[[:space:]]*-[[:space:]]*\*\*상세 내용:\*\*[[:space:]]*//' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')
  
  # 빈 값 처리 (선택 필드는 빈 문자열로)
  target_cpm=${target_cpm:-""}
  target_ctr=${target_ctr:-""}
  
  # JSON 이스케이프 함수 (특수문자 처리)
  escape_json() {
    echo "$1" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g' | sed 's/\//\\\//g' | sed 's/\n/\\n/g' | sed 's/\r/\\r/g' | sed 's/\t/\\t/g'
  }
  
  # JSON 생성 (이스케이프 처리)
  json_data=$(cat <<EOF
{
  "advertiserName": "$(escape_json "$advertiser_name")",
  "companyEmail": "$(escape_json "$email")",
  "companyName": "$(escape_json "$company_name")",
  "productName": "$(escape_json "$product_name")",
  "budgetUsd": "$budget_usd",
  "targetCpm": "$target_cpm",
  "targetCtr": "$target_ctr",
  "targetDemographics": "$target_demographics",
  "details": "$(escape_json "$details")"
}
EOF
)
  
  # 디버깅: 제출할 JSON 내용 표시
  echo "📤 제출할 JSON:"
  if command -v jq &> /dev/null; then
    echo "$json_data" | jq .
  else
    echo "$json_data"
  fi
  echo ""
  
  # curl로 제출
  response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "$json_data")
  
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | sed '$d')
  
  if [ "$http_code" = "201" ]; then
    echo "✅ 제출 성공: $filename"
    # 제출 성공 시 이력 저장
    save_submitted_state "$filename"
    return 0
  else
    echo "❌ 제출 실패: $filename (HTTP $http_code)"
    echo "   $body"
    return 1
  fi
  
  sleep 0.5  # API 부하 방지를 위한 딜레이
}

# 리셋 모드 처리
if [ "$RESET_MODE" = true ]; then
  reset_submitted_state
  exit 0
fi

# campaign_briefs_15 폴더의 모든 .md 파일 처리
BRIEFS_DIR="docs/campaign_briefs_15"

if [ ! -d "$BRIEFS_DIR" ]; then
  echo "Error: Directory $BRIEFS_DIR not found"
  exit 1
fi

# 제출 이력 로드
submitted_files=($(load_submitted_state))

# 파일 목록을 정렬하여 가져오기
files=("$BRIEFS_DIR"/brief_form_*.md)
# 파일이 없으면 에러
if [ ! -e "${files[0]}" ]; then
  echo "Error: No brief files found in $BRIEFS_DIR"
  exit 1
fi

# 파일을 정렬
IFS=$'\n' sorted_files=($(sort <<<"${files[*]}"))
unset IFS

# 이미 제출한 파일 제외하고 필터링
pending_files=()
for file in "${sorted_files[@]}"; do
  filename=$(basename "$file")
  is_submitted=false
  for submitted in "${submitted_files[@]}"; do
    if [ "$filename" = "$submitted" ]; then
      is_submitted=true
      break
    fi
  done
  if [ "$is_submitted" = false ]; then
    pending_files+=("$file")
  fi
done

# 제출 대기 중인 파일이 없으면 종료
if [ ${#pending_files[@]} -eq 0 ]; then
  echo "✅ 모든 파일이 이미 제출되었습니다! (${#sorted_files[@]}개)"
  echo "💡 제출 이력 초기화: ./scripts/submit_campaigns.sh --reset"
  exit 0
fi

# ONE_MODE인 경우 첫 번째 미제출 파일만 처리
success_count=0
if [ "$ONE_MODE" = true ]; then
  if [ -f "${pending_files[0]}" ]; then
    submit_brief "${pending_files[0]}"
    if [ $? -eq 0 ]; then
      success_count=1
    fi
  else
    echo "Error: No files to process"
    exit 1
  fi
else
  # 모든 미제출 파일 처리
  for file in "${pending_files[@]}"; do
    if [ -f "$file" ]; then
      submit_brief "$file"
      if [ $? -eq 0 ]; then
        success_count=$((success_count + 1))
      fi
    fi
  done
fi

