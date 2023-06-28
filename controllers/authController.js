const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const tokenKey = 'k9zo6QGCjIWzpJ1H82yQ';
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
				const id = user.id
				res.status(200).json({
					userId: id,
					token: jwt.sign(
						{id},
						tokenKey,
						{ expiresIn: '24h' }
					)
				});
			})
			.catch(error => res.status(500).json({ error }));
	})
	.catch(error => res.status(500).json({ error }));	
}