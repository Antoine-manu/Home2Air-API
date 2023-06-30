'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sensors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      reference: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      deleted_at: {
        type: Sequelize.BOOLEAN,
        default: 0
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      room_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Rooms",
          key: 'id'
        }
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: 'id'
        }
      },
      parameters: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Sensors');
  }
};