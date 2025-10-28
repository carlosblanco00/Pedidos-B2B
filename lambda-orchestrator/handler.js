import dotenv from 'dotenv';
import { CustomerService } from './services/customers.service.js';
import { OrdersService } from './services/orders.service.js';
import { successResponse, errorResponse } from './utils/response.js';

dotenv.config();

export const handler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const { customer_id, items, idempotency_key, correlation_id } = body;

    if (!customer_id || !Array.isArray(items) || items.length === 0) {
      return errorResponse({ message: 'customer_id y items[] son requeridos' }, 400);
    }

    const customerService = new CustomerService();
    const orderService = new OrdersService();

    const customer = await customerService.getCustomerById(customer_id);

    const order = await orderService.createOrder({ customer_id, items });

    const confirmed = await orderService.confirmOrder(order.id, idempotency_key);

    confirmed.items = order.items

    return successResponse({
      correlation_id: correlation_id || null,
      customer,
      order: confirmed
    });
  } catch (err) {
    return errorResponse(err);
  }
};

