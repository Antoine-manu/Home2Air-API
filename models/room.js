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
      this.belongsTo(Place, {
        foreignKey: "place_id",
        as: "Place"
      });
      this.hasMany(Sensor, {
        foreignKey: "room_id",
        as: "Sensor"
      });
    }
  }
  Room.init({
    name: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    place_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
    tableName: 'Rooms',
  });
  return Room;
};