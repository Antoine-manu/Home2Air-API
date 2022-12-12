'use strict';

const notifications_icon = require('../models/notifications_icon');
const notifications_sound = require('../models/notifications_sound');
const user = require('../models/user');

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
        type: Sequelize.INTEGER,
        references: {
          model: user,
          key: 'id'
        }
      },
      custom: {
        type: Sequelize.BOOLEAN
      },
      read: {
        type: Sequelize.BOOLEAN
      },
      type: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      title: {
        type: Sequelize.STRING
      },
      sound_id: {
        type: Sequelize.INTEGER,
        references: {
          model: notifications_sound,
          key: 'id'
        }
      },
      icon_id: {
        type: Sequelize.INTEGER,
        references: {
          model: notifications_icon,
          key: 'id'
        }
      },
      message: {
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
    await queryInterface.dropTable('Notifications');
  }
};