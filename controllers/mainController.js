


exports.getHome = async (req, res, next) => {
	try {
		return res.status(200).json({ message: 'Tout est ok' });
	} catch (error) {
		return res.status(500).json({ message: 'not ok', data: error });
	}
};
