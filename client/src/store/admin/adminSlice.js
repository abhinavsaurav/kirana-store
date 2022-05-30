import { createSlice } from '@reduxjs/toolkit';
import { IDLE, LOADING, ERROR } from '../../data/constants';
import { paidUnpaidOrder, totalMonthlyOrders } from './adminActions';

const initialState = {
	countPaidUnpaidOrder: [],
	totalMonthlyOrder: [],
	status: 'idle',
	error: null,
};

const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {},
	extraReducers: {
		[paidUnpaidOrder.pending]: (state, action) => {
			state.status = LOADING;
		},
		[paidUnpaidOrder.fulfilled]: (state, action) => {
			state.status = IDLE;
			state.countPaidUnpaidOrder = action.payload.countPaidUnpaidOrder;
			state.error = null;
		},
		[paidUnpaidOrder.rejected]: (state, action) => {
			state.countPaidUnpaidOrder = [];
			state.status = ERROR;
			state.error = action.payload;
		},
		[totalMonthlyOrders.pending]: (state, action) => {
			state.status = LOADING;
		},
		[totalMonthlyOrders.fulfilled]: (state, action) => {
			state.status = IDLE;
			state.totalMonthlyOrder = action.payload.totalMonthlyOrder;
			state.error = null;
		},
		[totalMonthlyOrders.rejected]: (state, action) => {
			state.totalMonthlyOrder = [];
			state.status = ERROR;
			state.error = action.payload;
		},
	},
});

export default adminSlice;
