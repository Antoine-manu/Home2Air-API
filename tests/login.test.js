const request = require('supertest');
const app = require('./../server.js');
const User = require('../controllers/userController.js');
const authController = require('../controllers/authController');

describe('POST /auth/login', () => {
	it('should return a JWT token when login is successful', async () => {
		const response = await request(app).post('/auth/login').send({
			email: 'Daveloper@test.com',
			password: 'test'
		});
		expect(response.status).toBe(200);
		expect(response.body.token).toBeTruthy();
		expect(response.body.userId).toBeTruthy();
	});

	it('should return 401 when email is incorrect', async () => {
		const response = await request(app).post('/auth/login').send({
			email: 'wrong@example.com',
			password: 'test'
		});
		expect(response.status).toBe(401);
		expect(response.body.error).toBe('Utilisateur non trouvé !');
	});

	it('should return 401 when password is incorrect', async () => {
		const response = await request(app).post('/auth/login').send({
			email: 'Daveloper@test.com',
			password: 'wrongpassword'
		});
		expect(response.status).toBe(401);
		expect(response.body.error).toBe('Mot de passe incorrect !');
	});

	it('should return 500 when an error occurs', async () => {
		jest.spyOn(User, 'findOneById').mockImplementation(() => {
			throw new Error();
		});
		const response = await request(app).post('/auth/login').send({
			email: 'test@example.com',
			password: 'password'
		});
		expect(response.status).toBe(404);
	});
});
