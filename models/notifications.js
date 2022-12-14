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
    static associate({User, Notifications_sound, Notifications_icon, Notifications_types}) {
      this.belongsTo(User, {
        foreignKey: "user_id",
        as: "User"
      });
      this.belongsTo(Notifications_sound, {
        foreignKey: "sound_id",
        as: "NotificationSound"
      });
      this.belongsTo(Notifications_icon, {
        foreignKey: "icon_id",
        as: "NotificationIcon"
      });
      this.belongsTo(Notifications_types, {
        foreignKey: "type",
        as: "NotificationType"
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