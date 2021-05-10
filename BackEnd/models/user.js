'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order, {foreignKey:'userId'});
    }
  };
  User.init({
    googleId: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    avatarPath: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    birthday: DataTypes.DATEONLY,
    score: DataTypes.INTEGER,
    isAdmin: DataTypes.BOOLEAN,
    isConfirm: DataTypes.BOOLEAN,
    isLock: DataTypes.BOOLEAN,
    authType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};