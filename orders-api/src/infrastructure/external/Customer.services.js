import axios from "axios";
import { CustomerGateway } from "../../domain/model/customer.gateway.js";

export class CustomerService extends CustomerGateway {
  constructor() {
    super(); 

    this.baseUrl = process.env.CUSTOMERS_API_URL;
    this.serviceToken = process.env.SERVICE_TOKEN;

    if (!this.baseUrl || !this.serviceToken) {
      throw new Error("Missing CUSTOMERS_API_URL or SERVICE_TOKEN in environment");
    }
  }

  async getCustomerById(id) {
    const res = await axios.get(`${this.baseUrl}/api/v1/internal/customers/${id}`, {
      headers: { Authorization: `Bearer ${this.serviceToken}` },
    });
    return res.data;
  }
}
