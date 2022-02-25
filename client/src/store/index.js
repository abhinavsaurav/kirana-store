// Our redux store
// create
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import productSlice from './productSlice';
import addressSlice from './checkout/addressSlice';
import paymentSlice from './checkout/paymentSlice';

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		product: productSlice.reducer,
		address: addressSlice.reducer,
		payment: paymentSlice.reducer,
	},
});

export const paymentAction = paymentSlice.actions;
export const authAction = authSlice.actions;
export default store;
