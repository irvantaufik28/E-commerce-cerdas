'use strict';
const { v4: uuidv4 } = require("uuid");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users, {
        foreignKey: "user_id"
      })
    }
  }
  products.init({
    user_id: DataTypes.INTEGER,
    name_product: DataTypes.STRING,
    price: DataTypes.INTEGER,
    descripition: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
    tableName: "products",
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  products.beforeCreate(async(product)=> {
    product["id"] = uuidv4()
  })
  return products;
};