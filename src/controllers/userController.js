import User from '../models/User.js'
import BaseController from './BaseController.js'

class UserController extends BaseController {
  constructor() {
    super()
    this.getUsers = this.getUsers.bind(this)
    this.getUser = this.getUser.bind(this)
    this.createUser = this.createUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
  }

  // GET ALL
  async getUsers(req, res) {
    try {
      const userModel = new User()
      const users = await userModel.getAll()
      return this.success(res, 200, 'Users fetched successfully', users)
    } catch (error) {
      return this.error(res, 500, 'Error fetching users')
    }
  }

  // GET BY ID
  async getUser(req, res) {
    try {
      const { id } = req.params   // destructuring
      const userModel = new User()
      const user = await userModel.getById(id)

      if (!user) {
        return this.error(res, 404, 'User not found')
      }

      return this.success(res, 200, 'User fetched successfully', user)
    } catch (error) {
      return this.error(res, 500, 'Error fetching user')
    }
  }

  // CREATE
  async createUser(req, res) {
    try {
      const { name } = req.body   // destructuring

      if (!name) {
        return this.error(res, 400, 'Name is required')
      }

      const userModel = new User()
      const newUser = await userModel.create({ name })

      return this.success(res, 201, 'User created successfully', newUser)
    } catch (error) {
      return this.error(res, 500, 'Error creating user')
    }
  }

  // UPDATE
  async updateUser(req, res) {
    try {
      const { id } = req.params
      const { name } = req.body

      if (!name) {
        return this.error(res, 400, 'Name is required')
      }

      const userModel = new User()
      const updated = await userModel.update(id, { name })

      if (!updated) {
        return this.error(res, 404, 'User not found')
      }

      return this.success(res, 200, 'User updated successfully', { id, name })
    } catch (error) {
      return this.error(res, 500, 'Error updating user')
    }
  }

  // DELETE
  async deleteUser(req, res) {
    try {
      const { id } = req.params
      const userModel = new User()
      const deleted = await userModel.delete(id)

      if (!deleted) {
        return this.error(res, 404, 'User not found')
      }

      return this.success(res, 200, 'User deleted successfully')
    } catch (error) {
      return this.error(res, 500, 'Error deleting user')
    }
  }
}

// export instance
export default new UserController()
