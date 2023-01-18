const { products } = require("../models");

class ProductsRepository {
  constructor() {
    this._productsModel = products;
  }
  async getAll() {
    const result = await this._productsModel.findAll();
    return result;
  }

  async getByid() {
    const result = await this._productsModel.findOne();
    return result;
  }

  async update(id, products) {
    const result = await this._productsModel.update(id, products);
    return result;
  }
  async delete(id) {
    const result = await this._productsModel.destroy(id);
    return result;
  }
}

module.exports = ProductsRepository;
