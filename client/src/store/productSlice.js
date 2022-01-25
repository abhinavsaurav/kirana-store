import { createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProduct } from './productActions';

const initialState = {
	products: [],
	activeProduct: {},
	status: 'idle',
	error: null,
};

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: {
		// listening for the thunk created actions here
		[fetchProduct.pending]: (state, action) => {
			state.status = 'loading';
		},
		[fetchProduct.fulfilled]: (state, action) => {
			state.status = 'idle';
			state.activeProduct = action.payload;
		},
		[fetchProduct.rejected]: (state, action) => {
			state.status = 'error';
		},
		[fetchAllProducts.pending]: (state, action) => {
			state.status = 'loading';
		},
		[fetchAllProducts.fulfilled]: (state, action) => {
			state.status = 'idle';
			state.products = action.payload;
			// return { ...state, status: 'idle', products: action.payload };
		},
		[fetchAllProducts.rejected]: (state, action) => {
			state.status = 'error';
			state.products.error = action.error;
		},
	},
});

export default productSlice;
