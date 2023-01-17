const { user_detail } = require('../models')

class UserDetailRepository {
    constructor () {
        this._UserDetailModel = user_detail;
    }
    
    async createUser(user) {
        result = await this._UserDetailModel.create(user)
        return result
    }
}

module.exports = UserDetailRepository;