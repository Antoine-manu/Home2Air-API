'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Users', [
			{
				username: 'aGaudry',
				first_name: 'Antoine',
				last_name: 'GAudry',
				email: 'agaudry@gmail.com',
				role_id: 1,
				token: null,
				createdAt: new Date(),
				updatedAt: new Date(),
				active: 1
			},
			{
				username: 'lMagny',
				first_name: 'Loïc',
				last_name: 'Magny',
				email: 'lmagny@gmail.com',
				role_id: 1,
				token: null,
				createdAt: new Date(),
				updatedAt: new Date(),
				active: 1
			},
			{
				username: 'gBongrand',
				first_name: 'Guillaume',
				last_name: 'Bongrand',
				email: 'gbongrand@gmail.com',
				role_id: 2,
				token: null,
				createdAt: new Date(),
				updatedAt: new Date(),
				active: 0
			},
			{
				username: 'tBolot',
				first_name: 'Thomas',
				last_name: 'Bolot',
				email: 'tbolot@gmail.com',
				role_id: 2,
				token: null,
				createdAt: new Date(),
				updatedAt: new Date(),
				active: 0
			},
			{
				username: 'cRuin',
				first_name: 'Cecilia',
				last_name: 'Ruin',
				email: 'cruin@gmail.com',
				role_id: 3,
				token: null,
				createdAt: new Date(),
				updatedAt: new Date(),
				active: 1
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
