import mongoose from 'mongoose'

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 100
    },
    color: {
        type: String,
        trim: true,
        default: ''
    }
}, { timestamps: true })

export default mongoose.model('List', listSchema)
