'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Sensors', [
			{
				name: 'Salon',
				active: 1,
				createdAt: new Date(),
				createdBy: 3,
				updatedAt: new Date(),
				room_id: 2,
				parameters: ''
			},
			{
				name: 'Salle à manger',
				createdAt: new Date(),
				createdBy: 4,
				active: 1,
				updatedAt: new Date(),
				room_id: 4,
				parameters: ''
			},
			{
				name: 'Cuisine',
				createdAt: new Date(),
				createdBy: 5,
				active: 1,
				updatedAt: new Date(),
				room_id: 2,
				parameters: ''
			},
			{
				name: 'Chambre enfants',
				createdAt: new Date(),
				createdBy: 4,
				active: 0,
				updatedAt: new Date(),
				room_id: 3,
				parameters: ''
			},
			{
				name: 'Garage',
				createdAt: new Date(),
				createdBy: 5,
				active: 1,
				updatedAt: new Date(),
				room_id: 2,
				parameters: ''
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Sensors', null, {});
	}
};
