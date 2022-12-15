'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Rooms', [
			{
				name: 'Cuisine',
				place_id: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Garage',
				place_id: 2,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Salle à manger',
				place_id: 3,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Chambres',
				place_id: 2,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Rooms', null, {});
	}
};
