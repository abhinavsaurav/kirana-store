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

// Expects a response of id and response containing the payment details
router.post('/payment/:id/verify', authMiddleware, async (req, res, next) => {
	const _id = req.params.id;

	try {
		if (_id.length !== 24) {
			return res.status(400).send();
		}
		const order = await Order.findOne({ _id });

		console.log('order id');
		console.log(order.paymentOrder.id);
		console.log(typeof order.paymentOrder.id);

		let body =
			order.paymentOrder.orderId + '|' + req.body.response.razorpay_payment_id;

		console.log(body);

		var expectedSignature = await crypto
			.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
			.update(body.toString())
			.digest('hex');
		console.log('sig received ', req.body.response.razorpay_signature);
		console.log('sig generated ', expectedSignature);

		let response = { signatureIsValid: 'false' };

		if (expectedSignature === req.body.response.razorpay_signature) {
			order.isPaid = true;
			order.paidAt = new Date().toString();
			order.paymentResult = {
				id: req.body.response.razorpay_payment_id,
				status: 'success',
			};

			await order.save();
			response = { signatureIsValid: 'true', order: order };
		}

		res.send(response);
	} catch (err) {
		next(err);
	}
});

// @params payment, totalPrice
// router.post('/:id/pay', authMiddleware, async (req, res, next) => {
// 	const id = req.params.id;

// });

module.exports = router;
