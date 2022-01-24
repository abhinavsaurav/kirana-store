const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/users', async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();

		const token = await user.generateAuthToken();

		// TODO add the mail functionality here
		console.log('1 ' + user);
		console.log(token);
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(500).send(e);
	}
});

router.post('/users/login', async (req, res) => {
	console.log(req.body);
});

module.exports = router;
