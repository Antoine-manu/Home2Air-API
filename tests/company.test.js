const request = require('supertest');
const app = require('../server.js'); // replace this with the path to your app file
const company = require('../controllers/companyController.js')

describe('Get all Companies', () => {
	test('It should response the GET method', async () => {
		const response = await request(app).get('/company/find-all');
		expect(response.statusCode).toBe(200);
	});
});