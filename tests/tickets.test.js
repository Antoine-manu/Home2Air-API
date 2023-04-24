const request = require('supertest');
const app = require('../server.js'); // replace this with the path to your app file
const tickets = require('../controllers/ticketsController.js')

describe('Get all Tickets', () => {
	test('It should response the GET method', async () => {
		const response = await request(app).get('/tickets/find-all');
		expect(response.statusCode).toBe(200);
	});
});