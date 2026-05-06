import Product from '../models/Product.js'
import BaseController from './BaseController.js'

class ProductController extends BaseController {
  constructor() {
    super()
    this.getProducts = this.getProducts.bind(this)
    this.getProduct = this.getProduct.bind(this)
    this.createProduct = this.createProduct.bind(this)
    this.updateProduct = this.updateProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  // GET ALL
  async getProducts(req, res) {
    try {
      const productModel = new Product()
      const products = await productModel.getAll()
      return this.success(res, 200, 'Products fetched successfully', products)
    } catch (error) {
      return this.error(res, 500, 'Error fetching products')
    }
  }

  // GET BY ID
  async getProduct(req, res) {
    try {
      const { id } = req.params   // destructuring
      const productModel = new Product()
      const product = await productModel.getById(id)

      if (!product) {
        return this.error(res, 404, 'Product not found')
      }

      return this.success(res, 200, 'Product fetched successfully', product)
    } catch (error) {
      return this.error(res, 500, 'Error fetching product')
    }
  }

  // CREATE
  async createProduct(req, res) {
    try {
      const { name, price, description } = req.body   // destructuring

      if (!name || !price) {
        return this.error(res, 400, 'Name and price are required')
      }

      const productModel = new Product()
      const newProduct = await productModel.create({ name, price, description })

      return this.success(res, 201, 'Product created successfully', newProduct)
    } catch (error) {
      return this.error(res, 500, 'Error creating product')
    }
  }

  // UPDATE
  async updateProduct(req, res) {
    try {
      const { id } = req.params
      const { name, price, description } = req.body

      if (!name || !price) {
        return this.error(res, 400, 'Name and price are required')
      }

      const productModel = new Product()
      const updated = await productModel.update(id, { name, price, description })

      if (!updated) {
        return this.error(res, 404, 'Product not found')
      }

      return this.success(res, 200, 'Product updated successfully', { id, name, price, description })
    } catch (error) {
      return this.error(res, 500, 'Error updating product')
    }
  }

  // DELETE
  async deleteProduct(req, res) {
    try {
      const { id } = req.params
      const productModel = new Product()
      const deleted = await productModel.delete(id)

      if (!deleted) {
        return this.error(res, 404, 'Product not found')
      }

      return this.success(res, 200, 'Product deleted successfully')
    } catch (error) {
      return this.error(res, 500, 'Error deleting product')
    }
  }
}

// export instance
export default new ProductController()
