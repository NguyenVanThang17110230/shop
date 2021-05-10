'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImportDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ImportDetail.belongsTo(models.ProductSize, {foreignKey:'productSizeId'});
      ImportDetail.belongsTo(models.Import, {foreignKey:'importId'});
    }
  };
  ImportDetail.init({
    amount: DataTypes.INTEGER,
    importPrice: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ImportDetail',
  });
  return ImportDetail;
};