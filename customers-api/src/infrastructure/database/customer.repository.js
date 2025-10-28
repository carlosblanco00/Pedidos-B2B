import { CustomerGateway } from '../../domain/models/customer.gateway.js';
import { Customer } from '../../domain/models/customer.model.js';
import pool from './mysql.js';
import dotenv from 'dotenv';

dotenv.config();
const users = [];

export class CustomerRepository extends CustomerGateway{
  async findByEmail(email) {
    return users.find(u => u.email === email);
  }

  async create(customer) {
    const { name, email, phone } = customer;

    const [result] = await pool.query(
      `INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)`,
      [name, email, phone]
    );

    return { id: result.insertId, name, email, phone };
  }

  async findById(id) {

    const [rows] = await pool.query(`SELECT * FROM customers WHERE id = ?`, [id]);
    return rows.length ? rows[0] : null;
  }

  async search({ search = '', cursor = 0, limit = 10 }) {
    const params = [];
    let query = `SELECT * FROM customers WHERE id > ?`;
    params.push(cursor);

    if (search) {
      query += ` AND (name LIKE ? OR email LIKE ?)`;
      const term = `%${search}%`;
      params.push(term, term);
    }

    query += ` ORDER BY id ASC LIMIT ?`;
    params.push(Number(limit));

    const [rows] = await pool.query(query, params);
    return rows;
  }

  async update(id, customer) {
    const { name, email, phone } = customer;

    const [result] = await pool.query(
      `UPDATE customers 
       SET name = ?, email = ?, phone = ?
       WHERE id = ?`,
      [name, email, phone, id]
    );

    if (result.affectedRows === 0) return null;

    const [rows] = await pool.query('SELECT * FROM customers WHERE id = ?', [id]);
    return rows[0];
  }
}
