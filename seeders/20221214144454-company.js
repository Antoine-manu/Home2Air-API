'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Companies', [
			{
				user_id: 4,
				name: 'Bolot & Co',
				first_name: 'Thomas',
				last_name: 'Bolot',
				address: '70 rue des Jacobins',
				city: 'Amiens',
				zipcode: '80000',
				phone: '0102030405',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				user_id: 5,
				name: 'Disney',
				first_name: 'Cecilia',
				last_name: 'Ruin',
				address: '70 rue des Jacobins',
				city: 'Amiens',
				zipcode: '80000',
				phone: '0102030405',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Companies', null, {});
	}
};
