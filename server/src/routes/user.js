const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const User = require('../models/user');
const router = express.Router();

// Create user
router.post('/', async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();

		const token = await user.generateAuthToken();

		// TODO add the mail functionality here

		res.status(201).send({ user, token });
	} catch (e) {
		res.status(500).send(e);
	}
});

//login user
router.post('/login', async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.findByCredentials(email, password);

		const token = await user.generateAuthToken();

		res.send({ user, token });
	} catch (err) {
		res.status(401);
		return next(err);
	}
});

// logout user
router.post('/logout', authMiddleware, async (req, res, next) => {
	try {
		req.user.tokens = await req.user.tokens.filter(
			(tokens) => tokens.token !== req.token
		);

		await req.user.save();
		res.send();
	} catch (err) {
		next(err);
	}
});

// logout user from all devices
router.post('/logoutAll', authMiddleware, async (req, res, next) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (err) {
		next();
	}
});

module.exports = router;
