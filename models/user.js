'use strict';
const {
  Model
} = require('sequelize');
const roles = require('./roles');
const User_place_list = require('./user_place_list');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Place, Roles, Company, Notifications, Tickets}) {
      this.belongsToMany(Place, {
        through: "user_place_list",
      });
      this.hasOne(Roles, {
        foreignKey: "roles_id",
      });
      this.belongsTo(Company, {
        foreignKey: "company_id",
      });
      this.belongsTo(Notifications, {
        foreignKey: "notification_id",
      });
      this.belongsTo(Tickets, {
        foreignKey: "ticket_id",
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
    deleted_at: DataTypes.DATE,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};