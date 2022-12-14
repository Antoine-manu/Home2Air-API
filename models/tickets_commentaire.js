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
    static associate({Tickets, USer}) {
      this.belongsTo(Tickets, {
        foreignKey: "ticket_id",
        as: "Ticket"
      });
      this.hasOne(User, {
        foreignKey: "id",
        as: "User"
      });
    }
  }
  Tickets_commentaire.init({
    ticket_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    user_id: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Tickets_commentaire',
  });
  return Tickets_commentaire;
};