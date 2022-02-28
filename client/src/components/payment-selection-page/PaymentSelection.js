import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../UI/input/InputField';
import Button from '../UI/button/Button';
import classes from './PaymentSelection.module.scss';
import { setPaymentMethod } from '../../store/checkout/paymentSlice';

const PaymentSelection = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const addressCheck = useSelector((state) => state.address);
	const [payment, setPayment] = useState('');

	useEffect(() => {
		if (!addressCheck.shippingAddress) {
			history.push('/checkout/shipping');
		}
	}, [addressCheck]);

	const handleOnChange = (e) => {
		setPayment(e.target.getAttribute('data-payment-name'));
	};

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		console.log(payment);
		if (payment === '') {
			console.log('payment method not selected handle this error');
			return;
		}

		localStorage.setItem('paymentSelected', payment);
		dispatch(setPaymentMethod(payment));
		history.push('/checkout/review');
	};

	return (
		<div className={classes['payment-selection-container']}>
			<div className={classes.header}>
				<h2>Select a payment method</h2>
			</div>
			<hr />
			<form onSubmit={handleOnSubmit}>
				<div className={classes['content-container']}>
					<div className={classes['payment-list-wrapper']}>
						<div className={classes.subheader}>
							{/* Add a subheader if required */}
							<div className={classes.field}>
								<InputField
									type="radio"
									name="payment-method"
									label="Paypal"
									id="paypal"
									data-payment-name="Paypal"
									onChange={handleOnChange}
								/>
							</div>
							<div className={classes.field}>
								<InputField
									type="radio"
									name="payment-method"
									label="Razorpay"
									id="razorpay"
									data-payment-name="Razorpay"
									onChange={handleOnChange}
									// disabled
								/>
							</div>
						</div>
					</div>
					<div className={classes['continue-btn-container']}>
						<div className={classes['continue-btn-wrapper']}>
							<Button type="submit">Continue</Button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default PaymentSelection;
