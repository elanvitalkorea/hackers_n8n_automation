"""Flask 웹 서버 for Google ADK Hello World"""
import os
import asyncio
from flask import Flask, render_template, request, jsonify, Response
from flask_cors import CORS
from dotenv import load_dotenv
from google.adk import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types
import json

from hello_world_agent.agent import root_agent as hello_agent

# 환경 변수 로드
load_dotenv()

app = Flask(__name__, static_folder='static', static_url_path='')
CORS(app)

# 기본 사용자 및 세션 ID (간단한 예제용)
DEFAULT_USER_ID = "default_user"
DEFAULT_SESSION_ID = "default_session"
APP_NAME = "hello_world_app"

# 세션 서비스 초기화
session_service = InMemorySessionService()
# Runner 생성 시 app_name과 agent를 모두 제공
runner = Runner(
    app_name=APP_NAME,
    agent=hello_agent,
    session_service=session_service
)


@app.route('/')
def index():
    """메인 페이지"""
    return app.send_static_file('index.html')


@app.route('/api/chat', methods=['POST'])
def chat():
    """에이전트와 채팅하는 API 엔드포인트"""
    try:
        data = request.get_json()
        message = data.get('message', '')
        user_id = data.get('user_id', DEFAULT_USER_ID)
        session_id = data.get('session_id', DEFAULT_SESSION_ID)
        
        if not message:
            return jsonify({'error': '메시지가 필요합니다.'}), 400
        
        # 비동기 함수 실행
        async def generate_response():
            # 세션이 없으면 생성 (session_id는 자동 생성되도록 함)
            session = None
            try:
                session = await session_service.get_session(
                    app_name=APP_NAME,
                    user_id=user_id,
                    session_id=session_id
                )
            except Exception:
                # 세션이 없으면 새로 생성 (session_id는 자동 생성)
                pass
            
            if session is None:
                session = await session_service.create_session(
                    app_name=APP_NAME,
                    user_id=user_id
                )
            
            # 세션이 제대로 생성되었는지 확인
            if session is None or not hasattr(session, 'id'):
                raise ValueError("세션 생성에 실패했습니다.")
            
            # 사용자 메시지 생성
            content = types.Content(
                role='user',
                parts=[types.Part(text=message)]
            )
            
            # 에이전트 실행 및 응답 수집
            full_response = ""
            async for event in runner.run_async(
                user_id=user_id,
                session_id=session.id,
                new_message=content
            ):
                if event.content and event.content.parts:
                    for part in event.content.parts:
                        if part.text:
                            full_response += part.text
            
            return full_response, session.id
        
        # 이벤트 루프 실행
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            response_text, actual_session_id = loop.run_until_complete(generate_response())
        finally:
            loop.close()
        
        return jsonify({
            'response': response_text,
            'user_id': user_id,
            'session_id': actual_session_id
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/health', methods=['GET'])
def health():
    """헬스 체크 엔드포인트"""
    return jsonify({'status': 'ok', 'message': 'ADK Hello World 서버가 정상 작동 중입니다.'})


if __name__ == '__main__':
    # Google API 키 확인
    api_key = os.getenv('GOOGLE_API_KEY')
    if not api_key:
        print("경고: GOOGLE_API_KEY 환경 변수가 설정되지 않았습니다.")
        print(".env 파일을 생성하고 GOOGLE_API_KEY를 설정해주세요.")
    
    # 포트가 사용 중이면 다른 포트 사용
    port = int(os.getenv('PORT', 5001))
    app.run(debug=True, host='0.0.0.0', port=port)

