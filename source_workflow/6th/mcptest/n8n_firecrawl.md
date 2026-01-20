# Firecrawl API - n8n 학습 노트
> Firecrawl API의 주요 엔드포인트들을 curl 명령어로 변환한 문서입니다. 각 요청은 n8n HTTP Request 노드에 import하여 사용할 수 있습니다.

## 📋 사전 준비

### 환경 변수 설정
```bash
# Firecrawl API 키 설정 (n8n 환경 변수로도 사용 가능)
export FIRECRAWL_API_KEY="fc-cfa792411d834910a552f1dd8a4ed90b"
```

### n8n 환경 변수 설정
n8n 설정에서 다음 환경 변수를 추가하세요:
- `FIRECRAWL_API_KEY=fc-cfa792411d834910a552f1dd8a4ed90b`

---

## 1. Scrape 작업 - 프롬프트 Only (JSON 추출)

### 📝 설명
AI타임스 기사에서 제목, 본문 내용, 기자 이름을 한국어 프롬프트로 추출하는 요청입니다.

### 🔗 curl 명령어
```bash
curl -X POST https://api.firecrawl.dev/v2/scrape \
  -H "Authorization: Bearer $FIRECRAWL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.aitimes.com/news/articleView.html?idxno=202947",
    "formats": [
      {
        "type": "json",
        "prompt": "이 기사에서 제목(title), 전체 본문 내용(content), 그리고 기자 이름(author)을 추출해서 알려줘."
      }
    ]
  }'
```

### ⚙️ n8n HTTP 노드 설정
- **Method**: POST
- **URL**: `https://api.firecrawl.dev/v2/scrape`
- **Headers**:
  - `Authorization`: `Bearer {{ $env.FIRECRAWL_API_KEY }}`
  - `Content-Type`: `application/json`
- **Body** (JSON):
  ```json
  {
    "url": "https://www.aitimes.com/news/articleView.html?idxno=202947",
    "formats": [
      {
        "type": "json",
        "prompt": "이 기사에서 제목(title), 전체 본문 내용(content), 그리고 기자 이름(author)을 추출해서 알려줘."
      }
    ]
  }
  ```

### 📤 예상 응답
```json
{
  "success": true,
  "data": {
    "formats": [
      {
        "type": "json",
        "content": {
          "title": "기사 제목",
          "content": "기사 본문 내용...",
          "author": "기자 이름"
        }
      }
    ]
  }
}
```

---

## 2. Scrape 작업 - 스키마 + 서머리

### 📝 설명
JSON 스키마를 사용한 구조화된 데이터 추출과 함께 요약(summary)을 함께 받는 요청입니다.

### 🔗 curl 명령어
```bash
curl -X POST https://api.firecrawl.dev/v2/scrape \
  -H "Authorization: Bearer $FIRECRAWL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.aitimes.com/news/articleView.html?idxno=202946",
    "formats": [
      "summary",
      {
        "type": "json",
        "schema": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "기사 제목"
            },
            "contents": {
              "type": "string",
              "description": "본문 전체 텍스트(HTML 태그 제거)"
            },
            "author": {
              "type": "string",
              "description": "저자 또는 기자 이름"
            },
            "timestamp": {
              "type": "string",
              "description": "발행 시간 (yyyy-MM-dd HH:mm)"
            }
          },
          "required": ["title", "contents", "author", "timestamp"]
        }
      }
    ]
  }'
```

### ⚙️ n8n HTTP 노드 설정
- **Method**: POST
- **URL**: `https://api.firecrawl.dev/v2/scrape`
- **Headers**:
  - `Authorization`: `Bearer {{ $env.FIRECRAWL_API_KEY }}`
  - `Content-Type`: `application/json`
- **Body** (JSON):
  ```json
  {
    "url": "https://www.aitimes.com/news/articleView.html?idxno=202946",
    "formats": [
      "summary",
      {
        "type": "json",
        "schema": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "기사 제목"
            },
            "contents": {
              "type": "string",
              "description": "본문 전체 텍스트(HTML 태그 제거)"
            },
            "author": {
              "type": "string",
              "description": "저자 또는 기자 이름"
            },
            "timestamp": {
              "type": "string",
              "description": "발행 시간 (yyyy-MM-dd HH:mm)"
            }
          },
          "required": ["title", "contents", "author", "timestamp"]
        }
      }
    ]
  }
  ```

