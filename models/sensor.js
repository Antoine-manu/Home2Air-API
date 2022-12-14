'use strict';
const {
  Model
} = require('sequelize');
const room = require('./room');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Room}) {
      this.hasOne(User, {
        foreignKey: "id",
        as: "CreatedByUser"
      });
      this.belongsTo(Room, {
        foreignKey: "room_id",
        as: "Room"
      });
    }
  }
  Sensor.init({
    name: DataTypes.STRING,
    deleted_at: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    room_id: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    parameters: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Sensor',
  });
  return Sensor;
};