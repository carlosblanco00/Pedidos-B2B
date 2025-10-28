export class CreateCustomerUseCase {
  constructor(customerGateway) {
    this.customerGateway = customerGateway;
  }

  async execute(userData) {
    const existingUser = await this.customerGateway.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    return this.customerGateway.create(userData);
  }
}
