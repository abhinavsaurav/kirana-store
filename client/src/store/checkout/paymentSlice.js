import { createSlice } from '@reduxjs/toolkit';

const payment = localStorage.getItem('paymentSelected');
const initialState = {
	paymentMethod: payment ?? '',
};

const paymentSlice = createSlice({
	name: 'payment',
	initialState,
	reducers: {
		setPaymentMethod(state, action) {
			state.paymentMethod = action.payload;
		},
	},
});

export default paymentSlice;
export const { setPaymentMethod } = paymentSlice.actions;
