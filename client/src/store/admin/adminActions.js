import { createAsyncThunk } from '@reduxjs/toolkit';
import { kiranaAPIAdmin } from '../../apis/kiranaAPI';
import {
	CHART_PAID_UNPAID_COUNT,
	CHART_TOTAL_MONTHLY_ORDER,
} from '../../data/constants';

export const paidUnpaidOrder = createAsyncThunk(
	CHART_PAID_UNPAID_COUNT,
	async (token, thunkAPI) => {
		try {
			const response = await kiranaAPIAdmin.get('/orders/chart/paid-unpaid', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return response.data;
		} catch (err) {
			if (!err.response) {
				throw err;
			}

			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);

export const totalMonthlyOrders = createAsyncThunk(
	CHART_TOTAL_MONTHLY_ORDER,
	async (token, thunkAPI) => {
		try {
			const response = await kiranaAPIAdmin.get('/orders/chart/monthly-total', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return response.data;
		} catch (err) {
			if (!err.response) {
				throw err;
			}

			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);
