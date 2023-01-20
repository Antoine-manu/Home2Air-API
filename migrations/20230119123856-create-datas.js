'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Datas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sensor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Sensors",
          key: 'id'
        }
      },
      ammoniac: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      humidity: {
        type: Sequelize.INTEGER
      },
      light: {
        type: Sequelize.INTEGER
      },
      oxidesed: {
        type: Sequelize.INTEGER
      },
      particules0: {
        type: Sequelize.INTEGER
      },
      particules1: {
        type: Sequelize.INTEGER
      },
      particules2: {
        type: Sequelize.INTEGER
      },
      pressure: {
        type: Sequelize.INTEGER
      },
      reduced: {
        type: Sequelize.INTEGER
      },
      temperature: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Datas');
  }
};