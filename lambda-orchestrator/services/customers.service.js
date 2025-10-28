import { httpClient } from '../utils/httpClient.js';

export class CustomerService {
  constructor() {
    this.baseUrl = process.env.CUSTOMERS_API_URL;
    this.token = process.env.SERVICE_TOKEN;
    if (!this.baseUrl || !this.token) {
      throw new Error('CUSTOMERS_API_URL and SERVICE_TOKEN must be set in env');
    }
  }

  async getCustomerById(id) {
    const res = await httpClient.get(`/api/v1/internal/customers/${id}`, {
      baseURL: this.baseUrl,
      headers: { Authorization: `Bearer ${this.token}` }
    });
    console.log("customer: ",res.data)
    return res.data;
  }
}
