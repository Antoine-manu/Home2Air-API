const request = require('supertest');
const app = require('../server.js'); // replace this with the path to your app file
const invite = require('../controllers/inviteController.js')

describe('Get all Invites', () => {
	test('It should response the GET method', async () => {
		const response = await request(app).get('/invite/find-all');
		expect(response.statusCode).toBe(200);
	});
});