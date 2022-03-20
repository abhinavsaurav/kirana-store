const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const cartMiddleware = require('../../middleware/cartMiddleware');
const Cart = require('../models/cart');
// const chalk = require('chalk');

const router = express.Router();

// For getting the cart linked to a user
router.get('/me', authMiddleware, cartMiddleware, (req, res, next) => {
	try {
		res.send(req.cart);
	} catch (err) {
		next(err);
	}
});

router.post('/me', authMiddleware, cartMiddleware, async (req, res, next) => {
	try {
		const data = req.body.cartItems;

		if (req.cart.cartItems.length === 0) {
			// * When cart is empty on login and there are cartItems
			req.cart.cartItems = data;
		} else {
			// * Cart items when there
			// ! Need to improve time complexity here or atleast use the for loop instead of foreach
			req.body.cartItems.forEach((newItem) => {
				let flag = false;
				req.cart.cartItems.forEach((item) => {
					// console.log(item.qty + ' ' + newItem.qty);
					if (newItem.id === item.id.toString()) {
						flag = true;
						item.qty += +newItem.qty;
					}
				});

				if (!flag) {
					// console.log('onFlag' + newItem);
					req.cart.cartItems.push(newItem);
				}
			});
		}

		// * Total Price after merge
		const totalPrice = await req.cart.calculateTotalPrice();

		// * Total Quantity after merge
		const totalQty = await req.cart.calculateTotalQuantity();

		req.cart.totalQty = parseFloat(totalQty);
		req.cart.totalPrice = parseFloat(totalPrice);
		await req.cart.save();

		// Mergin the cart data up and then taking and sending the data back
		const populatedData = await Cart.populateProduct(req.cart.owner);

		res.send(populatedData);
	} catch (err) {
		next(err);
	}
});

router.delete(
	'/me/:itemid',
	authMiddleware,
	cartMiddleware,
	async (req, res, next) => {
		try {
			const itemid = req.params.itemid;
			// console.log(typeof itemid);
			req.cart.cartItems = req.cart.cartItems.filter(
				(item) => item.id.toString() !== itemid
			);
			// console.log(req.cart.cartItems);

			// * Total Price after deletion
			const totalPrice = await req.cart.calculateTotalPrice();

			// * Total Quantity after deletion
			const totalQty = await req.cart.calculateTotalQuantity();

			req.cart.totalQty = parseFloat(totalQty);
			req.cart.totalPrice = parseFloat(totalPrice);

			await req.cart.save();
			res.send();
		} catch (err) {
			next(err);
		}
	}
);

// for deleting all items
router.delete(
	'/me/',
	authMiddleware,
	cartMiddleware,
	async (req, res, next) => {
		try {
			req.cart.cartItems = [];
			req.cart.totalQty = 0;
			req.cart.totalPrice = 0;

			await req.cart.save();
			res.send();
		} catch (err) {
			next(err);
		}
	}
);

// ! Incomplete
// For performing update request on the cart items
// TODO For performing a request to cart item
router.patch(
	'/me/:itemid',
	authMiddleware,
	cartMiddleware,
	async (req, res, next) => {
		const allowedUpdates = ['cartItems', 'totalAmount'];
		const updateKeys = Object.keys(req.body);
		const updateAllowed = updateKeys.every((key) =>
			allowedUpdates.includes(key)
		);

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
	}
);

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
