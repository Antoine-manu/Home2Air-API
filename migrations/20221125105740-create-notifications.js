'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      custom: {
        type: Sequelize.BOOLEAN
      },
      read: {
        type: Sequelize.BOOLEAN
      },
      type: {
        type: Sequelize.INTEGER,
        references: {
          model: "Notifications_types",
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING
      },
      sound_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Notifications_sounds",
          key: 'id'
        }
      },
      icon_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Notifications_icons",
          key: 'id'
        }
      },
      message: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Notifications');
  }
};