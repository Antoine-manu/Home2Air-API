const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
// const tokenKey = 'k9zo6QGCjIWzpJ1H82yQ';

function decryptPassword(encryptedPassword) {
	const bytes = CryptoJS.AES.decrypt(encryptedPassword, process.env.SECRET_KEY);
	const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

	return originalPassword;
}

/* Log user */
exports.login = (req, res) => {
	const tokenKey = process.env.SECRET_KEY;
	User.findOne({
		where: { email: req.body.email },
		attributes: ['id', 'password']
	})
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: 'Utilisateur non trouvé !' });
			}

			bcrypt
				.compare(decryptPassword(req.body.password), user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error: 'Mot de passe incorrect !' });
					}
					const id = user.id;
					res.status(200).json({
						userId: id,
						token: jwt.sign({ id }, tokenKey, { expiresIn: '24h' })
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
