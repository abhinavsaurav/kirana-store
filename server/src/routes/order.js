const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const Order = require('../models/order');

const router = express.Router();

router.post('/', authMiddleware, async (req, res, next) => {
	try {
		const order = new Order({
			user: req.user._id,
			orderItems: req.body.cart,
			shippingAddress: req.body.address,
			paymentMethod: req.body.paymentMethod,
			taxPrice: req.body.price.taxed,
			shippingPrice: req.body.price.shipping,
			totalPrice: req.body.price.total,
		});

		await order.save();

		req.send(order);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', authMiddleware, async (req, res, next) => {
	if (req.params.id.length !== 24) {
		res.status(400);
		return next();
	}
	try {
		const order = await Order.findById(req.params.id);
		if (!order) {
			res.status(404);
			throw new Error('404 Not found ');
		}

		req.send(order);
	} catch (err) {
		next(err);
	}
});

// @params payment, totalPrice
router.post('/:id/pay', authMiddleware, async (req, res, next) => {
	const id = req.params.id;

	if (req.body.payment === 'Razorpay') {
		// TODO explicitly stating the payment to INR and converting it paisa
		const priceInPaisa = parseFloat(req.body.totalPrice) * 100;

		const instance = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID,
			key_secret: process.env.RAZORPAY_KEY_SECRET,
		});

		var options = {
			amount: priceInPaisa, // amount in the smallest currency unit
			currency: req.body.currency || 'INR',
			receipt: req.params.id || 'order_receipt_not_working',
		};
		const response = await instance.orders.create(
			options,
			function (err, order) {
				console.log(order);
			}
		);

		res.send(response);
	}
});

module.exports = router;
