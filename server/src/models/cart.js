const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User', // Linking the cart to the user
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0,
		},
		totalQty: {
			type: Number,
			required: true,
			default: 0.0,
		},
		cartItems: [
			{
				id: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
				name: {
					type: String,
					required: true,
				},
				qty: { type: Number, required: true }, // this refers to qty
				image: { type: String, required: true }, // Storing the image as a string for now
				altImage: [
					{
						id: {
							type: Number,
						},
						download_url: {
							type: String,
							required: true,
						},
						author: {
							type: String,
							required: true,
							default: 'Anonymous',
						},
					},
				],
				price: {
					type: Number,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

cartSchema.statics.findCartByUserId = async function (owner) {
	const cart = Cart.findOne({ owner });

	if (!cart) {
		// We should create a cart with the id but since the cart is always created on user creation
		throw new Error('Cart not present. Something is wrong!');
	}

	return cart;
};

cartSchema.methods.toJSON = function () {
	const cart = this;

	const cartObjects = cart.toObject();

	delete cartObjects.createdAt;
	delete cartObjects.updatedAt;

	return cartObjects;
};

const Cart = new mongoose.model('Cart', cartSchema);

module.exports = Cart;
