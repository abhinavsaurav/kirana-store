const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const cartMiddleware = require('../../middleware/cartMiddleware');
const Cart = require('../models/cart');

const router = express.Router();

// For getting the cart linked to a user
router.get('/me', authMiddleware, cartMiddleware, (req, res, next) => {
	try {
		res.send(req.cart);
	} catch (err) {
		next(err);
	}
});

// For performing update request on the cart
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
		req.status(401);
		next(err);
	}
});

// TODO Probably will be used by the ADMIN to see the cart items of a user
// BUt currently its just returning the cart data based off of the id
router.get('/:id', authMiddleware, async (req, res, next) => {
	try {
		// console.log(req.params.id);
		if (req.params.id.length !== 24 || !/[0-9a-fA-F]{24}/.test(req.params.id)) {
			res.status(400);
			throw new Error('Invalid Cart Id');
			// return next();
		}

		const _id = req.params.id;
		const cart = await Cart.findOne({ _id });

		if (!cart) {
			throw new Error('Cart not found');
		}

		res.send(cart);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
