import { createAsyncThunk } from '@reduxjs/toolkit';
import kiranaAPI from '../apis/kiranaAPI';
import { LOGIN, LOGOUT } from '../data/constants';

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

export const logout = createAsyncThunk(LOGOUT, async (token, thunkAPI) => {
	console.log('I am firingS');

	try {
		// const header = {
		// 	Authorization: token,
		// };
		console.log(token);
		await kiranaAPI.post('/users/logout', null, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		// if (response.status === 200) {
		localStorage.removeItem('userInfo');
		// }

		return;
	} catch (err) {
		console.log(err);
		if (!err.response) {
			throw err;
		}
		return thunkAPI.rejectWithValue(err.response.data);
	}
});
