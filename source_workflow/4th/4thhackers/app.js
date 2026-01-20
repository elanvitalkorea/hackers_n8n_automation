const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

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

app.post('/api/todos', (req, res) => {
    try {
        const todos = readTodos();
        const newTodo = {
            id: Date.now(),
            title: req.body.title,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        todos.push(newTodo);
        writeTodos(todos);
        
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

app.get('/api/todos', (req, res) => {
    try {
        const todos = readTodos();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

// 특정 할 일 조회
app.get('/api/todos/:id', (req, res) => {
    try {
        const todos = readTodos();
        const todo = todos.find(t => t.id === parseInt(req.params.id));
        
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todo' });
    }
});

app.put('/api/todos/:id', (req, res) => {
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

app.delete('/api/todos/:id', (req, res) => {
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