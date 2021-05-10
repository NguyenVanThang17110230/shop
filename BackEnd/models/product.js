'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.ProductSize, {foreignKey:'productId'});
      Product.hasMany(models.ProductImage, {foreignKey:'productId'});
      Product.belongsTo(models.Brand, {foreignKey: 'brandId'});
      Product.belongsTo(models.Category, {foreignKey: 'categoryId'});
    }
  };
  Product.init({
    name: DataTypes.STRING,
    productCode: DataTypes.STRING,
    status: DataTypes.STRING,
    description: DataTypes.TEXT,
    alias: DataTypes.STRING,
    color: DataTypes.TEXT,
    imagePath: DataTypes.STRING,
    promotion: DataTypes.DECIMAL,
    importPrice: DataTypes.DECIMAL,
    sellPrice: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};