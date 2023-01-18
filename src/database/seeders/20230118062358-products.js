const bcrypt = require("bcrypt");
("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          id: "123e4567-e89b-12d3-a456-426614174001",
          user_id : 1,
          name_product: "Kopi Susu",
          price: 15000,
          descripition: "kopi susu asli nikmat",
          image: "http://res.cloudinary.com/dnvltueqb/image/upload/v1674022299/product/1674022290850_20230107121949801d9ebf7436a40f030eac67bc72bdfb1673094040870_pbhjq3.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "123e4567-e89b-12d3-a456-426614174000",
          user_id : 1,
          name_product: "Mie instan",
          price: 8000,
          descripition: "Mie instan terbaru enak",
          image: "http://res.cloudinary.com/dnvltueqb/image/upload/v1674022299/product/1674022290850_20230107121949801d9ebf7436a40f030eac67bc72bdfb1673094040870_pbhjq3.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
