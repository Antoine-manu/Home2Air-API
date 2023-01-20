'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Datas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Sensor}) {
      this.belongsTo(Sensor, {
        foreignKey: "id",
        as: "Capteur"
      });
    }
  }
  Datas.init({
    reference: DataTypes.STRING,
    ammoniac: DataTypes.INTEGER,
    date: DataTypes.DATE,
    humidity: DataTypes.INTEGER,
    light: DataTypes.INTEGER,
    oxidesed: DataTypes.INTEGER,
    particules0: DataTypes.INTEGER,
    particules1: DataTypes.INTEGER,
    particules2: DataTypes.INTEGER,
    pressure: DataTypes.INTEGER,
    reduced: DataTypes.INTEGER,
    temperature: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Datas',
  });
  return Datas;
};