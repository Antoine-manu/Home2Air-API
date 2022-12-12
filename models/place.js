'use strict';
const {
  Model
} = require('sequelize');
const user_place_list = require('./user_place_list');
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.belongsToMany(user_place_list, {
        through: "place_list_id",
        as: "place_list",
        foreignKey: "id",
      });

    }
  }
  Place.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Place',
  });
  return Place;
};