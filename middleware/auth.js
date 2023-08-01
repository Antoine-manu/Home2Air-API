const jwt = require('jsonwebtoken');

function auth(req, res, next) {
	const tokenKey = process.env.SECRET_KEY;
	const authHeader = req.headers['authorization'];
	let token = authHeader && authHeader.split(' ')[1];
	console.log('token --- ', token);
	if (!token) return res.sendStatus(401);

	jwt.verify(token, tokenKey, (err, user) => {
		if (err) {
			console.log('err', err);
			return res.sendStatus(401);
		}
		// console.log('user', user);
		req.user = user;
		next();
	});
}

module.exports = auth;
