# Google ADK Hello World 예제

Google ADK (Agent Development Kit) Python을 사용한 간단한 Hello World 웹 애플리케이션입니다.

## 기능

- Google ADK를 사용한 AI 에이전트
- Flask 기반 웹 서버
- 간단한 채팅 인터페이스
- 세션 관리

## 빠른 시작

### uv 사용 (가장 빠름)
```bash
# 1. uv 설치 (한 번만)
curl -LsSf https://astral.sh/uv/install.sh | sh

# 2. 프로젝트 설정
cp .env.example .env
# .env 파일에 GOOGLE_API_KEY 설정

# 3. 설치 및 실행
uv sync
uv run python app.py
# 또는 ADK 웹 UI 사용: uv run adk web .
```

### pip 사용
```bash
# 1. 가상 환경 생성
python -m venv venv
source venv/bin/activate

# 2. 설치
pip install -r requirements.txt
cp .env.example .env
# .env 파일에 GOOGLE_API_KEY 설정

# 3. 실행
python app.py
# 또는 ADK 웹 UI 사용: adk web .
```

## 사전 요구사항

- Python 3.9 이상
- Google AI Studio API 키 ([발급 링크](https://aistudio.google.com/app/apikey))
- (선택) uv 패키지 관리자 ([설치 링크](https://github.com/astral-sh/uv))

## 설치 방법

### 방법 1: uv 사용 (권장)

uv는 빠른 Python 패키지 관리자입니다. uv를 사용하면 더 빠르게 설치할 수 있습니다.

1. 저장소 클론 또는 다운로드

2. uv 설치 (아직 설치하지 않은 경우):
```bash
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

3. uv로 프로젝트 동기화 및 의존성 설치:
```bash
uv sync
```

이 명령어는 가상 환경을 자동으로 생성하고 모든 의존성을 설치합니다.

4. 환경 변수 설정:
```bash
cp .env.example .env
```

`.env` 파일을 열어 `GOOGLE_API_KEY`에 본인의 API 키를 입력하세요.

5. 실행:
```bash
# 가상 환경 활성화 (uv sync 후 자동으로 활성화됨)
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# 또는 uv run을 사용하여 직접 실행
uv run python app.py
```

### 방법 2: 전통적인 방법 (pip 사용)

1. 저장소 클론 또는 다운로드

2. 가상 환경 생성 및 활성화:
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

3. 의존성 설치:
```bash
pip install -r requirements.txt
```

4. 환경 변수 설정:
```bash
cp .env.example .env
```

`.env` 파일을 열어 `GOOGLE_API_KEY`에 본인의 API 키를 입력하세요.

## 실행 방법

### 방법 1: Flask 웹 서버 실행 (커스텀 UI)

```bash
python app.py
```

또는 uv를 사용하는 경우:
```bash
uv run python app.py
```

서버가 시작되면 브라우저에서 `http://localhost:5000`으로 접속하세요.

### 방법 2: ADK 웹 UI 사용 (개발 및 테스트용)

ADK는 내장된 웹 UI를 제공합니다. 이 방법은 에이전트를 빠르게 테스트하고 디버깅하는 데 유용합니다.

```bash
# 에이전트 디렉토리를 명시적으로 지정
adk web hello_world_agent
```

또는 uv를 사용하는 경우:
```bash
uv run adk web hello_world_agent
```

**중요:** `adk web .`을 사용하면 `static/` 폴더가 에이전트로 잘못 인식될 수 있으므로, 에이전트 디렉토리를 명시적으로 지정하는 것이 좋습니다.

기본적으로 `http://localhost:8000`에서 웹 UI가 시작됩니다. 브라우저에서 접속하면:
- 에이전트와 대화할 수 있는 채팅 인터페이스
- 함수 호출 및 응답 검사
- 모델 응답 확인
- 세션 관리

**포트 변경:**
```bash
adk web hello_world_agent --port 8080
```

**터미널에서 직접 실행 (웹 UI 없이):**
```bash
adk run hello_world_agent
```

이 방법은 대화형 터미널 인터페이스를 제공합니다.

## 프로젝트 구조

```
adk-hello/
├── hello_world_agent/    # ADK 에이전트 디렉토리
│   ├── __init__.py       # 패키지 초기화 파일
│   └── agent.py          # ADK 에이전트 정의 (root_agent 포함)
├── app.py                # Flask 웹 서버
├── requirements.txt       # Python 의존성 (pip용)
├── pyproject.toml         # 프로젝트 설정 (uv용)
├── .env.example          # 환경 변수 템플릿
├── README.md             # 프로젝트 설명서
└── static/
    ├── index.html        # 웹 프론트엔드
    ├── style.css         # 스타일시트
    └── app.js            # 클라이언트 JavaScript
```

## 사용 방법

1. 웹 브라우저에서 `http://localhost:5001` 접속 (또는 설정한 포트)
2. 채팅 입력창에 메시지 입력
3. "전송" 버튼 클릭 또는 Enter 키 입력
4. 에이전트의 응답 확인

## API 엔드포인트

### POST /api/chat
에이전트와 대화하는 엔드포인트

**요청 본문:**
```json
{
  "message": "안녕하세요!",
  "user_id": "default_user",
  "session_id": "default_session"
}
```

**응답:**
```json
{
  "response": "안녕하세요! 무엇을 도와드릴까요?",
  "user_id": "default_user",
  "session_id": "default_session"
}
```

### GET /api/health
서버 상태 확인 엔드포인트

**응답:**
```json
{
  "status": "ok",
  "message": "ADK Hello World 서버가 정상 작동 중입니다."
}
```

## 문제 해결

### API 키 오류
- `.env` 파일에 올바른 `GOOGLE_API_KEY`가 설정되어 있는지 확인하세요.
- API 키가 유효한지 [Google AI Studio](https://aistudio.google.com/app/apikey)에서 확인하세요.
- `adk web`을 사용할 때는 `.env` 파일이 프로젝트 루트에 있어야 합니다.

### 포트 충돌
- Flask 서버의 기본 포트는 5001입니다. 포트 5000이 사용 중이면 자동으로 5001을 사용합니다.
- 다른 포트를 사용하려면 환경 변수 `PORT`를 설정하세요: `PORT=8080 uv run python app.py`
- `adk web`의 기본 포트는 8000입니다. `--port` 옵션으로 변경할 수 있습니다.
- macOS에서 포트 5000이 사용 중인 경우, System Preferences -> General -> AirDrop & Handoff에서 'AirPlay Receiver' 서비스를 비활성화할 수 있습니다.

### uv 관련 문제
- uv가 설치되지 않은 경우, 방법 2(전통적인 방법)를 사용하세요.
- `uv sync` 실행 시 권한 오류가 발생하면 `uv sync --no-cache`를 시도하세요.

### adk 명령어를 찾을 수 없음
- `google-adk` 패키지가 설치되어 있는지 확인하세요: `pip list | grep google-adk`
- 설치되어 있지 않다면: `pip install google-adk` 또는 `uv pip install google-adk`

## 참고 자료

- [Google ADK 문서](https://github.com/google/adk-docs)
- [Google ADK Python](https://github.com/google/adk-python)
- [Google AI Studio](https://aistudio.google.com/)

## 라이선스

이 예제는 교육 목적으로 제공됩니다.

