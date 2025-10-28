export class ConfirmOrderUseCase {
  constructor( orderRepository, idempotencyRepository ) {
    this.orderRepository = orderRepository;
    this.idempotencyRepository = idempotencyRepository;
  }

  async execute({ orderId, idempotencyKey }) {
    const cached = await this.idempotencyRepository.getResponse(idempotencyKey);
    if (cached) return cached;

    const order = await this.orderRepository.getById(orderId);
    if (!order) throw new Error("Order not found");
    if (order.status !== "CREATED") throw new Error("Order cannot be confirmed");

    const updatedOrder = await this.orderRepository.updateStatus(orderId, "CONFIRMED");

    await this.idempotencyRepository.saveResponse(
      idempotencyKey,
      "order",
      orderId,
      updatedOrder
    );

    return updatedOrder;
  }
}
