import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">✨</div>
        <h3 className="text-2xl font-bold text-gray-400 mb-2">No tasks yet</h3>
        <p className="text-gray-400">Add a new task to get started!</p>
      </div>
    )
  }

  const completedCount = todos.filter((t) => t.completed).length
  const progress = (completedCount / todos.length) * 100

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold text-gray-700">
            Progress: {completedCount}/{todos.length}
          </p>
          <p className="text-sm font-semibold text-blue-600">{Math.round(progress)}%</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default TodoList
