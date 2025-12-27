import React from 'react'
import { Trash2, CheckCircle2, Circle } from 'lucide-react'

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 animate-slideIn border-l-4 border-blue-500 hover:border-purple-500">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggle(todo._id)}
          className="text-blue-500 hover:text-blue-700 transition-colors flex-shrink-0"
        >
          {todo.completed ? (
            <CheckCircle2 size={24} className="text-green-500" />
          ) : (
            <Circle size={24} />
          )}
        </button>
        
        <div className="flex-1">
          <p
            className={`text-lg font-medium ${
              todo.completed
                ? 'line-through text-gray-400'
                : 'text-gray-800'
            }`}
          >
            {todo.title}
          </p>
          {todo.description && (
            <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
          )}
        </div>

        <button
          onClick={() => onDelete(todo._id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 flex-shrink-0"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  )
}

export default TodoItem
