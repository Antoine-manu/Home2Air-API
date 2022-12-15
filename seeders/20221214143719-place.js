'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Places', [
			{
				name: 'Maison Bongrand',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Appartement Bolot',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Maison Ruin',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Place', null, {});
	}
};
