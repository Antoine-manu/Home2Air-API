const db = require('../models');
const User = db.User;
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
          User.findOne({where :{ id: user.user.id }, attributes: ['role_id']})
	        .then(user => {
                if(user.role_id != 2){
                    return res.sendStatus(401)
                }
                next();
            })
            .catch(error => res.status(500).json({ error , message : 'Probleme user find', user: user.user}));
	});
}

module.exports = adminCheck
