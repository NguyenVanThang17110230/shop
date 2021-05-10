'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Import extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Import.hasMany(models.ImportDetail, {foreignKey:'importId'});
    }
  };
  Import.init({
    importCode: DataTypes.STRING,
    publisherName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Import',
  });
  return Import;
};