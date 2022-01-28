import { createSlice } from '@reduxjs/toolkit';
import { login } from './authActions';
import { LOADING, IDLE, ERROR } from '../data/constants';

const authIntialState = {
	isAuthenticated: false,
	token: null,
	userInfo: {},
	status: 'idle',
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState: authIntialState,
	reducers: {
		resetAuthError(state, action) {
			state.error = null;
		},
	},
	extraReducers: {
		[login.pending]: (state, action) => {
			state.status = LOADING;
		},
		[login.fulfilled]: (state, action) => {
			console.log(action.payload);
			state.status = IDLE;
			state.isAuthenticated = true;
			state.userInfo = action.payload.user;
			state.token = action.payload.token;
		},
		[login.rejected]: (state, action) => {
			state.status = ERROR;
			state.isAuthenticated = false;
			state.error = action.payload;
		},
	},
});

export default authSlice;
export const authDefaultActions = authSlice.actions;
