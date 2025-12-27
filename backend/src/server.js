import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';
import listRoutes from './routes/listRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

// 1. CORS middleware - SIMPLE
app.use(cors({
    origin: 'http://localhost:3000', // frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // if you use cookies/auth
}));

// 2. Body parser
app.use(express.json());

// 3. Routes
app.get('/api/health', (req, res) => {
    res.json({ message: 'Server is healthy' });
});

app.use('/api/todos', todoRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/tags', tagRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});