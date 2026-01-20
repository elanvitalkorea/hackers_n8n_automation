const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


const jwt = require('jsonwebtoken');
const SECRET_KEY = 'YOUR_SUPER_SECRET_KEY';

// 미들웨어 설정
app.use(express.json());
// CORS 허용 (웹서버에서 호출 실패 방지)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 데이터 파일 관리
const DATA_FILE = path.join(__dirname, 'todos.json');

function readTodos() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function writeTodos(todos) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// CREATE: 새로운 할 일 생성
app.post('/api/todos', authenticateToken, async (req, res) => {
    const { title } = req.body;
    const userId = req.user.id; // 미들웨어에서 넣어준 사용자 ID

    // Supabase에 데이터 삽입 요청
    const { data, error } = await supabase
        .from('todos')
        .insert([{ title: title, user_id: userId }])
        .select() // 삽입된 데이터를 바로 반환받음
        .single(); // 배열이 아닌 단일 객체로 받기 위함

    // 1. 에러 핸들링: Supabase가 error 객체를 반환했는지 확인
    if (error) {
        console.error('Supabase insert error:', error.message);
        // Supabase가 제공하는 에러 메시지를 클라이언트에 전달
        return res.status(400).json({ error: error.message });
    }

    // 2. 성공 시 처리: 에러가 없다면 data를 클라이언트에 반환
    res.status(201).json(data);
});

// 기존 app.get('/api/todos', ...) 수정
app.get('/api/todos', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false }); // 최신순으로 정렬

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
});

// 특정 할 일 조회
// READ: 특정 할 일 조회
app.get('/api/todos/:id', authenticateToken, async (req, res) => {
    const todoId = req.params.id;
    const userId = req.user.id;

    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('id', todoId)
        .eq('user_id', userId)
        .single();

    if (error) {
        return res.status(400).json({ error: error.message });
    }
    if (!data) {
        return res.status(404).json({ error: 'Todo not found or you do not have permission to view it.' });
    }

    res.json(data);
});

app.put('/api/todos/:id', authenticateToken, (req, res) => {
    try {
        const todos = readTodos();
        const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
        
        if (todoIndex === -1) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        // 기존 todo 정보 가져오기
        const existingTodo = todos[todoIndex];
        
        // 업데이트할 todo 객체 생성
        const updatedTodo = {
            ...existingTodo,
            title: req.body.title || existingTodo.title,
            completed: req.body.completed !== undefined ? req.body.completed : existingTodo.completed,
            updatedAt: new Date().toISOString()
        };
        
        // 배열에 업데이트된 todo 저장
        todos[todoIndex] = updatedTodo;
        
        writeTodos(todos);
        res.json(todos[todoIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

app.delete('/api/todos/:id', authenticateToken, (req, res) => {
    try {
        const todos = readTodos();
        const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
        
        if (todoIndex === -1) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        const deletedTodo = todos.splice(todoIndex, 1)[0];
        writeTodos(todos);
        
        res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});


// 회원가입
app.post('/api/auth/signup', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ user: data.user });
});

// 로그인
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) return res.status(400).json({ error: error.message });
    res.json({ accessToken: data.session.access_token });
});

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: '인증 토큰이 없습니다.' });
    }

    // Supabase에 토큰 검증 요청
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        return res.status(403).json({ error: '유효하지 않은 토큰입니다.' });
    }

    req.user = user; // 요청 객체에 user 정보 저장 (id, email 등 포함)
    next();
}