const express = require('express');
const cors = require('cors');
const path = require('path');

const {
	routeNotFound,
	errorHandler,
} = require('../middleware/errorMiddleware');

require('./config/db');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const adminRouter = require('./routes/admin/index');

const { authMiddleware } = require('../middleware/authMiddleware');

const app = express();

app.use(cors());

// for parsing req body - json
app.use(express.json());

console.log(path.join(__dirname + '/../../client/build'));
app.use(express.static(path.join(__dirname + '/../../client/build')));

app.get('/', (req, res) => {
	res.render('index.html');
});

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);
app.use('/orders', orderRouter);
app.use('/admin', adminRouter);

// SENDING PRIVATE KEY_ID
app.post('/config/razorpay', authMiddleware, (req, res, next) => {
	try {
		res.send({ key_id: process.env.RAZORPAY_KEY_ID });
	} catch (err) {
		next(err);
	}
});

app.use(routeNotFound);
app.use(errorHandler);

module.exports = app;
