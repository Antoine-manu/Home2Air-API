'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications_messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notifications_messages.init({
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notifications_messages',
  });
  return Notifications_messages;
};