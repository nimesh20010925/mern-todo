import React, { useEffect, useState } from 'react'
import { Menu, Settings, LogOut, Search, Plus } from 'lucide-react'
import axios from 'axios'

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [meta, setMeta] = useState({ total: 0, completed: 0, lists: [], tags: [] })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let mounted = true
        const fetchMeta = async () => {
            try {
                setLoading(true)
                const res = await axios.get('/api/todos/meta')
                if (!mounted) return
                setMeta(res.data)
                setError(null)
            } catch (err) {
                console.error('Failed to fetch sidebar meta', err)
                if (!mounted) return
                setError('Failed to load')
            } finally {
                if (mounted) setLoading(false)
            }
        }

        fetchMeta()
        return () => { mounted = false }
    }, [])

    const lists = meta.lists || []
    const tags = meta.tags || []

    return (
        <div className={`${isOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 h-screen overflow-y-auto transition-all duration-300 fixed left-0 top-0 flex flex-col shadow-lg`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-600 hover:text-gray-900 transition"
                >
                    <Menu size={24} />
                </button>
                {isOpen && <h2 className="text-xl font-bold text-gray-800">Menu</h2>}
            </div>

            {/* Search */}
            {isOpen && (
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                        <Search size={18} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400"
                        />
                    </div>
                </div>
            )}

            {/* Tasks Section */}
            <div className="flex-1 p-4 space-y-2">
                {isOpen && <h3 className="text-xs font-bold text-gray-600 uppercase mb-3">Tasks</h3>}
                <div className="space-y-2">
                    <a href="#upcoming" className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700 cursor-pointer">
                        <span className="text-lg">≫</span>
                        {isOpen && <span className="flex-1">Upcoming</span>}
                        {isOpen && <span className="text-xs bg-gray-200 px-2 py-1 rounded">12</span>}
                    </a>
                    <a href="#today" className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700 cursor-pointer">
                        <span className="text-lg">≡</span>
                        {isOpen && <span className="flex-1">Today</span>}
                        {isOpen && <span className="text-xs bg-gray-200 px-2 py-1 rounded">5</span>}
                    </a>
                    <a href="#calendar" className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700 cursor-pointer">
                        <span className="text-lg">📅</span>
                        {isOpen && <span className="flex-1">Calendar</span>}
                    </a>
                    <a href="#sticky-wall" className="flex items-center justify-between gap-3 p-3 rounded-lg bg-gray-100 transition text-gray-700 cursor-pointer">
                        <span className="text-lg">📌</span>
                        {isOpen && <span className="flex-1 font-semibold">Sticky Wall</span>}
                        {isOpen && <span className="text-xs bg-gray-200 px-2 py-1 rounded">{meta.total}</span>}
                    </a>
                </div>
            </div>
            {/* Lists Section */}
            {isOpen && (
                <div className="p-4 border-t border-gray-200 space-y-2">
                    <h3 className="text-xs font-bold text-gray-600 uppercase mb-3">Lists</h3>
                    <div className="space-y-2">
                        {loading ? (
                            <div className="text-sm text-gray-400">Loading...</div>
                        ) : error ? (
                            <div className="text-sm text-red-500">{error}</div>
                        ) : (
                            lists.map((l) => (
                                <a key={l.list} href={`#${l.list}`} className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700 cursor-pointer">
                                    <span className="w-3 h-3 bg-gray-300 rounded-full" />
                                    <span className="flex-1">{l.list}</span>
                                    <span className="text-xs text-gray-500">{l.count}</span>
                                </a>
                            ))
                        )}
                    </div>
                    <button onClick={async () => {
                        const name = window.prompt('New list name')
                        if (!name) return
                        try {
                            await axios.post('/api/lists', { name })
                            // refresh meta
                            const res = await axios.get('/api/todos/meta')
                            setMeta(res.data)
                        } catch (err) {
                            console.error(err)
                            alert(err?.response?.data?.message || 'Failed to create list')
                        }
                    }} className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700 mt-2">
                        <Plus size={18} />
                        <span>Add New List</span>
                    </button>
                </div>
            )}

            {/* Tags Section */}
            {isOpen && (
                <div className="p-4 border-t border-gray-200">
                    <h3 className="text-xs font-bold text-gray-600 uppercase mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {loading ? (
                            <div className="text-sm text-gray-400">Loading...</div>
                        ) : error ? (
                            <div className="text-sm text-red-500">{error}</div>
                        ) : (
                            tags.map((t) => (
                                <button key={t.tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200">
                                    {t.tag} <span className="text-xs text-gray-500 ml-2">{t.count}</span>
                                </button>
                            ))
                        )}
                        <button onClick={async () => {
                            const name = window.prompt('New tag name')
                            if (!name) return
                            try {
                                await axios.post('/api/tags', { name })
                                // refresh meta
                                const res = await axios.get('/api/todos/meta')
                                setMeta(res.data)
                            } catch (err) {
                                console.error(err)
                                alert(err?.response?.data?.message || 'Failed to create tag')
                            }
                        }} className="text-gray-600 text-sm hover:text-gray-900">+ Add Tag</button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 space-y-2 mt-auto">
                {isOpen && (
                    <>
                        <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700">
                            <Settings size={20} />
                            <span>Settings</span>
                        </button>
                        <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700">
                            <LogOut size={20} />
                            <span>Sign out</span>
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Sidebar
