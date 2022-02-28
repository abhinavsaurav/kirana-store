import { createAsyncThunk } from '@reduxjs/toolkit';
import kiranaAPI from '../../apis/kiranaAPI';
import {
	ORDER_CREATE_REQUEST,
	ORDER_PAYMENT_REQUEST,
} from '../../data/constants';

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

export const orderPayment = createAsyncThunk(
	ORDER_PAYMENT_REQUEST,
	async (data, thunkAPI) => {
		try {
			const verifySignature = await kiranaAPI.post(
				`/orders/payment/${data.orderId}/verify`,
				{ response: data.response },
				{
					headers: {
						Authorization: `Bearer ${data.token}`,
					},
				}
			);

			localStorage.setItem(
				'PaymentResult',
				JSON.stringify({ serverResponse: verifySignature.data, data })
			);
			return {
				serverResponse: verifySignature.data,
				data: {
					response: data.response,
				},
			};
		} catch (err) {
			if (!err.response) {
				throw err;
			}

			return thunkAPI.rejectWithValue(err.response.data);
		} finally {
		}
	}
);
