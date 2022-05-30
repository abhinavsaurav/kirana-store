const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../../middleware/authMiddleware');

const {
	orderCreation,
	getOrderById,
	verifyPayment,
} = require('../controller/orderController');

// Get Order by ID
router.get('/:id', authMiddleware, getOrderById);

// Order creation
router.post('/', authMiddleware, orderCreation);
router.post('/payment/:id/verify', authMiddleware, verifyPayment);

module.exports = router;
