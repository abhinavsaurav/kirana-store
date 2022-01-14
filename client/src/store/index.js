// Our redux store
// create
import { configureStore, createSlice } from '@reduxjs/toolkit';

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

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
	},
});

export const authAction = authSlice.actions;
export default store;
