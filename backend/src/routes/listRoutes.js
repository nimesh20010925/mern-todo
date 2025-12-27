import express from 'express'
import List from '../models/List.js'

const router = express.Router()

// Get all lists
router.get('/', async (req, res) => {
    try {
        const lists = await List.find().sort({ name: 1 })
        res.json(lists)
    } catch (err) {
        console.error('GET /api/lists error:', err)
        res.status(500).json({ message: 'Server error fetching lists' })
    }
})

// Create a new list
router.post('/', async (req, res) => {
    try {
        const { name, color } = req.body
        if (!name || !name.trim()) return res.status(400).json({ message: 'Name required' })

        const existing = await List.findOne({ name: name.trim() })
        if (existing) return res.status(409).json({ message: 'List already exists' })

        const list = await List.create({ name: name.trim(), color: color || '' })
        res.status(201).json(list)
    } catch (err) {
        console.error('POST /api/lists error:', err)
        res.status(500).json({ message: 'Server error creating list' })
    }
})

export default router
