const jwt = require('jsonwebtoken');
const User = require('../src/models/user');

const authMiddleware = async (req, res, next) => {
	try {
		// console.log(req.headers.authorization);
		if (!req.headers.authorization) {
			throw new Error('Please authenticate');
		}

		// get the token to verify the id
		const token = await req.headers['authorization'].replace('Bearer ', '');
		const _id_decoded = await jwt.verify(token, process.env.JWT_SECRET);

		// search for them
		const user = await User.findOne({
			_id: _id_decoded,
			'tokens.token': token,
		});

		// if found
		if (!user) {
			throw new Error('Please authenticate');
		}

		// Otherwise attach the user and the token to req and pass it to route handler
		// to avoid another db req
		req.user = user;
		req.token = token;
		next();
	} catch (err) {
		res.status(401);
		next(err);
	}
};

const adminMiddleware = async (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(403);
		throw new Error('Not Authorized as a Admin');
	}
};

module.exports = { authMiddleware, adminMiddleware };
