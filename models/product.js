'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      
      // Product.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Product.belongsTo(models.Discount, { foreignKey: 'discountId', onDelete: 'CASCADE' });
      // Product.belongsTo(models.Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
      Product.belongsTo(models.SubCategory, { foreignKey: 'subCategoryId', onDelete: 'CASCADE' });
      Product.hasMany(models.Invoice, { foreignKey: 'productId', onDelete: 'CASCADE' });
    }
  };
  Product.init({
    productName: DataTypes.STRING,
    price: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};