'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Product, {foreignKey:'categoryId'});
      Category.belongsTo(models.Group, {foreignKey: 'groupId'});
    }
  };
  Category.init({
    name: DataTypes.STRING,
    summary: DataTypes.TEXT,
    imagePath: DataTypes.STRING,
    alias: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};