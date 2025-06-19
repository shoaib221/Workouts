

const jwt = require('jsonwebtoken');
const { User } = require("../models/auth.js");


// header, pyload, signature
const requireAuth = async (req, res, next) => {
	
	const { authorization } = req.headers;

	try {
		if (!authorization) throw Error('Authorization token missing'); 
		const token = authorization.split(' ')[1]; 
		const { _id  } = jwt.verify(token, process.env.JWT_SECRET); 
		const ret = await User.findOne({_id}); 
		if( !ret ) throw Error("No such user"); 
		req.user_id = ret._id.toString(); 
		next(); 
	} catch (err) {
		console.log(err.message, "backend");
		res.status(401).json({error: err.message});
	}
}

module.exports = {requireAuth}
