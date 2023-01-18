const { users } = require("../models");

class UserRepository {
  constructor() {
    this._UsersModel = users;
  }

  async getByEmail(email) {
    const result = await this._UsersModel.findOne({
      where: {
        email,
      },
    });
    return result;
  }

  async getById(id, options = {}) {
    const result = await this._UsersModel.findOne({
      where: {
        id,
      },
      attributes: { exclude: ["password"] },
      ...options,
    });
    return result;
  }

  async getByPhone(phone_number) {
    const result = await this._UsersModel.findOne({
      where: {
        phone_number,
      },
    });
    return result;
  }

  async create(user) {
    const result = await this._UsersModel.create(user);
    return result;
  }

  async update(id, user) {
    const result = await this._UsersModel.update(user, {
      where: {
        id,
      },
    });
    return result;
  } 
  
  async delete(id) {
    const result = await this._UsersModel.destroy({
      where: {
        id,
      },
    });
    return result;
  }
}

module.exports = UserRepository;
