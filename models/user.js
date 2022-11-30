'use strict';
const {
  Model
} = require('sequelize');
const User_place_list = require('./user_place_list');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.belongsToMany(User_place_list, {
        through: "user_place_liste_id",
        as: "user_place",
        foreignKey: "user_place_liste_id",
      });
      
    }
  }
  User.init({
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
    created_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
    active: DataTypes.BOOLEAN,
    user_place_list_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};