"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.user_detail, {
        as: "user_detail",
        foreignKey:"user_id",
      })

      this.hasMany(models.products, {
        as: "products",
        foreignKey: "user_id"
      })
    }
  }
  users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
      tableName: "users",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return users;
};
