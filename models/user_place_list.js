'use strict';
const {
  Model
} = require('sequelize');
const place = require('./place');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class User_place_lists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  User_place_lists.init({
    user_id: DataTypes.INTEGER,
    place_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_place_lists',
  });
  return User_place_lists;
};