'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {


    static associate(models) {
      Discount.hasOne(models.Product, { foreignKey: 'discountId', onDelete: 'CASCADE' });
      Discount.hasOne(models.Category, { foreignKey: 'discountId', onDelete: 'CASCADE' });
      Discount.hasOne(models.SubCategory, { foreignKey: 'discountId', onDelete: 'CASCADE' });
    }
  };
  Discount.init({
    discountCode: DataTypes.STRING,
    percentage: DataTypes.FLOAT,
    expireDate: DataTypes.DATE,
    isActive: DataTypes.BOOLEAN,
    softDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Discount',
  });
  return Discount;
};