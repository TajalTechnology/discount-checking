'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {

    static associate(models) {
      SubCategory.belongsTo(models.Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
      SubCategory.hasMany(models.Product, { foreignKey: 'subCategoryId', onDelete: 'CASCADE' });
      
      SubCategory.belongsTo(models.Discount, { foreignKey: 'discountId', onDelete: 'CASCADE' });
      // SubCategory.hasMany(models.Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
      
    }
  };
  SubCategory.init({
    subCategory: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SubCategory',
  });
  return SubCategory;
};