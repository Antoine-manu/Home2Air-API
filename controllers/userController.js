exports.getAllUsers = async (req, res, next) => {
	try{
        return res.status(200).json({message : 'Tout est ok user'});
    }
    catch(error){
        return res.status(500).json({message : 'nok', data : error})
    }
	// User.find()
	// 	.then(users => {
	// 		// res.status(200).json(users);
	// 	})
	// 	.catch(error => {
	// 		res.status(400).json({
	// 			error: error
	// 		});
	// 	});
};
