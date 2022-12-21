'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications_configs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.STRING
      },
      percent: {
        type: Sequelize.INTEGER
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
      type: {
        type: Sequelize.INTEGER,
        references: {
          model: "Notifications_types",
          key: 'id'
        }
      },
      message: {
        type: Sequelize.TEXT
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: 'id'
        }
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
    await queryInterface.dropTable('Notifications_configs');
  }
};