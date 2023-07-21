const jwt = require('jsonwebtoken');
const tokenKey = 'k9zo6QGCjIWzpJ1H82yQ';

function auth(req, res, next) {
	const authHeader = req.headers['authorization'];
	let token = authHeader && authHeader.split(' ')[1];
	console.log(token);
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
