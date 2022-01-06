const express = require('express');
const app = express();
const Product = require('./models/product');
require('./config/db');

app.get('/', (req, res) => {
	res.send('Kirana-store-api working!');
});

app.get('/products', async (req, res) => {
	try {
		const products = await Product.find({});
		console.log('sending products data');
		res.send(products);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = app;
