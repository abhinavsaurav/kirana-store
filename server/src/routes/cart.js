const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const cartMiddleware = require('../../middleware/cartMiddleware');
const Cart = require('../models/cart');

const router = express.Router();

router.get('/me', authMiddleware, cartMiddleware, (req, res, next) => {
	try {
		res.send(req.cart);
	} catch (err) {
		next(err);
	}
});

router.patch('/me', authMiddleware, cartMiddleware, async (req, res, next) => {
	const allowedUpdates = ['cartItems', 'totalAmount'];
	const updateKeys = Object.keys(req.body);
	const updateAllowed = updateKeys.every((key) => allowedUpdates.includes(key));

	if (!updateAllowed) {
		return res.status(400).send({ error: 'invalid update or req' });
	}

	try {
		updateKeys.forEach((key) => (req.cart[key] = req.body[key]));
		await req.cart.save();

		res.send(req.cart);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
