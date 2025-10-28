export class GetCustomerByIdUseCase {
    constructor(customerRepository) {
      this.customerRepository = customerRepository;
    }
  
    async execute(id) {
      const customer = await this.customerRepository.findById(id);
      if (!customer) {
        const error = new Error('Customer not found');
        error.status = 404;
        throw error;
      }
      return customer;
    }
  }
  