### 📤 예상 응답
```json
{
  "success": true,
  "data": {
    "formats": [
      {
        "type": "summary",
        "content": "기사 요약 내용..."
      },
      {
        "type": "json",
        "content": {
          "title": "기사 제목",
          "contents": "HTML 태그가 제거된 본문...",
          "author": "기자 이름",
          "timestamp": "2025-01-15 14:30"
        }
      }
    ]
  }
}
```

---

## 3. Scrape 작업 - YouTube 동영상

### 📝 설명
YouTube 동영상의 자막이나 내용을 Markdown 형식으로 추출하는 요청입니다.

### 🔗 curl 명령어
```bash
curl -X POST https://api.firecrawl.dev/v2/scrape \
  -H "Authorization: Bearer $FIRECRAWL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.youtube.com/watch?v=idccdssOZQ8",
    "formats": ["markdown"]
  }'
```

### ⚙️ n8n HTTP 노드 설정
- **Method**: POST
- **URL**: `https://api.firecrawl.dev/v2/scrape`
- **Headers**:
  - `Authorization`: `Bearer {{ $env.FIRECRAWL_API_KEY }}`
  - `Content-Type`: `application/json`
- **Body** (JSON):
  ```json
  {
    "url": "https://www.youtube.com/watch?v=idccdssOZQ8",
    "formats": ["markdown"]
  }
  ```

### 📤 예상 응답
```json
{
  "success": true,
  "data": {
    "formats": [
      {
        "type": "markdown",
        "content": "# YouTube 비디오 제목\n\n비디오 내용 및 자막...\n\n## 주요 포인트\n- 포인트 1\n- 포인트 2\n..."
      }
    ]
  }
}
```

---

## 4. Extract 작업 - 비동기 추출 시작

### 📝 설명
여러 URL에서 데이터를 비동기적으로 추출하는 작업을 시작합니다. 작업 ID를 반환받아 결과를 조회할 수 있습니다.

### 🔗 curl 명령어
```bash
curl -X POST https://api.firecrawl.dev/v2/extract \
  -H "Authorization: Bearer $FIRECRAWL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "urls": ["https://www.aitimes.com/news/articleView.html?idxno=202947"],
    "prompt": "Extract the title, content, and the author from this news article."
  }'
```

### ⚙️ n8n HTTP 노드 설정
- **Method**: POST
- **URL**: `https://api.firecrawl.dev/v2/extract`
- **Headers**:
  - `Authorization`: `Bearer {{ $env.FIRECRAWL_API_KEY }}`
  - `Content-Type`: `application/json`
- **Body** (JSON):
  ```json
  {
    "urls": ["https://www.aitimes.com/news/articleView.html?idxno=202947"],
    "prompt": "Extract the title, content, and the author from this news article."
  }
  ```

### 📤 예상 응답 (작업 ID 반환)
```json
{
  "success": true,
  "id": "extract_1234567890abcdef"
}
```

---

## 5. Extract 결과 조회

### 📝 설명
Extract 작업의 결과를 조회합니다. 이전 요청에서 받은 작업 ID를 사용합니다.

### 🔗 curl 명령어
```bash
# 작업 ID를 변수로 설정
EXTRACT_ID="extract_1234567890abcdef"

curl -X GET "https://api.firecrawl.dev/v2/extract/$EXTRACT_ID" \
  -H "Authorization: Bearer $FIRECRAWL_API_KEY"
```

### ⚙️ n8n HTTP 노드 설정
- **Method**: GET
- **URL**: `https://api.firecrawl.dev/v2/extract/{{ $json.id }}`
  - `{{ $json.id }}`는 이전 Extract 요청의 응답에서 받은 ID입니다.
- **Headers**:
  - `Authorization`: `Bearer {{ $env.FIRECRAWL_API_KEY }}`

### 📤 예상 응답 (완료된 경우)
```json
{
  "success": true,
  "status": "completed",
  "data": {
    "success_count": 1,
    "error_count": 0,
    "results": [
      {
        "url": "https://www.aitimes.com/news/articleView.html?idxno=202947",
        "success": true,
        "content": {
          "title": "기사 제목",
          "content": "기사 내용...",
          "author": "기자 이름"
        }
      }
    ]
  }
}
```

---

## 6. Search 작업 - AI 에이전트 검색

### 📝 설명
"AI agents" 키워드로 뉴스 소스에서 검색하고, Markdown과 링크 형식으로 결과를 받습니다.

