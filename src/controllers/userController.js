import User from '../models/User.js'

class UserController {
  constructor() {
    this.getUsers = this.getUsers.bind(this)
    this.getUser = this.getUser.bind(this)
    this.createUser = this.createUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
  }

  sendSuccess(res, statusCode, message, data = null) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    })
  }

  sendError(res, statusCode, message) {
    return res.status(statusCode).json({
      success: false,
      message
    })
  }

  // GET ALL
  async getUsers(req, res) {
    try {
      const users = await User.getAll()
      return this.sendSuccess(res, 200, 'Users fetched successfully', users)
    } catch (error) {
      return this.sendError(res, 500, 'Error fetching users')
    }
  }

  // GET BY ID
  async getUser(req, res) {
    try {
      const { id } = req.params   // destructuring

      const user = await User.getById(id)

      if (!user) {
        return this.sendError(res, 404, 'User not found')
      }

      return this.sendSuccess(res, 200, 'User fetched successfully', user)
    } catch (error) {
      return this.sendError(res, 500, 'Error fetching user')
    }
  }

  // CREATE
  async createUser(req, res) {
    try {
      const { name } = req.body   // destructuring

      if (!name) {
        return this.sendError(res, 400, 'Name is required')
      }

      const newUser = await User.create(name)

      return this.sendSuccess(res, 201, 'User created successfully', newUser)
    } catch (error) {
      return this.sendError(res, 500, 'Error creating user')
    }
  }

  // UPDATE
  async updateUser(req, res) {
    try {
      const { id } = req.params
      const { name } = req.body

      if (!name) {
        return this.sendError(res, 400, 'Name is required')
      }

      const updated = await User.update(id, name)

      if (!updated) {
        return this.sendError(res, 404, 'User not found')
      }

      return this.sendSuccess(res, 200, 'User updated successfully', { id, name })
    } catch (error) {
      return this.sendError(res, 500, 'Error updating user')
    }
  }

  // DELETE
  async deleteUser(req, res) {
    try {
      const { id } = req.params

      const deleted = await User.delete(id)

      if (!deleted) {
        return this.sendError(res, 404, 'User not found')
      }

      return this.sendSuccess(res, 200, 'User deleted successfully')
    } catch (error) {
      return this.sendError(res, 500, 'Error deleting user')
    }
  }
}

// export instance
export default new UserController()
