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
    static associate({Place, Roles, Company, Notifications, Tickets, Sensor, Tickets_commentaire, Invites, Notifications_config}) {
      this.belongsToMany(Place, {
        through: "User_place_lists",
        foreignKey: "user_id",
        otherKey: "place_id",
        as: "Place"
      });
      this.belongsTo(Roles, {
        foreignKey: "role_id",
        as: "Role"
      });
      this.hasMany(Place, {
        foreignKey: "createdBy",
        as: "Place_created"
      });
      this.hasMany(Invites, {
        foreignKey: "userTo",
        as: "InvitesRecieved"
      });
      this.hasMany(Invites, {
        foreignKey: "userFrom",
        as: "InvitesSent"
      });
      this.belongsTo(Company, {
        foreignKey: "id",
        as: "Company"
      });
      this.hasMany(Notifications, {
        foreignKey: "user_id",
        as: "Notifications"
      });
      this.hasMany(Notifications_config, {
        foreignKey: "user_id",
        as: "NotificationsConfigs"
      });
      this.hasMany(Tickets, {
        foreignKey: "createdBy",
        as: "Tickets"
      });
      this.belongsTo(Tickets_commentaire, {
        foreignKey: "id",
        as: "Tickets_commentaire"
      });
      this.hasMany(Sensor, {
        foreignKey: "createdBy",
        as: "Sensor"
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
    active: DataTypes.BOOLEAN,
    darkMode: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};