const express = require('express');
// require('express-group-routes');

const app = express();

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

try {
	app
		.use('/api/v1', require('./routes/routes'))
		.use('/api/v1', require('./routes/company'))
		.use('/api/v1', require('./routes/notifications'))
		.use('/api/v1', require('./routes/place'))
		.use('/api/v1', require('./routes/roles'))
		.use('/api/v1', require('./routes/room'))
		.use('/api/v1', require('./routes/routes'))
		.use('/api/v1', require('./routes/sensor'))
		.use('/api/v1', require('./routes/tickets'))
		.use('/api/v1', require('./routes/user'));

	app.listen(6500, () => console.log('Server started: 6500'));
} catch (error) {
	console.log('error', error);
}
