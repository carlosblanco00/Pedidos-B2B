export class GetOrderByIdUseCase {
  constructor( orderRepository ) {
    this.orderRepository = orderRepository;
  }

  async execute( id ) {
    const order = await this.orderRepository.getById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  }
}
