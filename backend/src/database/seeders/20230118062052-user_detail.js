const bcrypt = require('bcrypt')
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user_detail",
      [
        {
          user_id: 1,
          first_name: "Irvan",
          last_name: "Taufik",
          address: "Perum Griya sahla 2, Garut",
          gender: "MALE",
          image: "http://res.cloudinary.com/dnvltueqb/image/upload/v1674022299/product/1674022290850_20230107121949801d9ebf7436a40f030eac67bc72bdfb1673094040870_pbhjq3.png",
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_detail", null, {});
  },
};