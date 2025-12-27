import React, { useState } from 'react'
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react'

const TodoInput = ({ onAdd }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onAdd(input)
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 animate-slideIn">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 rounded-lg bg-white border-2 border-transparent focus:border-blue-500 focus:outline-none shadow-md transition-all duration-200 placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus size={20} />
          Add
        </button>
      </div>
    </form>
  )
}

export default TodoInput
