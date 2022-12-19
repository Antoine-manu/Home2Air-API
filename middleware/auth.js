const db = require('../models');
const User = db.User;
const jwt = require('jsonwebtoken');
const tokenKey = 'k9zo6QGCjIWzpJ1H82yQ'

function auth(req, res, next) {
	console.log('test')
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	
	if (token == null) return res.sendStatus(401)
	
	jwt.verify(token, tokenKey, (err, user) => {
		if (err) {
			return res.sendStatus(401)
		  }
		  req.user = user;
		  next();
	});
}

module.exports = auth

