export class CustomerGateway {
    async findByEmail(email) {
      throw new Error('Method not implemented');
    }
  
    async create(customerData) {
      throw new Error('Method not implemented');
    }

    async findById(id) {
      throw new Error('Method not implemented');
    }
  
    async search({ search = '', cursor = 0, limit = 10 }) {
      throw new Error('Method not implemented');
    }

    async update(id, customer) {
      throw new Error('Method not implemented');
    }
  }