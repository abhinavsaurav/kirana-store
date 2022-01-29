import { createAsyncThunk } from '@reduxjs/toolkit';
import kiranaAPI from '../apis/kiranaAPI';
import { LOGIN } from '../data/constants';

export const login = createAsyncThunk(LOGIN, async (data, thunkAPI) => {
	try {
		const response = await kiranaAPI.post('/users/login', {
			email: data.email,
			password: data.pass,
		});

		localStorage.setItem('userInfo', JSON.stringify(response.data));

		return response.data;
	} catch (err) {
		if (!err.response) {
			throw err;
		}
		return thunkAPI.rejectWithValue(err.response.data);
		// Was using below code to
		// const error = new Error(e.response.data.message);
		// error.stackTrace = e.response.data.stack;
		// throw error;
	}
});
