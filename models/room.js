'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Place, Sensor}) {
      this.hasOne(Place, {
        foreignKey: "place_id",
      });
      this.belongsTo(Sensor, {
        foreignKey: "sensor_id",
      });
    }
  }
  Room.init({
    name: DataTypes.STRING,
    place_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
    tableName: 'Rooms',
  });
  return Room;
};