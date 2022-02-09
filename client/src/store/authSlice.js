import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from './authActions';
import { LOADING, IDLE, ERROR } from '../data/constants';

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const authIntialState = {
	isAuthenticated: userInfoFromStorage ? true : false,
	token: userInfoFromStorage ? userInfoFromStorage.token : null,
	userInfo: userInfoFromStorage ? userInfoFromStorage.user : {},
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
			state.status = IDLE;
			state.isAuthenticated = true;
			state.userInfo = action.payload.user;
			state.token = action.payload.token;
		},
		[login.rejected]: (state, action) => {
			state.status = ERROR;
			state.error = action.payload;
		},
		[logout.pending]: (state, action) => {
			state.status = LOADING;
		},
		[logout.fulfilled]: (state, action) => {
			state.status = IDLE;
			state.isAuthenticated = false;
			state.userInfo = {};
			state.token = null;
		},
		[logout.rejected]: (state, action) => {
			state.isAuthenticated = false;
			state.userInfo = {};
			state.token = null;
			state.status = ERROR;
			state.error = action.payload;
		},
	},
});

export default authSlice;
export const authDefaultActions = authSlice.actions;
