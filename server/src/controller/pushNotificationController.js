const webpush = require('web-push');
const fs = require('fs');

const pushSubscriptionArray = [];

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
		const newSubscription = req.body;
		// need to add a case to stop the subscription if already present in array
		if (Object.keys(newSubscription).length === 0) {
			throw new Error('No Subscription provided');
		}

		let flag = true;
		pushSubscriptionArray.forEach((subscription) => {
			if (
				subscription.keys.auth === newSubscription.keys.auth &&
				subscription.keys.auth === newSubscription.keys.auth &&
				subscription.endpoint === newSubscription.endpoint
			) {
				flag = false;
			}
		});

		if (flag) {
			pushSubscriptionArray.push(newSubscription);
			res.status(201).json({
				title: 'Subscription',
				body: 'You just subscribed to me',
			});

			// stringifying the payload
			const payload = JSON.stringify({
				title: 'Subscription',
				body: 'You just subscribed to me',
			});

			webpush.sendNotification(newSubscription, payload).catch(console.log);
		} else {
			res.status(200);
			res.json({
				title: 'Already subscribed',
				body: 'Notification not sending as already subscribed',
			});
		}
	} catch (err) {
		next(err);
	}
};

// changes made to
const sendPushNotification = (req, res, next) => {
	try {
		// the object received from the user subscribing is being used to send
		// notification back to the user(basically its identifying the user).
		// Need to store this object in DB and update it when the user changes its browser
		// so as to maintain one subscription object
		// although this will be less trouble some if VAPID KEY is static across
		// server running instances
		const subscriptions = pushSubscriptionArray;
		console.log(pushSubscriptionArray);
		res.status(200).json({
			title: 'Push Notification',
			body: 'You have subscribed to me',
		});

		//custom message or payload needs to be provided
		const payload = JSON.stringify({
			title: 'Everything is at 0',
			body: 'You have subscribed to me',
		});

		// now it should send notification for each
		subscriptions.forEach((subscription) => {
			webpush
				.sendNotification(subscription, payload)
				.catch((err) => console.log(err));
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	sendPublicKey,
	sendPushNotification,
	subscribe,
};
