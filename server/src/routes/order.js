const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const crypto = require('crypto');

const Razorpay = require('razorpay');

const Order = require('../models/order');

const router = express.Router();

const razorInstance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/', authMiddleware, async (req, res, next) => {
	try {
		const unique_payment_id = crypto.randomBytes(16).toString('hex');
		console.log(unique_payment_id);

		// console.log(order._id);
		// console.log(order.paymentMethod);

		if (req.body.paymentMethod === 'Razorpay') {
			// TODO explicitly stating the payment to INR and converting it paisa
			const priceInPaisa = parseFloat(req.body.price.total) * 100;

			var razorOptions = {
				amount: parseInt(priceInPaisa), // amount in the smallest currency unit
				currency: 'INR', //req.body.currency ||
				receipt: unique_payment_id,
			};

			razorInstance.orders
				.create(razorOptions)
				.then(
					async ({
						entity,
						amount,
						amount_paid,
						amount_due,
						currency,
						notes,
						created_at,
						...data
					}) => {
						if (data.id) {
							console.log(data.id);
						}
						const order = new Order({
							user: req.user._id,
							orderItems: req.body.cart,
							shippingAddress: req.body.address,
							paymentMethod: req.body.paymentMethod,
							taxPrice: req.body.price.taxed,
							shippingPrice: req.body.price.shipping,
							totalPrice: req.body.price.total,
							paymentOrder: {
								id: unique_payment_id,
								orderId: data.id,
								notes,
								amount,
								amount_paid,
								amount_due,
								currency,
								created_at,
							},
						});

						await order.save();
						res.status(201).send(order);
					}
				)
				.catch((err) => {
					throw new Error(err);
				});
		}

		// res.send({ error: 'payment method not supported' });
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

		res.send(order);
	} catch (err) {
		next(err);
	}
});

// @params payment, totalPrice
// router.post('/:id/pay', authMiddleware, async (req, res, next) => {
// 	const id = req.params.id;

// });

module.exports = router;
