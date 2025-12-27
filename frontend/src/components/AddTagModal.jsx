import React, { useState } from 'react'

const AddTagModal = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState('')
    const [color, setColor] = useState('#60A5FA')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (name.trim()) {
            onAdd({ name, color })
            setName('')
            setColor('#60A5FA')
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-96 max-w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Tag</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tag Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Urgent, Shopping..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-12 h-10 p-0 border-0 bg-transparent"
                                aria-label="Choose tag color"
                            />
                            <div className="text-sm text-gray-600">Selected: <span style={{ color }}>{color}</span></div>
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            Create Tag
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTagModal
