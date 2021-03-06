const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			requried: true,
			ref: 'User',
		},
		orderItems: [
			{
				name: {
					type: String,
					required: true,
				},
				qty: { type: Number, required: true },
				image: { type: String, required: true }, // Storing the image as a string for now
				price: {
					type: String,
					required: true,
				},
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product', // Linking to the product collection
				},
			},
		],
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			pin: { type: Number, required: true },
			country: { type: String, required: true },
			phone: { type: String, required: true },
			fullName: { type: String, required: true },
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		paymentOrder: {
			// should be applicable for tracking at the server side things
			id: { type: String },
			orderId: { type: String },
			notes: [{ type: String }],
			amount: { type: Number },
			amount_paid: { type: Number },
			amount_due: { type: Number },
			currency: { type: String },
			created_at: { type: Date },
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: {
				type: Date,
				default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
			},
			email_address: { type: String },
		},
		taxPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		shippingPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: String,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const Order = new mongoose.model('Order', orderSchema);

module.exports = Order;
