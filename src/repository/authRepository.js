const { Op } = require("sequelize");
const { users } = require("../models");

class AuthRepository {
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

  async create(users) {
    const result = await this._UsersModel.create(users);
    return result;
  }
}

module.exports = AuthRepository;
