'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      productCode: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      status: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      alias: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      amount: {
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.TEXT
      },
      imagePath: {
        type: Sequelize.STRING
      },
      promotion:{
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};