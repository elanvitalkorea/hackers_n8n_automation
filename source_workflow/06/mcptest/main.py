from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI(title="Todo App")

# Todo 데이터 모델
class TodoCreate(BaseModel):
    title: str
    completed: bool = False

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None

class Todo(BaseModel):
    id: str
    title: str
    completed: bool

# 메모리에 저장 (간단한 구현)
todos: List[Todo] = []

@app.get("/")
async def read_root():
    with open("static/index.html", "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())

@app.get("/api/todos", response_model=List[Todo])
async def get_todos():
    """모든 할일 목록 조회"""
    return todos

@app.post("/api/todos", response_model=Todo)
async def create_todo(todo: TodoCreate):
    """새 할일 생성"""
    new_todo = Todo(
        id=str(uuid.uuid4()),
        title=todo.title,
        completed=todo.completed
    )
    todos.append(new_todo)
    return new_todo

@app.put("/api/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: str, todo_update: TodoUpdate):
    """할일 수정"""
    for todo in todos:
        if todo.id == todo_id:
            if todo_update.title is not None:
                todo.title = todo_update.title
            if todo_update.completed is not None:
                todo.completed = todo_update.completed
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.delete("/api/todos/{todo_id}")
async def delete_todo(todo_id: str):
    """할일 삭제"""
    for i, todo in enumerate(todos):
        if todo.id == todo_id:
            todos.pop(i)
            return {"message": "Todo deleted"}
    raise HTTPException(status_code=404, detail="Todo not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

