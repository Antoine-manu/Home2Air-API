'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications_icon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Notifications}) {
      this.hasMany(Notifications, {
        foreignKey: "icon_id",
      });
    }
  }
  Notifications_icon.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notifications_icon',
  });
  return Notifications_icon;
};