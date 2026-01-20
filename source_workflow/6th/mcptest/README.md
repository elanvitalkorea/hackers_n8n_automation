# Todo 웹 애플리케이션 ✨

간단하고 아름다운 Todo 웹 애플리케이션입니다.

## 기능

- ✅ 할 일 추가
- ✅ 할 일 완료 표시
- ✅ 할 일 삭제
- ✅ 실시간 통계 (전체/완료/남은 할 일)
- ✅ 모던한 UI/UX

## 기술 스택

- **백엔드**: FastAPI (Python)
- **프론트엔드**: HTML, CSS, JavaScript
- **API**: RESTful API

## 설치 및 실행

### 1. 의존성 설치

```bash
uv pip install -r requirements.txt
```

### 2. 서버 실행

```bash
.venv/bin/python main.py
```

또는 (개발 모드, 자동 재시작)

```bash
.venv/bin/uvicorn main:app --reload
```

### 3. 브라우저에서 접속

```
http://localhost:8000
```

## API 엔드포인트

- `GET /api/todos` - 모든 할일 목록 조회
- `POST /api/todos` - 새 할일 생성
- `PUT /api/todos/{todo_id}` - 할일 수정
- `DELETE /api/todos/{todo_id}` - 할일 삭제

## 프로젝트 구조

```
.
├── main.py              # FastAPI 백엔드 서버
├── static/
│   └── index.html      # 프론트엔드 (HTML/CSS/JS)
├── requirements.txt    # 프로젝트 의존성
└── README.md           # 프로젝트 문서
```

## 개발

개발 모드로 실행하려면:

```bash
.venv/bin/uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

이렇게 하면 코드 변경사항이 자동으로 반영됩니다.

## 기능 테스트

서버 실행 후 브라우저에서 `http://localhost:8000`을 열거나, 다음 명령어로 API를 테스트할 수 있습니다:

```bash
# 할일 목록 조회
curl http://localhost:8000/api/todos

# 할일 추가
curl -X POST http://localhost:8000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"새로운 할일","completed":false}'

# 할일 완료 처리
curl -X PUT http://localhost:8000/api/todos/{todo_id} \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# 할일 삭제
curl -X DELETE http://localhost:8000/api/todos/{todo_id}
```

## 라이선스

MIT

