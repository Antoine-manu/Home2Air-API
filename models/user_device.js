'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Device.init({
    user_id: DataTypes.INTEGER,
    device: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_Device',
  });
  return User_Device;
};