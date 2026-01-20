'use client'

import { useState, useEffect } from 'react'
import { Todo, getTodos, addTodo, toggleTodo, deleteTodo } from '@/lib/storage'
import TodoForm from '@/components/TodoForm'
import TodoItem from '@/components/TodoItem'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    setTodos(getTodos())
  }, [])

  const handleAdd = (text: string) => {
    addTodo(text)
    setTodos(getTodos())
  }

  const handleToggle = (id: string) => {
    toggleTodo(id)
    setTodos(getTodos())
  }

  const handleDelete = (id: string) => {
    deleteTodo(id)
    setTodos(getTodos())
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass rounded-3xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            할일 목록 관리
          </h1>
          
          <TodoForm onAdd={handleAdd} />
          
          <div className="max-h-[60vh] overflow-y-auto">
            {todos.length === 0 ? (
              <div className="text-center py-8 text-white/70">
                <p>할 일이 없습니다.</p>
                <p className="text-sm mt-2">새로운 할 일을 추가해보세요!</p>
              </div>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
          
          {todos.length > 0 && (
            <div className="mt-6 text-center text-white/60 text-sm">
              총 {todos.length}개의 할 일
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

