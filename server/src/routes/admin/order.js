const express = require('express');
const {
	authMiddleware,
	adminMiddleware,
} = require('../../../middleware/authMiddleware');
const {
	countPaidUnpaidOrder,
	totalMonthlyOrder,
} = require('../../controller/chartController');

const router = express.Router();

router.get(
	'/chart/paid-unpaid',
	authMiddleware,
	adminMiddleware,
	countPaidUnpaidOrder
);

router.get(
	'/chart/monthly-total',
	authMiddleware,
	adminMiddleware,
	totalMonthlyOrder
);

module.exports = router;
