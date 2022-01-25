// Our redux store
// create
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import productSlice from './productSlice';

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		product: productSlice.reducer,
	},
});

export const authAction = authSlice.actions;
export default store;
