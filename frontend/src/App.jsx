import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './components/Sidebar'
import StickyWall from './components/StickyWall'
import AddNoteModal from './components/AddNoteModal'
import { Plus } from 'lucide-react'

function App() {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)

    const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/todos`

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        try {
            setLoading(true)
            const response = await axios.get(API_BASE_URL)
            setTodos(response.data)
            setError(null)
        } catch (err) {
            setError('Failed to fetch todos')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleAddTodo = async (data) => {
        try {
            const response = await axios.post(API_BASE_URL, {
                title: data.title,
                description: data.description,
                completed: false,
            })
            setTodos([...todos, response.data])
            setError(null)
        } catch (err) {
            setError('Failed to add note')
            console.error(err)
        }
    }

    const handleToggleTodo = async (id) => {
        try {
            const todo = todos.find((t) => t._id === id)
            const response = await axios.put(`${API_BASE_URL}/${id}`, {
                completed: !todo.completed,
            })
            setTodos(todos.map((t) => (t._id === id ? response.data : t)))
            setError(null)
        } catch (err) {
            setError('Failed to update note')
            console.error(err)
        }
    }

    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`)
            setTodos(todos.filter((t) => t._id !== id))
            setError(null)
        } catch (err) {
            setError('Failed to delete note')
            console.error(err)
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <div className="p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Sticky Wall</h1>
                        <p className="text-gray-600">Organize your thoughts and tasks at a glance</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {/* Loading State */}
                    {loading ? (
                        <div className="text-center py-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="text-gray-500 mt-4">Loading notes...</p>
                        </div>
                    ) : (
                        <>
                            {/* Sticky Wall */}
                            <StickyWall
                                todos={todos}
                                onToggle={handleToggleTodo}
                                onDelete={handleDeleteTodo}
                            />

                            {/* Add Note Button */}
                            <button
                                onClick={() => setModalOpen(true)}
                                className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:shadow-xl"
                            >
                                <Plus size={32} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Modal */}
            <AddNoteModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={handleAddTodo}
            />
        </div>
    )
}

export default App
