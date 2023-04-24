const request = require('supertest');
const app = require('../server.js'); // replace this with the path to your app file
const notifications = require('../controllers/notificationsController.js')

describe('Get all Notifications', () => {
	test('It should response the GET method', async () => {
		const response = await request(app).get('/notifications/find-all');
		expect(response.statusCode).toBe(200);
	});
});