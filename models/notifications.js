'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notifications.init({
    user_id: DataTypes.INTEGER,
    custom: DataTypes.BOOLEAN,
    read: DataTypes.BOOLEAN,
    type: DataTypes.INTEGER,
    date: DataTypes.DATE,
    title: DataTypes.STRING,
    sound_id: DataTypes.INTEGER,
    icon_id: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Notifications',
  });
  return Notifications;
};