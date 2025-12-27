import express from 'express';
import Todo from '../models/Todo.js';
import List from '../models/List.js';
import Tag from '../models/Tag.js';

const router = express.Router();

// --- Sidebar/meta endpoint ---
// Returns summary data for the sidebar: lists with counts, tags with counts, totals
router.get('/meta', async (req, res) => {
    try {
        // Total counts
        const total = await Todo.countDocuments();
        const completed = await Todo.countDocuments({ completed: true });

        // Lists aggregation: counts per list from todos
        const listsAgg = await Todo.aggregate([
            { $group: { _id: { $ifNull: ["$list", "Inbox"] }, count: { $sum: 1 } } },
            { $project: { _id: 0, list: '$_id', count: 1 } }
        ]);

        // Tags aggregation: counts from todos
        const tagsAgg = await Todo.aggregate([
            { $unwind: { path: '$tags', preserveNullAndEmptyArrays: false } },
            { $group: { _id: '$tags', count: { $sum: 1 } } },
            { $project: { _id: 0, tag: '$_id', count: 1 } }
        ]);

        // Fetch defined lists and tags from their own collections to include empty ones
        const definedLists = await List.find().sort({ name: 1 }).lean();
        const definedTags = await Tag.find().sort({ name: 1 }).lean();

        // Merge counts: for each defined list, find matching count in listsAgg
        const listsMap = new Map(listsAgg.map(l => [l.list, l.count]));
        const mergedLists = definedLists.map(l => ({ list: l.name, count: listsMap.get(l.name) || 0, color: l.color || '' }));

        // Also include lists that exist in todos but are not in definedLists
        const extraLists = listsAgg
            .filter(l => !definedLists.some(d => d.name === l.list))
            .map(l => ({ list: l.list, count: l.count, color: '' }));

        const finalLists = [...mergedLists, ...extraLists];

        // Merge tags: definedTags with counts
        const tagsMap = new Map(tagsAgg.map(t => [t.tag, t.count]));
        const mergedTags = definedTags.map(t => ({ tag: t.name, count: tagsMap.get(t.name) || 0 }));

        // Include tags present in todos but not defined in Tag collection
        const extraTags = tagsAgg.filter(t => !definedTags.some(dt => dt.name === t.tag)).map(t => ({ tag: t.tag, count: t.count }));

        const finalTags = [...mergedTags, ...extraTags];

        res.json({ total, completed, lists: finalLists, tags: finalTags });
    } catch (err) {
        console.error('GET /api/todos/meta error:', err);
        res.status(500).json({ message: 'Server error fetching meta' });
    }
});


// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch (err) {
        console.error('GET /api/todos error:', err);
        res.status(500).json({ message: 'Server error fetching todos' });
    }
});

// Create todo
router.post('/', async (req, res) => {
    try {
        const { title, description, list, tags } = req.body;

        // Validate input
        if (!title || title.trim() === '') {
            return res.status(400).json({ message: 'Title is required' });
        }

        const todo = await Todo.create({
            title: title.trim(),
            description: description ? description.trim() : '',
            list: list ? list.trim() : undefined,
            tags: Array.isArray(tags) ? tags.map(t => String(t).trim()) : [],
            completed: false
        });

        res.status(201).json(todo);
    } catch (err) {
        console.error('POST /api/todos error:', err);
        res.status(500).json({ message: 'Server error creating todo' });
    }
});

// Update todo
router.put('/:id', async (req, res) => {
    try {
        const { title, description, completed, list, tags } = req.body;

        const updateData = {};
        if (title !== undefined) updateData.title = title.trim();
        if (description !== undefined) updateData.description = description.trim();
        if (completed !== undefined) updateData.completed = completed;
        if (list !== undefined) updateData.list = list ? list.trim() : 'Inbox';
        if (tags !== undefined) updateData.tags = Array.isArray(tags) ? tags.map(t => String(t).trim()) : [];

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(updatedTodo);
    } catch (err) {
        console.error(`PUT /api/todos/${req.params.id} error:`, err);
        res.status(500).json({ message: 'Server error updating todo' });
    }
});

// Delete todo
router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({
            message: 'Todo deleted successfully',
            deletedTodo
        });
    } catch (err) {
        console.error(`DELETE /api/todos/${req.params.id} error:`, err);
        res.status(500).json({ message: 'Server error deleting todo' });
    }
});

export default router;