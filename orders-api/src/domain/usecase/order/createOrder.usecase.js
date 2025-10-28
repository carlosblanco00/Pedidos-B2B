export class CreateOrderUseCase {
    constructor(orderRepository, productRepository, customerService) {
      this.orderRepository = orderRepository
      this.productRepository = productRepository
      this.customerService = customerService
    }
  
    async execute({ customer_id, items }) {
      const customer = await this.customerService.getCustomerById(customer_id)
      if (!customer) {
        throw new Error('Customer not found')
      }
  
      const validatedItems = []
      for (const item of items) {
        const product = await this.productRepository.findById(item.product_id)
        if (!product) throw new Error(`Product ${item.product_id} not found`)
        if (product.stock < item.qty)
          throw new Error(`Insufficient stock for ${product.name}`)
  
        validatedItems.push({
          productId: product.id,
          qty: item.qty,
          unitPrice: product.price_cents,
          subTotal: item.qty * product.price_cents

        })
        console.log("product: ",product)
      }
      console.log("validatedItems: ",validatedItems)
  
      const order = {
        customer_id,
        items: validatedItems,
        status: 'CREATED',
        total: validatedItems.reduce((sum, i) => sum + i.subTotal, 0),
        createdAt: new Date()
      }
  
      const newOrder = await this.orderRepository.create(order)
  
      return newOrder
    }
  }
