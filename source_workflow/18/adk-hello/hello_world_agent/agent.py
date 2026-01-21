"""Google ADK Hello World Agent"""
from google.adk import Agent

# 간단한 Hello World 에이전트 정의
# adk web 명령어가 root_agent 변수를 찾으므로 이 이름을 사용해야 합니다
root_agent = Agent(
    name="hello_world_agent",
    model="gemini-2.5-flash",
    instruction="You are a friendly and helpful assistant. Greet users warmly and answer their questions in a clear and concise manner.",
    description="A simple Hello World agent that demonstrates basic ADK functionality.",
    tools=[]  # 기본 예제이므로 도구는 사용하지 않음
)

# Flask 앱에서도 사용할 수 있도록 별칭 제공
hello_agent = root_agent

