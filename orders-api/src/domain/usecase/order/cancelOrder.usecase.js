export class CancelOrderUseCase {
  constructor( orderRepository, productRepository ) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
  }

  async execute({ orderId }) {
    const order = await this.orderRepository.getById(orderId);
    if (!order) throw new Error("Order not found");

    if (order.status === "CANCELED") throw new Error("Order already canceled");

    if (order.status === "CREATED") {
      await this.restoreStock(order.items);
      const updated = await this.orderRepository.updateStatus(orderId, "CANCELED");
      return updated;
    }

    if (order.status === "CONFIRMED") {
      const createdAt = new Date(order.created_at);
      const diffMin = (Date.now() - createdAt.getTime()) / 60000;
      if (diffMin > 10) throw new Error("Cannot cancel confirmed order after 10 minutes");

      await this.restoreStock(order.items);
      const updated = await this.orderRepository.updateStatus(orderId, "CANCELED");
      return updated;
    }

    throw new Error("Order cannot be canceled");
  }

  async restoreStock(items) {
    for (const item of items) {
      await this.productRepository.increaseStock(item.product_id, item.qty);
    }
  }
}
