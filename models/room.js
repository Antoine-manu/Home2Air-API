'use strict';
const {
  Model
} = require('sequelize');
const place = require('./place');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.belongsTo(place, {
        through: "place_id",
        as: "place",
        foreignKey: "place_id",
      });
    }
  }
  Room.init({
    name: DataTypes.STRING,
    place_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};