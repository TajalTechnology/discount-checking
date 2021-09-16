'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {

    /* ASSOSIATION */
    static associate(models) {
      Invoice.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Invoice.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE' });

    }
  };
  Invoice.init({
    unit: DataTypes.INTEGER,
    finalAmmount: DataTypes.FLOAT,
    discountPercentage: DataTypes.FLOAT,
    totalDiscount: DataTypes.FLOAT,
    discountCode: DataTypes.STRING,
    payableAmmount: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};