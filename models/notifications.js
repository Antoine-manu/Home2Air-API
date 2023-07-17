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
    static associate({User}) {
      this.belongsTo(User, {
        foreignKey: "user_id",
        as: "User"
      });
    }
  }
  Notifications.init({
    user_id: DataTypes.INTEGER,
    custom: DataTypes.BOOLEAN,
    read: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    title: DataTypes.STRING,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Notifications',
  });
  return Notifications;
};