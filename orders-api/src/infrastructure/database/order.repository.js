import { OrderGateway } from '../../domain/model/order.gateway.js';
import pool from './mysql.js';

export class OrderRepository extends OrderGateway {

  async create(order) {
    const conn = await pool.getConnection();
    try {
      console.log("Order: ", order)
      await conn.beginTransaction();

      const [orderResult] = await conn.execute(
        `INSERT INTO orders (customer_id, status, total_cents, created_at)
         VALUES (?, ?, ?, NOW())`,
        [order.customer_id, order.status, order.total]
      );
      const orderId = orderResult.insertId;
      console.log("orderId: ", orderId)

      const insertedItems = [];
      for (const it of order.items) {
        const [itemResult] = await conn.execute(
          `INSERT INTO order_items (order_id, product_id, qty, unit_price_cents, subtotal_cents)
           VALUES (?, ?, ?, ?, ?)`,
          [orderId, it.productId, it.qty, it.unitPrice, it.subTotal]
        );

        insertedItems.push({
          product_id: it.productId,
          qty: it.qty,
          unit_price_cents: it.unitPrice,
          subtotal_cents: it.subTotal,
        });

        await conn.execute(
          `UPDATE products SET stock = stock - ? WHERE id = ?`,
          [it.qty, it.productId]
        );
      }

      const [orderRows] = await conn.execute(
        `SELECT id, customer_id, status, total_cents, created_at
         FROM orders WHERE id = ?`,
        [orderId]
      );

      await conn.commit();

      return {
        ...orderRows[0],
        items: insertedItems,
      };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  async getById(id) {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.execute(
        `SELECT 
           o.id AS order_id,
           o.customer_id,
           o.status,
           o.total_cents,
           o.created_at AS order_created_at,
           i.id AS item_id,
           i.product_id,
           i.qty,
           i.unit_price_cents,
           i.subtotal_cents
         FROM orders o
         INNER JOIN order_items i ON o.id = i.order_id
         WHERE o.id = ?`,
        [id]
      );

      if (!rows.length) return null;

      const order = {
        id: rows[0].order_id,
        customer_id: rows[0].customer_id,
        status: rows[0].status,
        total_cents: rows[0].total_cents,
        created_at: rows[0].order_created_at,
        items: rows.map(row => ({
          id: row.item_id,
          product_id: row.product_id,
          qty: row.qty,
          unit_price_cents: row.unit_price_cents,
          subtotal_cents: row.subtotal_cents,
        })),
      };

      return order;
    } finally {
      conn.release();
    }
  }

  async updateStatus(orderId, status) {
    await pool.execute(
      `UPDATE orders SET status = ? WHERE id = ?`,
      [status, orderId]
    );
    const [rows] = await pool.execute(
      `SELECT id, customer_id, status, total_cents, created_at
      FROM orders WHERE id = ?`,
      [orderId]
    );
    return rows[0];
  }

}
