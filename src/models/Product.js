import { db } from '../config/db.js'
import BaseModel from './BaseModel.js'

class Product extends BaseModel {
  constructor() {
    super()
  }

  // GET ALL
  async getAll() {
    const [rows] = await db.query('SELECT * FROM products')
    return rows
  }

  // GET BY ID
  async getById(id) {
    const [rows] = await db.query(
      'SELECT * FROM products WHERE id = ?', 
      [id]
    )
    return rows[0]
  }

  // CREATE
  async create(data) {
    const { name, price, description } = data
    const [result] = await db.query(
      'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
      [name, price, description]
    )
    return { id: result.insertId, name, price, description }
  }

  // UPDATE
  async update(id, data) {
    const { name, price, description } = data
    const [result] = await db.query(
      'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
      [name, price, description, id]
    )
    return result.affectedRows
  }

  // DELETE
  async delete(id) {
    const [result] = await db.query(
      'DELETE FROM products WHERE id = ?',
      [id]
    )
    return result.affectedRows
  }
}

export default Product
