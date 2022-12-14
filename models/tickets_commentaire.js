'use strict';
const {
  Model
} = require('sequelize');
const tickets = require('./tickets');
module.exports = (sequelize, DataTypes) => {
  class Tickets_commentaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Tickets, User}) {
      this.belongsTo(Tickets, {
        foreignKey: "ticket_id",
        as: "Ticket"
      });
      this.belongsTo(User, {
        foreignKey: "id",
        as: "CreatedByUser"
      });
    }
  }
  Tickets_commentaire.init({
    ticket_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Tickets_commentaire',
  });
  return Tickets_commentaire;
};