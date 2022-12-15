const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const tokenKey = 'k9zo6QGCjIWzpJ1H82yQ'

function auth(req, res, next) {
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


function adminCheck(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) return res.sendStatus(401)
	
	jwt.verify(token, tokenKey, (err, user) => {
		if (err) {
			return res.sendStatus(401)
		  }
		  req.user = user;
          if(user.role != 2){
              return res.sendStatus(401)
          }
		  next();
	});
}

module.exports = adminCheck
