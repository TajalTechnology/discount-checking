'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      finalAmmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      discountCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      discountPercentage: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      totalDiscount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      payableAmmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Invoices');
  }
};