'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Room}) {
      this.belongsToMany(User, {
        through: "User_place_list"
      });
      this.belongsTo(Room, {
        foreignKey: "room_id",
      });
    }
  }
  Place.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Place',
    tableName: 'Places',
  });
  return Place;
};