### 🔗 curl 명령어
```bash
curl -X POST https://api.firecrawl.dev/v2/search \
  -H "Authorization: Bearer $FIRECRAWL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "ai agents",
    "sources": ["news"],
    "limit": 5,
    "scrapeOptions": {
      "formats": ["markdown", "links"]
    }
  }'
```

### ⚙️ n8n HTTP 노드 설정
- **Method**: POST
- **URL**: `https://api.firecrawl.dev/v2/search`
- **Headers**:
  - `Authorization`: `Bearer {{ $env.FIRECRAWL_API_KEY }}`
  - `Content-Type`: `application/json`
- **Body** (JSON):
  ```json
  {
    "query": "ai agents",
    "sources": ["news"],
    "limit": 5,
    "scrapeOptions": {
      "formats": ["markdown", "links"]
    }
  }
  ```

### 📤 예상 응답
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "title": "AI 에이전트의 미래",
        "url": "https://example.com/ai-agents",
        "source": "news",
        "formats": {
          "markdown": "# AI 에이전트의 미래\n\n내용...",
          "links": ["https://example.com/link1", "https://example.com/link2"]
        }
      }
    ]
  }
}
```

---

## 7. Map 작업 - 웹사이트 맵 생성

### 📝 설명
주어진 URL의 전체 사이트 맵을 생성합니다. CrewAI 문서 사이트를 예시로 사용합니다.

### 🔗 curl 명령어
```bash
curl -X POST https://api.firecrawl.dev/v2/map \
  -H "Authorization: Bearer $FIRECRAWL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://docs.crewai.com/"
  }'
```

### ⚙️ n8n HTTP 노드 설정
- **Method**: POST
- **URL**: `https://api.firecrawl.dev/v2/map`
- **Headers**:
  - `Authorization`: `Bearer {{ $env.FIRECRAWL_API_KEY }}`
  - `Content-Type`: `application/json`
- **Body** (JSON):
  ```json
  {
    "url": "https://docs.crewai.com/"
  }
  ```

### 📤 예상 응답
```json
{
  "success": true,
  "data": {
    "id": "map_1234567890abcdef",
    "status": "completed",
    "metadata": {
      "total_pages": 25,
      "starting_url": "https://docs.crewai.com/"
    },
    "links": [
      "https://docs.crewai.com/core-concepts/Agents/",
      "https://docs.crewai.com/core-concepts/Tools/",
      "..."
    ]
  }
}
```

---

## 🎯 n8n 워크플로우 팁

### 1. 환경 변수 활용
```javascript
// n8n 표현식으로 API 키 사용
Bearer {{ $env.FIRECRAWL_API_KEY }}

// 이전 노드 응답에서 ID 추출
{{ $json.id }}
{{ $node["Extract Task"].json.id }}
```

### 2. 에러 핸들링 노드 추가
각 HTTP Request 노드 뒤에 **IF 노드**를 추가하여:
- `statusCode === 200` → 성공 경로
- `statusCode !== 200` → 에러 핸들링

### 3. 재시도 로직
HTTP Request 노드의 **Options**에서:
- **Retry on Fail**: 3회
- **Timeout**: 30000ms (30초)

### 4. 데이터 변환
**Code 노드**를 사용하여 응답 데이터를 정리:
```javascript
// JSON 추출 결과 파싱
const result = $input.first().json.data.formats[0].content;
return [{
  title: result.title,
  content: result.content,
  author: result.author
}];
```

---

## 🔍 고급 사용법

### 병렬 처리 워크플로우
1. **Function 노드**: 여러 URL 배열 생성
2. **Split In Batches 노드**: URL을 개별 요청으로 분할
3. **HTTP Request 노드**: 각 URL에 대해 Scrape 실행
4. **Merge 노드**: 결과를 하나로 합치기

### 스케줄링
**Cron 노드**를 사용하여:
- 매일 최신 AI 뉴스 수집
- 주간 AI 트렌드 리포트 생성

### 데이터 저장
**Google Sheets 노드** 또는 **PostgreSQL 노드**를 연결하여:
- 추출된 기사 데이터 영구 저장
- 분석 및 보고서용 데이터베이스 구축

---

## 📚 참고 자료

- [Firecrawl API 문서](https://docs.firecrawl.dev/)
- [n8n HTTP Request 노드](https://docs.n8n.io/nodes/n8n-nodes-base.httpRequest/)
- [n8n 환경 변수](https://docs.n8n.io/hosting/configuration/environment-variables/)

> 이 문서는 2025년 10월 9일 기준으로 작성되었습니다. API가 업데이트될 경우 요청 형식을 확인하세요.
