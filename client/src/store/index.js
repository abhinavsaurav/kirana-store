// Our redux store
// create
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import productSlice from './productSlice';
import addressSlice from './checkout/addressSlice';
import paymentSlice from './checkout/paymentSlice';
import orderSlice from './checkout/orderSlice';

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		product: productSlice.reducer,
		address: addressSlice.reducer,
		payment: paymentSlice.reducer,
		order: orderSlice.reducer,
	},
});

export const orderDefaultAction = orderSlice.actions;
export const authAction = authSlice.actions;
export default store;
