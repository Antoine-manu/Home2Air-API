const request = require('supertest');
const app = require('../server.js'); // replace this with the path to your app file
const User = require('../controllers/userController.js');
const jwt = require('jsonwebtoken')

describe('POST /user/find-all', () => {
	it('should return a list of users', async () => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJwYXNzd29yZCI6IiQyYiQwOCRjQVRmcmNQdzlZWThUNXphc3R1cGpPYW1Cdk5CQ2RpZ3lUenZxekRCZkdZSkR0Mi41ZzFhaSJ9LCJpYXQiOjE2Nzk0OTE3NjgsImV4cCI6MTY3OTU3ODE2OH0.q_6G0wL5_hDj7uAVuNHdTY_mbE79CZL2l6Ptv4Bt91g'; // replace with a valid JWT token
		const response = await request(app)
			.post('/user/find-all/')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body.length).toBeGreaterThan(0);
	});

	it('should return 401 when JWT token is not provided', async () => {
		const response = await request(app).post('/user/find-all/');
		expect(response.status).toBe(401);
	});

	it('should return 500 when an error occurs', async () => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJwYXNzd29yZCI6IiQyYiQwOCRjQVRmcmNQdzlZWThUNXphc3R1cGpPYW1Cdk5CQ2RpZ3lUenZxekRCZkdZSkR0Mi41ZzFhaSJ9LCJpYXQiOjE2Nzk0OTE3NjgsImV4cCI6MTY3OTU3ODE2OH0.q_6G0wL5_hDj7uAVuNHdTY_mbE79CZL2l6Ptv4Bt91g'; // replace with a valid JWT token
		jest.spyOn(User, 'findAll').mockImplementation(() => {
			throw new Error('Some error occurred while retrieving Users.');
		});
		const response = await request(app)
			.get('/user/find-all/10')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(404);
	});
});
