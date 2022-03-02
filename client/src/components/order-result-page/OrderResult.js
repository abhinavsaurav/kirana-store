import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SUCCESS } from '../../data/constants';
import { orderDefaultAction } from '../../store';

const OrderResult = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const paymentResult = useSelector((state) => state.order.paymentStatus);
	// const payment

	useEffect(() => {
		if (paymentResult !== SUCCESS) {
			history.push('/');
		}
		return () => {
			dispatch(orderDefaultAction.resetPaymentStatus());
		};
	}, []);

	return <div>Order Result page</div>;
};

export default OrderResult;
