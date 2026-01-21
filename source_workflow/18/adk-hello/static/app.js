// DOM 요소 가져오기
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');
const status = document.getElementById('status');

// 상태 관리
let isLoading = false;

// 메시지 추가 함수
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // 스크롤을 맨 아래로
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 상태 메시지 표시
function setStatus(message, type = '') {
    status.textContent = message;
    status.className = `status ${type}`;
    
    if (type === 'loading') {
        status.textContent = '⏳ ' + message;
    } else if (type === 'error') {
        status.textContent = '❌ ' + message;
    } else if (type === 'success') {
        status.textContent = '✅ ' + message;
    }
}

// 메시지 전송 함수
async function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message || isLoading) {
        return;
    }
    
    // 사용자 메시지 표시
    addMessage(message, true);
    messageInput.value = '';
    
    // 로딩 상태
    isLoading = true;
    sendButton.disabled = true;
    setStatus('메시지를 전송하는 중...', 'loading');
    
    try {
        // API 호출
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                user_id: 'default_user',
                session_id: 'default_session'
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || '서버 오류가 발생했습니다.');
        }
        
        // 봇 응답 표시
        addMessage(data.response, false);
        setStatus('메시지 전송 완료', 'success');
        
        // 성공 메시지 자동 제거
        setTimeout(() => {
            if (status.className.includes('success')) {
                setStatus('');
            }
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        addMessage('죄송합니다. 오류가 발생했습니다: ' + error.message, false);
        setStatus('오류: ' + error.message, 'error');
    } finally {
        isLoading = false;
        sendButton.disabled = false;
        messageInput.focus();
    }
}

// 이벤트 리스너
sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// 페이지 로드 시 입력창에 포커스
window.addEventListener('load', () => {
    messageInput.focus();
    
    // 헬스 체크
    fetch('/api/health')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                setStatus('서버 연결됨', 'success');
                setTimeout(() => setStatus(''), 2000);
            }
        })
        .catch(error => {
            console.error('Health check failed:', error);
            setStatus('서버 연결 실패', 'error');
        });
});

