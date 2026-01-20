'use client'

import { useState, FormEvent } from 'react'

interface TodoFormProps {
  onAdd: (text: string) => void
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text.trim())
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요..."
          className="flex-1 px-4 py-3 rounded-2xl glass text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-2xl glass text-white font-semibold hover:bg-white/30 transition-all active:scale-95"
        >
          추가
        </button>
      </div>
    </form>
  )
}

