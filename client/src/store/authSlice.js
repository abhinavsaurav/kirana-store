import { createSlice } from '@reduxjs/toolkit';

// ? No manual auth action creator created and is by default and is currently being accessed through store/index.js

const authIntialState = { isAuthenticated: false };

const authSlice = createSlice({
	name: 'auth',
	initialState: authIntialState,
	reducers: {
		login(state, action) {
			// we need to run a check here to authenticate the user and then modify this piece of code
			// Also we can directly modify as dimmer in the background will take care about the mutability
			// state.isAuthenticated = true;
			// but just doing this to test it out
			// payload property name is fixed kinda
			console.log(action.payload);

			return { isAuthenticated: true };
		},
		getCurrrentAuthStatus(state) {
			return state;
		},
	},
});

export default authSlice;
