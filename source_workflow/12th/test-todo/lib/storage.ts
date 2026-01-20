export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

const STORAGE_KEY = 'todos'

export const getTodos = (): Todo[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to load todos from localStorage:', error)
    return []
  }
}

export const saveTodos = (todos: Todo[]): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch (error) {
    console.error('Failed to save todos to localStorage:', error)
  }
}

export const addTodo = (text: string): Todo => {
  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    completed: false,
    createdAt: Date.now(),
  }
  
  const todos = getTodos()
  todos.push(newTodo)
  saveTodos(todos)
  
  return newTodo
}

export const toggleTodo = (id: string): void => {
  const todos = getTodos()
  const todo = todos.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    saveTodos(todos)
  }
}

export const deleteTodo = (id: string): void => {
  const todos = getTodos()
  const filtered = todos.filter(t => t.id !== id)
  saveTodos(filtered)
}

