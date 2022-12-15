'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Notifications', [
			{
				user_id: 3,
				custom: 0,
				read: 0,
				type: 1,
				date: new Date(),
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				user_id: 4,
				custom: 0,
				read: 0,
				type: 2,
				date: new Date(),
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				user_id: 5,
				custom: 0,
				read: 0,
				type: 3,
				date: new Date(),
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Notifications', null, {});
	}
};
