const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const products = await Product.find({});
		console.log('sending products data');
		res.send(products);
	} catch (e) {
		res.status(500).send();
	}
});

router.get('/:id', async (req, res, next) => {
	// should also add the isHexadecimal thing for body
	// console.log(req.params.id.length);
	if (req.params.id.length !== 24) {
		res.status(400);
		// throw new Error('400 bad request');
		return next();
		// return res.status(400).send();
	}
	try {
		// console.log(req.params.id);
		const product = await Product.findById(req.params.id);
		// console.log(product);
		if (!product) {
			res.status(404);
			throw new Error('404 Not found ');
			// return next();
			// return res.status(404).send();
		}
		res.send(product);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
