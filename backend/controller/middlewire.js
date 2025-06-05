

const jwt = require('jsonwebtoken');
const { User } = require("../models/auth.js");

// header, pyload, signature
const requireAuth = async (req, res, next) => {
	
	const { authorization } = req.headers;
	
	if (!authorization) {
		return res.status(401).json({error: 'Authorization token required'});
	}

	const token = authorization.split(' ')[1];

	try {
		const { _id } = jwt.verify(token, process.env.SECRET);
		const ret = await User.findOne({_id});
		if( !ret ) throw Error("No such user");
		req.user_id = ret._id;
		next();
	} catch (err) {
		console.log("unauthorized");
		res.status(401).json({error: 'Request is not authorized'});
	}
}

module.exports = {requireAuth}
