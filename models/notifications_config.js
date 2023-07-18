'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications_config extends Model {
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
  Notifications_config.init({
    title: DataTypes.STRING,
    data: DataTypes.STRING,
    percent: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notifications_config',
  });
  return Notifications_config;
};