import { createSlice } from '@reduxjs/toolkit';
import { ERROR, IDLE, LOADING } from '../../data/constants';
import { setCheckoutAddress } from './addressActions';

const { country, fullName, shippingAddress, city, pin, phone } =
	localStorage.getItem('checkoutAddress')
		? JSON.parse(localStorage.getItem('checkoutAddress'))
		: {};

const initialState = {
	country: country ?? '',
	fullName: fullName ?? '',
	shippingAddress: shippingAddress ?? '',
	city: city ?? '',
	pin: pin ?? '',
	phone: phone ?? '',
	// -----------------------
	status: IDLE,
	error: null,
};

const addressSlice = createSlice({
	name: 'Address',
	initialState,
	reducers: {},
	extraReducers: {
		[setCheckoutAddress.pending]: (state, action) => {
			state.status = LOADING;
		},
		[setCheckoutAddress.fulfilled]: (state, action) => {
			state.status = IDLE;
			state.country = action.payload.country;
			state.fullName = action.payload.fullName;
			state.shippingAddress = action.payload.shippingAddress;
			state.city = action.payload.city;
			state.pin = action.payload.pin;
			state.phone = action.payload.phone;
		},
		[setCheckoutAddress.rejected]: (state, action) => {
			state.error = action.payload;
			state.status = ERROR;
		},
	},
});

export default addressSlice;
