'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Place}) {
      this.belongsTo(User, {
        foreignKey: "userFrom",
        as: "From"
      });
      this.belongsTo(User, {
        foreignKey: "userTo",
        as: "To"
      });
      this.belongsTo(Place, {
        foreignKey: "place_id",
        as: "Place"
      });
    }
  }
  Invites.init({
    userTo: DataTypes.INTEGER,
    userFrom: DataTypes.INTEGER,
    isAccpected: DataTypes.BOOLEAN,
    place_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Invites',
  });
  return Invites;
};