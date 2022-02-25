import { createAsyncThunk } from '@reduxjs/toolkit';
import { SET_CHECKOUT_ADDRESS } from '../../data/constants';

export const setCheckoutAddress = createAsyncThunk(
	SET_CHECKOUT_ADDRESS,
	async (data, thunkAPI) => {
		try {
			// On link implementation making DB request to the server to store the address here
			localStorage.setItem('checkoutAddress', JSON.stringify(data));
			return data;
		} catch (err) {
			if (!err.response) {
				throw err;
			}
			return thunkAPI.rejectWithValue(err.response.data);
		} finally {
		}
	}
);
