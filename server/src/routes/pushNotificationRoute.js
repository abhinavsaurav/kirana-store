const express = require('express');
const router = express.Router();
const {
	subscribe,
	sendPublicKey,
} = require('../controller/pushNotificationController');

router.post('/subscribe', subscribe);
router.get('/subscribe/key', sendPublicKey);

module.exports = router;
