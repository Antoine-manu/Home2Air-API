'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('User_place_lists', [
			{
				user_id: 1,
				place_id: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				user_id: 2,
				place_id: 2,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				user_id: 3,
				place_id: 3,
				createdAt: new Date(),
				updatedAt: new Date()
			}			
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('User_place_lists', null, {});
	}
};
