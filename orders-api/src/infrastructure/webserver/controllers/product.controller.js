// src/infrastructure/web/productController.js

import { createProduct } from "../../../domain/usecase/product/createProduct.usecase.js";
import { getProductById } from "../../../domain/usecase/product/getProductById.usecase.js";
import { searchProducts } from "../../../domain/usecase/product/searchProducts.usecase.js";
import { updateProduct } from "../../../domain/usecase/product/updateProduct.usecase.js";
import { ProductRepository } from "../../database/product.repository.js";


const repo = new ProductRepository();

export const productController = {
  create: async (req, res) => {
    try {
      const product = await createProduct(repo)(req.body);
      res.status(201).json(product);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  update: async (req, res) => {
    try {
      const product = await updateProduct(repo)(req.params.id, req.body);
      res.json(product);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const product = await getProductById(repo)(req.params.id);
      res.json(product);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  },
  search: async (req, res) => {
    try {
      const { search, cursor, limit } = req.query;
      const products = await searchProducts(repo)({ search, cursor, limit });
      res.json(products);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
};
