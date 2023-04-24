const request = require('supertest');
const app = require('../server.js'); // replace this with the path to your app file
const place = require('../controllers/placeController.js')

describe('Get all Roles', () => {
	test('It should response the GET method', async () => {
		const response = await request(app).get('/place/find-all');
		expect(response.statusCode).toBe(200);
	});
});