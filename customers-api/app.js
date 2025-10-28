import express from 'express';
import { config } from './src/config/env.js';
import userRoutes from './src/infrastructure/webserver/routes/customer.routes.js';
import internalRoutes from './src/infrastructure/webserver/routes/internal.routes.js';


const app = express();
app.use(express.json());

app.use('/api/v1/customers', userRoutes);
app.use('/api/v1/internal', internalRoutes);

app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, message: 'API is healthy' });
});

app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});
