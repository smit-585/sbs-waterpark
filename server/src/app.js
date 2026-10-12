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

// Health Check Routes
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'SBS Waterpark API is active', health: '/api/health' });
});

app.get(['/health', '/api/health'], (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Routes - support both with and without /api prefix
app.use('/api/enquiries', enquiryRoutes);
app.use('/enquiries', enquiryRoutes);

// 404 Handler
app.use((req, res, next) => {
    console.warn(`[404] Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Global Error Handler
app.use(errorHandler);

export default app;
