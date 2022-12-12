'use strict';
const {
  Model
} = require('sequelize');
const notifications_icon = require('./notifications_icon');
const notifications_sound = require('./notifications_sound');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.belongsTo(user, {
        through: "user_id",
        foreignKey: "id",
      });
      models.belongsTo(notifications_sound, {
        through: "sound_id",
        foreignKey: "id",
      });
      models.belongsTo(notifications_icon, {
        through: "icon_id",
        foreignKey: "id",
      });
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