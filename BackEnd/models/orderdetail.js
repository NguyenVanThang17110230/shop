'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderDetail.belongsTo(models.ProductSize, {foreignKey:'productSizeId'});
      OrderDetail.belongsTo(models.Order, {foreignKey:'orderId'});
    }
  };
  OrderDetail.init({
    unitAmount: DataTypes.INTEGER,
    unitPrice: DataTypes.DECIMAL,
    isReturn: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};