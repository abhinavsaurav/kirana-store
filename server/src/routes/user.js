const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const User = require('../models/user');
const Cart = require('../models/cart');

const router = express.Router();

// Create user
router.post('/', async (req, res) => {
	const user = new User(req.body);
	const cart = new Cart({ owner: user._id });
	try {
		await user.save();
		await cart.save();
		const token = await user.generateAuthToken();
		// TODO add the mail functionality here
		res.status(201).send({ user, token, cart_id: cart._id });
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

		const cart = await Cart.findCartByUserId(user._id);

		// overriding the default cart response
		const cartObj = cart.toObject();
		delete cartObj.owner;
		delete cartObj.createdAt;
		delete cartObj.updatedAt;

		res.send({ user, token, cart: cartObj });
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

// Delete the user account and cart
router.delete('/me', authMiddleware, async (req, res, next) => {
	try {
		const cart = await Cart.findCartByUserId(req.user._id);
		console.log(cart);
		await cart.remove();
		await req.user.remove();

		res.send();
		// res.send({ user: req.user, cart });
	} catch (err) {
		// res.status(500);
		next(err);
	}
});

module.exports = router;
