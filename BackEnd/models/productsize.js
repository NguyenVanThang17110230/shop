'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductSize.belongsTo(models.Size, {foreignKey: 'sizeId'});
      ProductSize.belongsTo(models.Product, {foreignKey: 'productId'});
      ProductSize.hasMany(models.OrderDetail, {foreignKey:'productSizeId'});
    }
  };
  ProductSize.init({
    productCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductSize',
  });
  return ProductSize;
};