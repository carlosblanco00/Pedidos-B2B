import { httpClient } from '../utils/httpClient.js';

export class OrdersService {
  constructor() {
    this.baseUrl = process.env.ORDERS_API_URL;
  }

  async createOrder(payload) {
    console.log('payload:', payload);

    try {
      const res = await httpClient.post('/api/v1/orders/', payload, {
        baseURL: this.baseUrl
      });
      return res.data;
    } catch (err) {
      console.error('OrdersService.createOrder ERROR:', {
        message: err.message,
        responseData: err.response || null,
        status: err.response?.status || null
      });
      throw err; // relanzamos para que la Lambda capture el error
    }
  }

  async confirmOrder(orderId, idempotencyKey) {
    
    const headers = {};
    if (idempotencyKey) headers['X-Idempotency-Key'] = idempotencyKey;
    try {
      const res = await httpClient.post(`/api/v1/orders/${orderId}/confirm`, {}, {
        baseURL: this.baseUrl,
        headers
      });
      return res.data;
    } catch (err) {
      console.error('OrdersService.confirmOrder ERROR:', {
        message: err.message,
        responseData: err.response?.data || null,
        status: err.response?.status || null
      });
      throw err;
    }
  }

  async cancelOrder(orderId) {
    try {
      const res = await httpClient.post(`/api/v1/orders/${orderId}/cancel`, {}, {
        baseURL: this.baseUrl
      });
      return res.data;
    } catch (err) {
      console.error('OrdersService.cancelOrder ERROR:', {
        message: err.message,
        responseData: err.response?.data || null,
        status: err.response?.status || null
      });
      throw err;
    }
  }
}


