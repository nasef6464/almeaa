import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { connectDB } from './config/db';

// Routes Imports (Placeholders for now)
// import authRoutes from './routes/authRoutes';
// import courseRoutes from './routes/courseRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database Connection
connectDB();

// API Routes
app.get('/', (req: Request, res: Response) => {
  res.send('The Hundred LMS API is Running...');
});

// app.use('/api/auth', authRoutes);
// app.use('/api/courses', courseRoutes);

// Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});