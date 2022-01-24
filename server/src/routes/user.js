const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/users', async (req, res) => {
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

router.post('/users/login', async (req, res, next) => {
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

module.exports = router;
