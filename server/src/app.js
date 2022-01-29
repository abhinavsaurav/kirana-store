const express = require('express');
const cors = require('cors');

const {
	routeNotFound,
	errorHandler,
} = require('../middleware/errorMiddleware');

require('./config/db');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');

const app = express();

app.use(cors());

// for parsing req body - json
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Kirana-store-api working!');
});

app.use('/users', userRouter);
app.use('/products', productRouter);

app.use(routeNotFound);
app.use(errorHandler);

module.exports = app;
