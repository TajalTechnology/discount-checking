'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {

    static associate(models) {
      Category.belongsTo(models.Discount, { foreignKey: 'discountId', onDelete: 'CASCADE' });
      Category.hasMany(models.SubCategory, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
      // Category.belongsTo(models.Discount, { foreignKey: 'discountId', onDelete: 'CASCADE' });
      // Category.hasMany(models.Product, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
    }
  };
  Category.init({
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};