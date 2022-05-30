import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import kiranaAPI from '../../apis/kiranaAPI';
import { Doughnut } from 'react-chartjs-2';

import { useSelector, useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { paidUnpaidOrder } from '../../store/admin/adminActions';

ChartJS.register(ArcElement, Tooltip, Legend);

const Insights = (props) => {
	const dispatch = useDispatch();
	const auth = useAuth();
	const adminData = useSelector((state) => state.admin);

	useEffect(() => {
		if (auth.isAuthenticated && auth.userInfo.isAdmin) {
			dispatch(paidUnpaidOrder(auth.token));
		}
	}, [auth.isAuthenticated]);
	// const doughnutData =
	// ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

	if (adminData.countPaidUnpaidOrder.length <= 0) {
		console.log('being run once');
		return <></>;
	}
	console.log(adminData);

	return (
		<div className={''}>
			<h2>Insights</h2>
			<Doughnut
				// type="doughnut"
				data={{
					labels: adminData.countPaidUnpaidOrder.map((data) => data.name),
					datasets: [
						{
							label: 'Orders segregation',
							data: adminData.countPaidUnpaidOrder,
							backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
						},
					],
				}}
				options={{
					parsing: {
						key: 'totalCount',
					},
					plugins: {
						tooltip: {
							yAlign: 'bottom', // ! Not working this needs to be corrected probably need to override configuration in default chart
						},
					},
				}}
				// width="200"
				// height="200"
			/>
		</div>
	);
};

export default Insights;
