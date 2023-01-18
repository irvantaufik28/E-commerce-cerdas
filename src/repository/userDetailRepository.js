
const { user_detail } = require('../models')

class UserDetailRepository {
    constructor () {
        this._UserDetailModel = user_detail;
    }
    
    async create(user_detail) {
       const result = await this._UserDetailModel.create(user_detail)
        return result
    }

    async update(user_id, user_detail) {
        const result = await this._UserDetailModel.update(user_detail, {
            where: {
                user_id
            }
        })
        return result
    }
    async delete(id) {
        const result = await this._UserDetailModel.destroy({
          where: {
            id,
          },
        });
        return result;
      }
}

module.exports = UserDetailRepository;