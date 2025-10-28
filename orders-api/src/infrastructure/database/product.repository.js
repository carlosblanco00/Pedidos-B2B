import { Product } from "../../domain/model/product.model.js"
import { ProductGateway } from "../../domain/model/product.gateway.js"
import pool from "./mysql.js";

export class ProductRepository extends ProductGateway {
  
    async create({ sku, name, price_cents, stock }) {
    const [result] = await pool.query(
      `INSERT INTO products (sku, name, price_cents, stock, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [sku, name, price_cents, stock]
    );
    return new Product({ id: result.insertId, sku, name, price_cents, stock });
  }

  async update(id, fields) {
    const updates = [];
    const values = [];

    for (const [key, val] of Object.entries(fields)) {
      updates.push(`${key} = ?`);
      values.push(val);
    }

    if (updates.length === 0) return;

    values.push(id);
    await pool.query(`UPDATE products SET ${updates.join(", ")} WHERE id = ?`, values);
    return this.findById(id);
  }

  async findById(id) {
    const [rows] = await pool.query(`SELECT * FROM products WHERE id = ?`, [id]);
    return rows[0] ? new Product(rows[0]) : null;
  }

  async search({ search = "", cursor = 0, limit = 10 }) {
    const query = `
      SELECT * FROM products
      WHERE name LIKE ? OR sku LIKE ?
      ORDER BY id ASC
      LIMIT ? OFFSET ?`;
    const [rows] = await pool.query(query, [`%${search}%`, `%${search}%`, limit, cursor]);
    return rows.map(r => new Product(r));
  }

  async increaseStock(productId, qty) {
    await pool.execute(
      `UPDATE products SET stock = stock + ? WHERE id = ?`,
      [qty, productId]
    );
  }
}
