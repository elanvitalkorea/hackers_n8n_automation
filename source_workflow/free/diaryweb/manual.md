
### 1) 화면/텍스트 수집 – OCR(OCR) 활용
- 모든 자료 검색의 출발점은 **텍스트화**
- **Mac**: Raycast – Screen OCR 확장 사용
- **Windows**: PowerToys – `Text Extractor` 사용
    - 단축키: `Win + Shift + T` 로 화면 텍스트 바로 추출
- 코드, 에러 메시지, 웹페이지 일부를 **그대로 LLM에 붙여 넣는 것**이 핵심
    
### 2) 인프라/설치 문제 해결 – Claude Code & 환경 선택
- **Claude Code**
    - Docker, 서버, 각종 인프라 설치 가이드를 받을 때 최우선 사용
- **환경 선택**
    - 가능하면 **Mac** 을 선택
    - Windows는 **WSL**(Windows Subsystem for Linux)을 사용하여 리눅스와 비슷한 환경에서 작업
        
### 3) 정보 정리/기록 – Markdown 중심 워크플로우
- **Markdown 생활화**
    - LLM이 가장 잘 이해하고 응답해 주는 포맷
    - 표, 리스트, 코드블록 등 구조화가 쉬움
- **ChatGPT / Gemini 결과 복사 버튼** 적극 활용
    - 좋은 답변은 바로 노트로 저장

![[Pasted image 20251207102325.png]]
- **Obsidian** 활용
    - 개인 지식베이스로 정리 (프로젝트별 폴더, 태그)
    - Web Scraper 플러그인 등으로 웹 문서도 함께 저장

### 4) 기본 프롬프팅 원칙
- **배경 설명을 최대한 구체적으로**
    - “지금 어떤 프로젝트에서, 무엇을 하려다, 어디서 막혔는지” 모두 적기
- 코드/로그는 **백틱 3개** 로 감싸서 전달
- 문단 구분이나 단계 구분에는
    - `>>>` 같은 **명확한 구분자**를 써서 컨텍스트를 나눠주기
- 한 번에 너무 많은 요구를 하지 말고
    - “상황 설명 → 원인 추정 → 해결 방법 → 코드 수정” 순으로 단계 나누기
        
### 5) LLM 멀티모달 적극 활용
- 말로 설명하기 힘든 에러/UI 문제는 **스크린샷 + 짧은 설명**을 함께 보내기
- 다이어그램, 설정 화면, 로그 캡처 등을 그대로 보여주면 텍스트로 풀어 쓰는 것보다 훨씬 빠르게 문제 맥락을 이해시킬 수 있음

### 6) 코드/문서 컨텍스트 확장 도구
#### repomix
- 레포지토리 전체를 한 번에 덤프해서 LLM에게 “이 프로젝트 전체 구조”를 이해시킬 때 사용
- xml 형식으로 나타남 
- 설치
	- `npm install -g repomix`
- 사용
	- `repomix`

#### gitingest
- git repo 를 하나의 파일로 덤프하는 용도
- `https://gitingest.com/` 
- test `https://github.com/joosung80/next-ts-hands-on`

#### sitefetch
- 긴 문서/웹페이지를 통째로 LLM 컨텍스트로 넣고 싶을 때
- chatgpt, Cursor 등에서 문서 전체를 한 번에 제공하는 용도로 활용

```bash
npx sitefetch https://react-hook-form.com/get-started -o react-hook-form.md
```
    

#### Cursor 문서 추가 기능
- Guide 문서를 reference로 쓰기
- Cursor Settings -> Indexing & Docs 에 추가함
- Chat 창에서 `@` 로 지정가능함  

#### Gemini Gem / ChatGPT Projects
- 프로젝트별로 지침과 문서를 지정하여 특정 TASK 수행
- 특히 필요 지식이 있는 경우 매번 첨부하지 않아도 되어 편리함
- `Gemini SCQA Framework`

### 7) Grok 활용
- Reddit, X(Twitter) 기반의 실시간 트렌드/사례 검색에 활용
- 일반 검색 엔진에서 잘 안 나오는 실전 경험담, 삽질 기록, 라이브러리 이슈를 찾을 때 유용
- `n8n mcp server 관련 변경 사항을 레딧과 X에서 찾아주세요`
- `supabase mcp 연결 방법 변경사항 레딧과 X에서 찾아주세요`
