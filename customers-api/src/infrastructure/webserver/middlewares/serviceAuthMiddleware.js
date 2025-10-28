import { config } from '../../../config/env.js';

export const serviceAuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token requerido' });
    }

    const token = authHeader.split(' ')[1];
    if (!token || token !== config.SERVICE_TOKEN) {
        console.log("config: ", config.SERVICE_TOKEN)
        console.log("token: ", token)
        throw new Error('UNAUTHORIZED');
      }
    next();
  } catch (error) {
    if (error.message === 'UNAUTHORIZED') {
      return res.status(401).json({ message: 'No autorizado' });
    }

    console.error('[serviceAuthMiddleware]', error);
    res.status(500).json({ message: 'Error interno de autenticación' });
  }
};
