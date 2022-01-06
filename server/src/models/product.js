const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		rating: {
			type: String,
			required: true,
		},
		comments: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			requried: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		image: {
			type: String, // using it as a string for now instead of directly storing
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		reviews: [reviewSchema],

		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			requried: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
		},
		countInStock: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Product = new mongoose.model('Product', productSchema);

module.exports = Product;
