const express = require('express');
const adminOrderRouter = require('./order');

const router = express.Router();

router.use('/orders', adminOrderRouter);

module.exports = router;
