
const { user_detail } = require('../models')

class UserDetailRepository {
    constructor () {
        this._UserDetailModel = user_detail;
    }
    
    async create(user) {
       const result = await this._UserDetailModel.create(user)
        return result
    }
}

module.exports = UserDetailRepository;