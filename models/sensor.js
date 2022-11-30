'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sensor.init({
    name: DataTypes.STRING,
    deleted_at: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    parameters: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Sensor',
  });
  return Sensor;
};