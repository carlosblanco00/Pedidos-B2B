import express from 'express';
import { serviceAuthMiddleware } from '../middlewares/serviceAuthMiddleware.js';
import { getInternalCustomerByIdController } from '../controllers/internalCustomer.controller.js';

const router = express.Router();

router.get('/customers/:id', serviceAuthMiddleware, getInternalCustomerByIdController);

export default router;
