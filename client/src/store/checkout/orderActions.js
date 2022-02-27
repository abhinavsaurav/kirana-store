import { createAsyncThunk } from '@reduxjs/toolkit';
import kiranaAPI from '../../apis/kiranaAPI';
import { ORDER_CREATE_REQUEST } from '../../data/constants';

export const createOrder = createAsyncThunk(
	ORDER_CREATE_REQUEST,
	async (data, thunkAPI) => {
		try {
			console.log(data);
			const response = await kiranaAPI.post('/orders', data.orderData, {
				headers: {
					Authorization: `Bearer ${data.token}`,
				},
			});

			console.log('below is the response');
			console.log(response.data);

			return response.data;
		} catch (err) {
			if (!err.response) {
				throw err;
			}

			return thunkAPI.rejectWithValue(err.response.data);
		} finally {
		}
	}
);
