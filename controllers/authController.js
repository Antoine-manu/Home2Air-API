const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/* Log user */
exports.login = (req, res) => {
	const token = req.body.token

	User.findOne({where :{ email: req.body.email }, attributes: ['id', 'password']})
	.then(user => {
		if (!user) {
			return res.status(401).json({ error: 'Utilisateur non trouvé !' });
		}
		bcrypt.compare(req.body.password, user.password)
			.then(valid => {
				if (!valid) {
					return res.status(401).json({ error: 'Mot de passe incorrect !' });
				}
				res.status(200).json({
					userId: user.id,
					token: jwt.sign(
						{ userId: user.id },
							'k9zo6QGCjIWzpJ1H82yQ',
						{ expiresIn: '24h' }
					)
				});
			})
			.catch(error => res.status(500).json({ error }));
	})
	.catch(error => res.status(500).json({ error }));

	// jwt.verify(token, 'k9zo6QGCjIWzpJ1H82yQ', (err, user) => {
	// 	if (err) {
	// 		return res.sendStatus(401).json({error: "Token incorrect"})
	// 	}
	// 	else{
	// 		req.user = user;
	// 		next();
	// 	}
	// });
	
}
