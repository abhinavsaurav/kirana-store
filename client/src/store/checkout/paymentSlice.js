import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	paymentMethod: 'Paypal',
};

const paymentSlice = createSlice({
	name: 'payment',
	initialState,
	reducers: {
		setPaymentMethod(state, action) {
			return { paymentMethod: action.payload.paymentMethod, ...state };
		},
	},
});

export default paymentSlice;
