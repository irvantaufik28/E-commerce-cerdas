const { users } = require("../models");

class AuthRepository {
  constructor() {
    this._UsersModel = users;
  }

  async loginUser(email) {
    const result = await this._UsersModel.findOne({
      where: {
        email,
      },
    });
    return result;
  }

  async register(users) {
    const result = await this._UsersModel.create(users)
    return result
  }
}

module.exports = AuthRepository;