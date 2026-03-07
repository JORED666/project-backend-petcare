import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { requestLogger } from './proxy';
import authRoutes from './infrastructure/http/routes/auth.routes';
import clientsRoutes from './infrastructure/http/routes/clients.routes';
import petsRoutes from './infrastructure/http/routes/pets.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(requestLogger);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'gateway', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/pets', petsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Gateway running on port ${PORT}`);
});

export default app;