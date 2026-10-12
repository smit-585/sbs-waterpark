import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import enquiryRoutes from './routes/enquiry.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
const rawOrigin = process.env.FRONTEND_URL || process.env.CORS_ORIGIN || '*';
const allowedOrigins = rawOrigin.includes(',') 
    ? rawOrigin.split(',').map(o => o.trim()) 
    : rawOrigin;

app.use(cors({
    origin: allowedOrigins === '*' ? '*' : allowedOrigins
}));
app.use(express.json({ limit: '1mb' }));

// Routes
app.use('/api/enquiries', enquiryRoutes);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Global Error Handler
app.use(errorHandler);

export default app;
