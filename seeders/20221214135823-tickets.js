'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Tickets', [
			{
				createdAt: new Date(),
				created_by: 4,
				updatedAt: new Date(),
				updated_by: 1,
				status: 2,
				title: 'alède'
			},
			{
				createdAt: new Date(),
				created_by: 3,
				updatedAt: new Date(),
				updated_by: 2,
				status: 1,
				title: 'help !!'
			},
			{
				createdAt: new Date(),
				created_by: 3,
				updatedAt: new Date(),
				updated_by: 1,
				status: 1,
				title: 'problème'
			},
			{
				createdAt: new Date(),
				created_by: 5,
				updatedAt: new Date(),
				updated_by: 2,
				status: 1,
				title: 'ça marche pas'
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Tickets', null, {});
	}
};
