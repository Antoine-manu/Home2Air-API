'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room_list.init({
    room_id: DataTypes.INTEGER,
    sensor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room_list',
  });
  return Room_list;
};