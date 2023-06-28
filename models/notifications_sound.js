'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications_sound extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Notifications, Notifications_config}) {
      this.hasMany(Notifications, {
        foreignKey: "sound_id",
        as: "NotificationSound"
      });
      this.hasMany(Notifications_config, {
        foreignKey: "sound_id",
        as: "NotificationsConfig"
      });
    }
  }
  Notifications_sound.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notifications_sound',
  });
  return Notifications_sound;
};