import React from 'react'
import StickyNote from './StickyNote'

const StickyWall = ({ todos, onToggle, onDelete }) => {
    const colors = ['yellow', 'blue', 'pink', 'orange', 'green', 'purple']

    if (todos.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="text-center">
                    <div className="text-6xl mb-4">📌</div>
                    <h3 className="text-2xl font-bold text-gray-400 mb-2">No sticky notes yet</h3>
                    <p className="text-gray-400">Create a new task to pin it on the wall!</p>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {todos.map((todo, idx) => (
                <StickyNote
                    key={todo._id}
                    todo={todo}
                    color={colors[idx % colors.length]}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default StickyWall
