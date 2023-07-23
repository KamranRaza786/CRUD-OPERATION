import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', productRoutes);

// 404 Error handling
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;
