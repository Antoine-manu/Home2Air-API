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
    static associate({User, Room, Invites}) {
      this.belongsToMany(User, {
        through: "user_place_list",
        foreignKey: "place_id",
        otherKey: "user_id",
        as: "User"
      });
      this.hasMany(Room, {
        foreignKey: "id",
        as: "Room"
      });
      this.belongsTo(User, {
        foreignKey: "id",
        as: "Owner"
      });
      this.belongsTo(Invites, {
        foreignKey: "id",
        as: "Invited"
      });
    }
  }
  Place.init({
    name: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Place',
    tableName: 'Places',
  });
  return Place;
};