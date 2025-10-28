import express from 'express';
import { createCustomerController, getCustomerByIdController, searchCustomersController } from '../controllers/customer.controller.js';

const router = express.Router();

router.post('/', createCustomerController);
router.get('/:id', getCustomerByIdController);
router.get('/', searchCustomersController);


export default router;
