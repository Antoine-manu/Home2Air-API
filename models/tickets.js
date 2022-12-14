'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Tickets_commentaire, User}) {
      this.belongsTo(User, {
        foreignKey: "createdBy",
      });
      this.belongsTo(User, {
        foreignKey: "updatedBy",
      });
      this.hasMany(Tickets_commentaire, { 
        foreignKey: "ticket_id",
      });
      
    }
  }
  Tickets.init({
    createdBy: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tickets',
  });
  return Tickets;
};