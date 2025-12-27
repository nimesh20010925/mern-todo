import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        default: '',
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    // Optional list (e.g., "Personal", "Work", "Sticky Wall")
    list: {
        type: String,
        trim: true,
        default: 'Inbox'
    },
    // Optional tags for grouping/filtering
    tags: {
        type: [String],
        default: []
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model('Todo', todoSchema);