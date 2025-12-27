import React from 'react'
import { CheckCircle2 } from 'lucide-react'

const Header = ({ totalTodos, completedTodos }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-8 mb-8 animate-slideIn">
      <div className="flex items-center gap-3 mb-3">
        <CheckCircle2 size={32} />
        <h1 className="text-4xl font-bold">My Tasks</h1>
      </div>
      <p className="text-blue-100 text-lg">
        {totalTodos === 0
          ? 'No tasks yet. Create one to get started!'
          : `You have ${totalTodos} task${totalTodos !== 1 ? 's' : ''} • ${completedTodos} completed`}
      </p>
    </div>
  )
}

export default Header
