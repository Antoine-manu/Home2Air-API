'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('notifications_sounds', [
			{
				name: 'Son 1',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Son 2',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Son 3',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Son 4',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('notifications_sounds', null, {});
	}
};
