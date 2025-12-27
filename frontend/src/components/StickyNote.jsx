import React from 'react'
import { Trash2, MoreVertical } from 'lucide-react'

const StickyNote = ({ todo, color, onToggle, onDelete }) => {
    const colors = {
        yellow: 'bg-yellow-200',
        blue: 'bg-blue-100',
        pink: 'bg-pink-200',
        orange: 'bg-orange-100',
        green: 'bg-green-100',
        purple: 'bg-purple-100',
    }

    const shadowColors = {
        yellow: 'shadow-lg hover:shadow-xl',
        blue: 'shadow-lg hover:shadow-xl',
        pink: 'shadow-lg hover:shadow-xl',
        orange: 'shadow-lg hover:shadow-xl',
        green: 'shadow-lg hover:shadow-xl',
        purple: 'shadow-lg hover:shadow-xl',
    }

    return (
        <div
            className={`${colors[color]} ${shadowColors[color]} rounded-lg p-6 min-h-60 max-w-sm relative group transition-all duration-200 transform hover:scale-105 cursor-default`}
            style={{
                boxShadow: `
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06),
          -2px -2px 5px rgba(0, 0, 0, 0.1)
        `,
            }}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800 flex-1 break-words pr-2">{todo.title}</h3>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onDelete(todo._id)}
                        className="text-red-600 hover:text-red-800 p-1"
                    >
                        <Trash2 size={16} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 p-1">
                        <MoreVertical size={16} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="text-gray-700 text-sm space-y-2 flex-1">
                {todo.description && (
                    <p className="whitespace-pre-wrap break-words">{todo.description}</p>
                )}
                {Array.isArray(todo.items) && todo.items.length > 0 && (
                    <ul className="list-disc list-inside space-y-1">
                        {todo.items.map((item, idx) => (
                            <li key={idx} className="text-gray-600">
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Checkbox */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo._id)}
                    className="w-4 h-4 accent-gray-600 cursor-pointer"
                />
                <span className="text-xs text-gray-600">
                    {todo.completed ? 'Completed' : 'In Progress'}
                </span>
            </div>
        </div>
    )
}

export default StickyNote
