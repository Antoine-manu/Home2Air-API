exports.getAllRoles = async (req, res, next) => {
    try{
        return res.status(200).json({message : 'Tout est ok'});
    }
    catch(error){
        return res.status(500).json({message : 'nok', data : error})
    }
}