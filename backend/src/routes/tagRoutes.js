import express from 'express'
import Tag from '../models/Tag.js'

const router = express.Router()

// Get all tags
router.get('/', async (req, res) => {
    try {
        const tags = await Tag.find().sort({ name: 1 })
        res.json(tags)
    } catch (err) {
        console.error('GET /api/tags error:', err)
        res.status(500).json({ message: 'Server error fetching tags' })
    }
})

// Create a new tag
router.post('/', async (req, res) => {
    try {
        const { name } = req.body
        if (!name || !name.trim()) return res.status(400).json({ message: 'Name required' })

        const existing = await Tag.findOne({ name: name.trim() })
        if (existing) return res.status(409).json({ message: 'Tag already exists' })

        const tag = await Tag.create({ name: name.trim() })
        res.status(201).json(tag)
    } catch (err) {
        console.error('POST /api/tags error:', err)
        res.status(500).json({ message: 'Server error creating tag' })
    }
})

export default router
