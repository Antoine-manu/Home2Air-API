const request = require('supertest');
const app = require('../server.js'); // replace this with the path to your app file
const probe = require('../controllers/probeController.js')

describe('Get all Users', () => {
	test('It should response the GET method', async () => {
		const response = await request(app).get('/probe');
		expect(response.statusCode).toBe(200);
	});
});