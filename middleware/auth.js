const db = require('../models');
const User = db.User;
const jwt = require('jsonwebtoken');
const tokenKey = 'k9zo6QGCjIWzpJ1H82yQ'

function auth(req, res, next) {
	const authHeader = req.headers['authorization']
	let token = authHeader && authHeader.split(' ')[1]
	console.log(req.params.token)
	if (req.params?.token){
		token = req.params.token;
		console.log(token)
	}

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

