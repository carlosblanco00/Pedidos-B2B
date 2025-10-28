// src/infrastructure/web/routes.js
import express from "express";
import { productController } from "../controllers/product.controller.js";

export const router = express.Router();

router.post("/", productController.create);
router.patch("/:id", productController.update);
router.get("/:id", productController.getById);
router.get("/", productController.search);

export default router;