import express from 'express';
import { config } from './src/config/env.js';
import productsRouter from './src/infrastructure/webserver/routes/products.routes.js'
import ordersRouter from './src/infrastructure/webserver/routes/orders.routes.js'
 

const app = express();
app.use(express.json());

// Rutas base
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/orders', ordersRouter);

// Healthcheck
app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, message: 'API is healthy' });
});

app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});
