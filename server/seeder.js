/**
 *
 * ! This file is to be carefully run as its just for seeding or destroying database
 *
 */

const mongoose = require('mongoose');
require('dotenv').config();

const users = require('./src/data/users'); // dummy data
const products = require('./src/data/products');
const User = require('./src/models/user');
const Product = require('./src/models/product');
const Order = require('./src/models/order');
require('./src/config/db');

const importData = async () => {
	// first deleting all the data from the models
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();

		const createdusers = await User.insertMany(users); // this return the users which will be created
		console.log(createdusers);

		const adminUser = createdusers[0]._id;
		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		await Product.insertMany(sampleProducts);

		console.log('Data imported');
		process.exit();
		// await User.save();
		// await Product.save();
	} catch (e) {
		console.log('Error' + e);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();

		console.log('Destroying data');
		process.exit();
	} catch (e) {
		console.log('Error caught: ' + e);
		process.exit(1);
	}
};

if (process.argv[2] === '--destroy') {
	destroyData();
} else {
	importData();
}
