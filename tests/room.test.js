const request = require('supertest');
const app = require('../server.js'); // replace this with the path to your app file
const Room = require('../controllers/roomController.js');
const jwt = require('jsonwebtoken');

describe('Get all Rooms', () => {
	test('It should response the GET method', async () => {
		const response = await request(app).get('/room/find-all');
		expect(response.statusCode).toBe(200);
	});
});

describe('GET /rooms/:id', () => {
	it('should return a room by its ID', async () => {
		const testRoom = await Room.create({
			id_room: 1,
			name: 'test',
			sensor_id: 1,
			place_id: 1
		});

		const response = await request(app)
			.get(`/rooms/${testRoom.id}`)
			.set(
				'Authorization',
				`Bearer ${jwt.sign(
					{
						id_user: 2,
						username: 'TEST'
					},
					'test_key'
				)}`
			);

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			id_room: testRoom.id_room,
			name: testRoom.name,
			sensor_id: testRoom.sensor_id,
			place_id: testRoom.place_id,
			createdAt: expect.any(String),
			updatedAt: expect.any(String)
		});
	});
});
