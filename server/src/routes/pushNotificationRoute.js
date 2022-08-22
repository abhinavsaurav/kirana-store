const express = require('express');
const router = express.Router();
const {
	subscribe,
	sendPublicKey,
	sendPushNotification,
} = require('../controller/pushNotificationController');

router.post('/subscribe', subscribe);
router.get('/subscribe/key', sendPublicKey);
router.post('/sendmessage', sendPushNotification);

module.exports = router;
