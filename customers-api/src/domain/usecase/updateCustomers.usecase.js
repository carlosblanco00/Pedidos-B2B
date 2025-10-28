export class UpdateCustomerUseCase {
    constructor(customerRepository) {
      this.customerRepository = customerRepository;
    }
  
    async execute(id, data) {
      const existing = await this.customerRepository.findById(id);
      if (!existing) {
        throw new Error('NOT_FOUND');
      }
  
      const updated = await this.customerRepository.update(id, data);
      return updated;
    }
  }