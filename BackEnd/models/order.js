'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasMany(models.OrderDetail, {foreignKey:'orderId'});
      Order.belongsTo(models.User, {foreignKey:'userId'});
    }
  };
  Order.init({
    orderCode: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    promotionCode: DataTypes.STRING,
    payment: DataTypes.STRING,
    dateOfReturn: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};