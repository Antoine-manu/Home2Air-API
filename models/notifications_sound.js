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
    static associate({Notifications}) {
      this.hasMany(Notifications, {
        foreignKey: "sound_id",
        as: "NotificationSound"
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