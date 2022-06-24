import React, { useEffect, useState } from 'react';
import {
	Chart as ChartJS,
	ArcElement,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
// import kiranaAPI from '../../apis/kiranaAPI';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

import { useSelector, useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import {
	paidUnpaidOrder,
	totalMonthlyOrders,
} from '../../store/admin/adminActions';

import classes from './Insight.module.scss';

ChartJS.register(
	ArcElement,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);
// ChartJS.overrides[type].plugins.tooltip;

const Insights = (props) => {
	const dispatch = useDispatch();
	const auth = useAuth();
	const adminData = useSelector((state) => state.admin);
	const [barData, setBarData] = useState([]);
	const barLabelData = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'June',
		'July',
		'Aug',
		'Sept',
		'Oct',
		'Nov',
		'Dec',
	];

	const plotBarChart = () => {
		const data = new Array(12).fill(0).map((data, ind) => ({
			totalSum: 0,
			mycount: 0,
			month: +ind + 1,
		}));

		adminData.totalMonthlyOrder.map((obj) => {
			if (obj.month === data[obj.month - 1].month) {
				data[obj.month - 1] = obj;
			}
		});

		setBarData(data);
	};

	useEffect(() => {
		if (auth.isAuthenticated && auth.userInfo.isAdmin) {
			dispatch(paidUnpaidOrder(auth.token));
			dispatch(totalMonthlyOrders(auth.token));
		}
	}, [auth.isAuthenticated]);

	useEffect(() => {
		const data = adminData.totalMonthlyOrder;
		if (data && data.length > 0) {
			plotBarChart();
			// data.map((obj) => {
			// 	if (obj.month === barData[obj.month].month) {
			// 		setBarData([...barData, barData[obj.month]]);
			// 	}
			// });
		}
	}, [adminData.totalMonthlyOrder]);

	if (adminData.countPaidUnpaidOrder.length <= 0) {
		console.log('being run once');
		return <></>;
	}
	console.log(adminData);

	return (
		<div className={''}>
			<h2>Insights</h2>

			<div className={`${classes['card']} ${classes['full-width']}`}>
				<Bar
					// className={`${classes['full-width']}`}
					data={{
						labels: barLabelData,
						datasets: [
							{
								label: 'month data',
								data: barData,
								backgroundColor: ['rgba(255, 159, 64, 0.2)'],
							},
						],
					}}
					options={{
						parsing: {
							xAxisKey: 'month',
							yAxisKey: 'mycount',
						},
						scales: {
							y: {
								suggestedMin: 10,
								suggestedMax: 50,
							},
						},
					}}
					// width="1200"
					// height="800"
				/>
			</div>
			<div className={classes.card}>
				<Doughnut
					data={{
						labels: adminData.countPaidUnpaidOrder.map((data) => data.name),
						datasets: [
							{
								label: 'Orders segregation',
								data: adminData.countPaidUnpaidOrder,
								backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
								borderWidth: 2,
								doughnut: {
									cutout: '80%',
								},
							},
						],
					}}
					options={{
						parsing: {
							key: 'totalCount',
						},
						plugins: {
							title: {
								text: 'Orders segregation',
							},
							legend: {
								position: 'bottom',
							},
							tooltip: {
								xAlign: 'left',
								yAlign: 'top',
							},
						},
					}}
				/>
			</div>
		</div>
	);
};

export default Insights;
