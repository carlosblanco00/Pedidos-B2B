import express from "express";
import { cancelOrderUseCaseController, confirmOrderUseCaseController, createOrderController, getOrderByIdController } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrderController);
router.get("/:id", getOrderByIdController);
router.post("/:id/confirm", confirmOrderUseCaseController);
router.post("/:id/cancel", cancelOrderUseCaseController);

export default router;
