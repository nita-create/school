class BaseModel {
  constructor() {
    if (this.constructor === BaseModel) {
      throw new Error("BaseModel is an abstract class and cannot be instantiated directly")
    }
  }

  // Abstract methods that must be implemented by child classes
  async getAll() {
    throw new Error("Method 'getAll()' must be implemented")
  }

  async getById(id) {
    throw new Error("Method 'getById()' must be implemented")
  }

  async create(data) {
    throw new Error("Method 'create()' must be implemented")
  }

  async update(id, data) {
    throw new Error("Method 'update()' must be implemented")
  }

  async delete(id) {
    throw new Error("Method 'delete()' must be implemented")
  }
}

export default BaseModel
