// Our redux store
// create
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import productSlice from './productSlice';
import addressSlice from './checkout/addressSlice';

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		product: productSlice.reducer,
		address: addressSlice.reducer,
	},
});

export const authAction = authSlice.actions;
export default store;
