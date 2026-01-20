'use client'

import { Todo } from '@/lib/storage'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl glass mb-3 group hover:bg-white/30 transition-all">
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all ${
          todo.completed
            ? 'bg-white/30 border-white/50'
            : 'border-white/50 hover:border-white/70'
        }`}
      >
        {todo.completed && (
          <svg
            className="w-full h-full text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>
      
      <span
        className={`flex-1 text-white ${
          todo.completed
            ? 'line-through opacity-60'
            : ''
        }`}
      >
        {todo.text}
      </span>
      
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 w-8 h-8 rounded-full glass hover:bg-red-500/30 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center"
      >
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}

