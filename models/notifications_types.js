'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Notifications, Notifications_config}) {
      this.hasMany(Notifications, {
        foreignKey: "type",
        as: "Notifications"
      });
      this.hasMany(Notifications_config, {
        foreignKey: "type",
        as: "NotificationsConfig"
      });
    }
  }
  Notifications_types.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notifications_types',
  });
  return Notifications_types;
};