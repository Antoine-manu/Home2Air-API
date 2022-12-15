'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Tickets_commentaires', [
			{
				ticket_id: 1,
				content: "j'ai pas compris",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				ticket_id: 1,
				content: "j'ai vraiment pas compris",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				ticket_id: 2,
				content: 'ça marche super bien merci',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				ticket_id: 2,
				content: 'Comment on fait ?',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				ticket_id: 2,
				content: 'juste pour le test',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Tickets_commentaires', null, {});
	}
};
