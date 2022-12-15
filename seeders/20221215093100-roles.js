'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('roles', [
			{
				name: 'Admin',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Particulier',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Professionnel',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('roles', null, {});
	}
};
