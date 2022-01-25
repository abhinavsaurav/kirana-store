const jwt = require('jsonwebtoken');
const User = require('../src/models/user');

const authMiddleware = async (req, res, next) => {
	try {
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

module.exports = authMiddleware;
