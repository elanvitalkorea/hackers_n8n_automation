# MCP 메모 서버

Model Context Protocol (MCP)을 사용한 간단한 메모 저장/삭제 서버입니다.

## 기능

- **Tools**: 메모 추가/삭제
- **Resources**: memo.json 파일 기반 메모 조회
- **Prompts**: 메모 요약 및 검색 프롬프트

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 서버 실행
```bash
npm start
```

### 3. 테스트 실행
```bash
npm test
```

## MCP 설정 가이드

### Cursor MCP 설정

기존 Cursor MCP 설정 파일을 직접 수정하지 말고, 다음 가이드를 따라 설정하세요:

1. **Cursor 설정 파일 위치 확인**:
   - macOS: `~/Library/Application Support/Cursor/User/globalStorage/cursor.mcp/settings.json`
   - Windows: `%APPDATA%/Cursor/User/globalStorage/cursor.mcp/settings.json`
   - Linux: `~/.config/Cursor/User/globalStorage/cursor.mcp/settings.json`

2. **설정 파일에 다음 내용 추가**:
```json
{
  "mcpServers": {
    "memo-server": {
      "command": "/opt/homebrew/bin/node",
      "args": ["/Users/joosung/source/temp/mcpmemo5/index.js"],
      "env": {}
    }
  }
}
```

3. **경로 수정 필요사항**:
   - `command`: `which node` 명령으로 확인한 실제 Node.js 경로
   - `args`: 실제 프로젝트 경로로 수정

### 대안: 독립적인 MCP 설정 파일

`mcp-config.json` 파일을 사용하여 독립적으로 설정할 수 있습니다:

```json
{
  "mcpServers": {
    "memo-server": {
      "command": "/opt/homebrew/bin/node",
      "args": ["/Users/joosung/source/temp/mcpmemo5/index.js"],
      "env": {}
    }
  }
}
```

## API 사용법

### Tools

#### add_memo
새로운 메모를 추가합니다.
```json
{
  "name": "add_memo",
  "arguments": {
    "content": "메모 내용"
  }
}
```

#### delete_memo
메모를 삭제합니다.
```json
{
  "name": "delete_memo",
  "arguments": {
    "id": "메모 ID"
  }
}
```

### Resources

#### memo://memos
저장된 모든 메모를 JSON 형태로 조회합니다.

### Prompts

#### memo_summary
메모를 주제별로 요약합니다.
```json
{
  "name": "memo_summary",
  "arguments": {
    "topic": "요약할 주제 (선택사항)"
  }
}
```

#### memo_search
메모에서 특정 검색어를 찾습니다.
```json
{
  "name": "memo_search",
  "arguments": {
    "query": "검색어"
  }
}
```

## 데이터 저장

메모는 `memo.json` 파일에 저장되며, 다음과 같은 구조를 가집니다:

```json
[
  {
    "id": "1234567890",
    "content": "메모 내용",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## 확장 가능성

- 데이터베이스 연동 (SQLite, PostgreSQL 등)
- 사용자별 메모 분리
- 메모 태그 기능
- 메모 수정 기능
- 메모 검색 고도화

## 개발자 정보

- Node.js ES6 모듈 사용
- MCP SDK v0.5.0 기반
- 단일 파일 구조 (index.js)
- 테스트 클라이언트 포함








