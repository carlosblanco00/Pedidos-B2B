import { CancelOrderUseCase } from "../../../domain/usecase/order/cancelOrder.usecase.js";
import { ConfirmOrderUseCase } from "../../../domain/usecase/order/confirmOrder.usecase.js";
import { CreateOrderUseCase } from "../../../domain/usecase/order/createOrder.usecase.js";
import { GetOrderByIdUseCase } from "../../../domain/usecase/order/getOrderById.usecase.js";
import { IdempotencyRepository } from "../../database/idempotency.repository.js";
import { OrderRepository } from "../../database/order.repository.js";
import { ProductRepository } from "../../database/product.repository.js";
import { CustomerService } from "../../external/Customer.services.js";


const orderRepo = new OrderRepository();
const productRepository = new ProductRepository();
const customerService = new CustomerService();
const idempotencyRepository = new IdempotencyRepository()

const createOrderUseCase = new CreateOrderUseCase(orderRepo, productRepository, customerService);
const getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepo);
const confirmOrderUseCase = new ConfirmOrderUseCase(orderRepo, idempotencyRepository);
const cancelOrderUseCase = new CancelOrderUseCase(orderRepo, productRepository);

export const createOrderController = async (req, res) => {
  try {
    const order = await createOrderUseCase.execute(req.body);
    res.status(201).json(order);
  } catch (error) {
    console.error("[createOrderController]", error);
    res.status(400).json({ message: error.message });
  }
};

export const getOrderByIdController = async (req, res) => {
  try {
    const order = await getOrderByIdUseCase.execute(req.params.id);
    res.status(201).json(order);
  } catch (error) {
    console.error("[createOrderController]", error);
    res.status(400).json({ message: error.message });
  }
};

export const confirmOrderUseCaseController = async (req, res) => {

  const idempotencyKey = req.header("X-Idempotency-Key");
  if (!idempotencyKey) return res.status(400).json({ message: "Idempotency key required" });
  try {
    const order = await confirmOrderUseCase.execute({
      orderId: req.params.id,
      idempotencyKey
    });
    res.status(201).json(order);
  } catch (error) {
    console.error("[createOrderController]", error);
    res.status(400).json({ message: error.message });
  }
};

export const cancelOrderUseCaseController = async (req, res) => {
  try {
    const order = await cancelOrderUseCase.execute({
      orderId: req.params.id
    });
    res.status(201).json(order);
  } catch (error) {
    console.error("[createOrderController]", error);
    res.status(400).json({ message: error.message });
  }
};
