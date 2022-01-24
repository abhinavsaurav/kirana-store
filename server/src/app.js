const express = require('express');
const {
	routeNotFound,
	errorHandler,
} = require('../middleware/errorMiddleware');

require('./config/db');

const app = express();
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

// for parsing req body - json
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Kirana-store-api working!');
});

app.use(userRouter);
app.use('/products', productRouter);

app.use(routeNotFound);
app.use(errorHandler);

module.exports = app;
