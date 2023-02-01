const { users } = require("../models");
const { Op } = require('sequelize')

class UserRepository {
  constructor() {
    this._UsersModel = users;
  }

  async getAll(params, options) {
    const filters = {};

    if (params) {
      const search = params.q;
      if (search) {
        filters[Op.or] = [
          {
            email: {
              [Op.iLike]: `%${search}%`,
            },
          },
        ];
      }
    }
    const result = await this._UsersModel.findAndCountAll({
      where: filters,
      attributes: { exclude: ["password"] },
      ...options,
      distinct: true,

    });

    return result;
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
