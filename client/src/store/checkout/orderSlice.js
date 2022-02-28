import { createSlice } from '@reduxjs/toolkit';
import { IDLE, LOADING, ERROR, SUCCESS } from '../../data/constants';
import { createOrder } from './orderActions';

const initialState = {
	orderId: '',
	isPaid: '',
	isDelivered: '',
	user: '',
	cart: [],
	address: {},
	paymentMethod: '',
	paymentOrder: {},
	price: {},
	orderedAt: '',
	isModifiedAt: '',
	status: IDLE,
	error: null,
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	extraReducers: {
		[createOrder.pending]: (state, action) => {
			state.status = LOADING;
		},
		[createOrder.fulfilled]: (state, action) => {
			const {
				_id,
				user,
				orderItems,
				shippingAddress,
				paymentMethod,
				paymentOrder,
				taxPrice,
				shippingPrice,
				totalPrice,
				createdAt,
				updatedAt,
				isPaid,
				isDelivered,
			} = action.payload;

			state.orderId = _id;
			state.user = user;
			state.cart = orderItems;
			state.address = shippingAddress;
			state.paymentMethod = paymentMethod;
			state.paymentOrder = paymentOrder;
			state.price = {
				taxed: taxPrice,
				shipping: shippingPrice,
				total: totalPrice,
			};
			state.orderedAt = createdAt;

			state.isPaid = isPaid;
			state.isDelivered = isDelivered;
			state.isModifiedAt = updatedAt;

			state.status = SUCCESS;
		},
		[createOrder.rejected]: (state, action) => {
			state.status = ERROR;
			state.error = action.payload;
		},
	},
});

export default orderSlice;
