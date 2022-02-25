import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../UI/input/InputField';
import Button from '../UI/button/Button';
import { paymentAction } from '../../store';

import classes from './PaymentSelection.module.scss';

const PaymentSelection = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const addressCheck = useSelector((state) => state.address);
	const [paymentMethod, setPaymentMethod] = useState('');

	useEffect(() => {
		if (!addressCheck.shippingAddress) {
			history.push('/checkout/shipping');
		}
	}, [addressCheck]);

	const handleOnChange = (e) => {
		setPaymentMethod(e.target.name);
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		dispatch(paymentAction.setPaymentMethod(paymentMethod));
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
									onChange={handleOnChange}
								/>
							</div>
							<div className={classes.field}>
								<InputField
									type="radio"
									name="payment-method"
									label="Stripe"
									id="stripe"
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
