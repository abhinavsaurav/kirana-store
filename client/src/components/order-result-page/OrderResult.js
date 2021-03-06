import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { SUCCESS } from '../../data/constants';
import { orderDefaultAction } from '../../store';
import BadgeCheck from '../UI/Icons/Badge/BadgeCheck';

import classes from './OrderResult.module.scss';

const OrderResult = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const order = useSelector((state) => state.order);
	const orderResult = useSelector(
		(state) => state.order.paymentResult.serverResponse
	);
	// const paymentResult = useSelector((state) => state.order.paymentStatus);

	useEffect(() => {
		if (order.paymentStatus !== SUCCESS) {
			history.push('/');
		}

		return () => {
			dispatch(orderDefaultAction.resetPaymentStatus());
		};
	}, []);

	const renderConditionalData = () => (
		<>
			<div className={classes['order-info']}>
				<h2>
					<span>Order Information</span>
				</h2>
				<div className={classes['table-container']}>
					<p>
						<span>Order Id</span>
						<span>:</span>
						<span>{order.orderId || 'Dummy'}</span>
					</p>
					<p>
						<span>Order Placed At</span>
						<span>:</span>
						<span>{orderResult ? orderResult.order.paidAt : 'Dummy'}</span>
					</p>
					<p>
						<span>Shipping to </span>
						<span>:</span>
						<span>
							<b>
								{orderResult
									? orderResult.order.shippingAddress.fullName
									: 'Dummy'}
							</b>{' '}
							at{' '}
							<b>
								{orderResult
									? orderResult.order.shippingAddress.address
									: 'Dummy'}
								,{' '}
								{orderResult ? orderResult.order.shippingAddress.city : 'Dummy'}{' '}
								-{' '}
								{orderResult ? orderResult.order.shippingAddress.pin : 'Dummy'},{' '}
								{orderResult
									? orderResult.order.shippingAddress.country
									: 'Dummy'}{' '}
							</b>
						</span>
					</p>
					<p>
						<span>Payment Method</span>
						<span>:</span>
						<span>{order.paymentMethod || 'Dummy'}</span>
					</p>
				</div>
				<div className={classes.items}>
					<h3>Ordered Items</h3>
					{orderResult &&
						orderResult.order.orderItems.map(
							({ name, qty, image, product }, ind) => (
								<div className={classes['item-container']} key={product}>
									<div className={classes['serial-no']}>{ind + 1}.</div>
									<Link to={`/products/${product}`}>
										<div className={classes.pic}>
											<img src={image} alt={name} />
										</div>
										<div className={classes.details}>
											<div className={classes.name}>
												<span>{name}</span>
											</div>
											<div>
												<span>Quantity</span>
												<span>:</span>
												<span>{qty}</span>
											</div>
										</div>
									</Link>
								</div>
							)
						)}
				</div>
			</div>
		</>
	);

	return (
		<div className={classes['order-container']}>
			<div className={classes['order-message']}>
				<div className={classes['order-status']}>
					<h2>Thank you! Order placed successfully!</h2>
					<div
						className={`${classes['payment-message']} ${
							orderResult && orderResult.signatureIsValid === 'true'
								? 'active'
								: ''
						}`}
					>
						{order && order.paymentStatus !== SUCCESS ? (
							<div className={classes.wrapper}>
								<BadgeCheck
									classes={classes.check}
									width="2rem"
									height="2rem"
									color="green"
								/>
								<span>Payment was Successful</span>
							</div>
						) : orderResult.signatureIsValid === 'true' &&
						  orderResult.order.isPaid ? (
							<div className={classes.wrapper}>
								<BadgeCheck
									classes={classes.check}
									width="1.75rem"
									height="1.75rem"
									color="green"
								/>
								<span>Payment was Successful</span>
							</div>
						) : (
							'Payment not successful. Something went wrong!'
						)}
					</div>
				</div>
			</div>
			{/* {orderResult ? renderConditionalData() : ''} */}
			{renderConditionalData()}
		</div>
	);
};

export default OrderResult;
