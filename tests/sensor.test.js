const request = require('supertest');
const app = require('../server.js'); // replace this with the path to your app file
const sensor = require('../controllers/sensorController.js')

describe('Get all Sensors', () => {
	test('It should response the GET method', async () => {
		const response = await request(app).get('/sensor/find-all');
		expect(response.statusCode).toBe(200);
	});
});