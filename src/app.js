import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import categoriesRouter from './routes/categoryRoutes.js';
const app=express();

app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/auth',authRouter);
app.use('/api/categories',categoriesRouter);

export default app;


