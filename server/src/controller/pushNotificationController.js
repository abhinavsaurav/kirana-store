const webpush = require('web-push');

const sendPublicKey = (req, res, next) => {
	try {
		if (process.env.VAPID_PUBLIC) {
			res.send({ publicKey: process.env.VAPID_PUBLIC });
		} else {
			res.status(500);
			throw new Error('Something is wrong!');
		}
	} catch (err) {
		next(err);
	}
};

const subscribe = (req, res, next) => {
	try {
		console.log(req.body);
		const subscription = req.body;
		if (Object.keys(subscription).length === 0) {
			throw new Error('No Subscription provided');
		}
		res.status(201).json({
			title: 'Subscription',
			body: 'You just subscribed to me',
		});

		// stringifying the payload
		const payload = JSON.stringify({
			title: 'Subscription',
			body: 'You just subscribed to me',
		});

		webpush.sendNotification(subscription, payload).catch(console.log);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	sendPublicKey,
	subscribe,
};
