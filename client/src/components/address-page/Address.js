import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckoutAddress } from '../../store/checkout/addressActions';
import InputField from '../UI/input/InputField';
import Button from '../UI/button/Button';
import classes from './Address.module.scss';
import { IS_NUMBER_REGEX } from '../../data/constants';
import { useHistory } from 'react-router-dom';
import CheckoutSteps from '../UI/checkout-steps/CheckoutSteps';

const Address = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const address = useSelector((state) => state.address);
	const [state, setState] = useState({
		fullName: address ? address.fullName : '',
		shippingAddress: address ? address.shippingAddress : '',
		phone: address ? address.phone : '',
		city: address ? address.city : '',
		pin: address ? address.pin : '',
		country: 'INDIA',
	});
	console.log(address.fullName);

	useEffect(() => {
		// Modal makes the below hidden
		// and due to re-direction its not added so added now
		document.body.style.overflow = 'auto';
	}, []);

	// TODO Need to remove reference for it the address are added
	const [isSelectAddress, setIsSelectAddress] = useState(false);

	const handleOnChange = async (e) => {
		if (e.target.type === 'text') {
			if (e.target.name === 'pin' || e.target.name === 'phone') {
				// storing the value here instead of directly assigning as the regex expression takes time to evaluate and the event
				// value gets lost by the time its processed
				const value = e.target.value;
				const ifNumber = await IS_NUMBER_REGEX.test(value);

				if (ifNumber) {
					setState({ ...state, [e.target.name]: value });
				} else {
					return;
				}
			}

			setState({ ...state, [e.target.name]: e.target.value });
		}
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();

		if (state.pin.length !== 6) {
			console.log('Enter correct pin');
			return false;
		}
		if (state.phone.length !== 10) {
			console.log('Enter correct address');
			return false;
		}
		dispatch(setCheckoutAddress(state));

		// console.log('I am working');
		history.push('/checkout/payment');
	};

	const handleOnInvalid = (e) =>
		e.target.setCustomValidity(
			`${
				e.target.name.charAt(0).toUpperCase() + e.target.name.slice(1) // Capitalize
			} is mandatory`
		);

	const handleOnInput = (e) => e.target.setCustomValidity('');

	return (
		<div className={classes['address-container']}>
			{isSelectAddress ? (
				<>
					<div className={classes['address-banner']}>
						Select delivery address
					</div>
					<hr />
					<div className={classes['address-btn']}>
						<Button>+</Button>
					</div>
					<hr />
				</>
			) : (
				''
			)}
			<div className={classes['form-wrapper']}>
				<CheckoutSteps step="2" />
				<form onSubmit={handleOnSubmit} className={classes['new-address']}>
					<div className={classes['header']}>
						<div>
							{isSelectAddress ? 'Add new address' : 'Address for delivery'}
						</div>
					</div>
					<div className={classes['country']}>
						<InputField
							id="form-checkout-country"
							label="Country"
							type="text"
							variant="1"
							name="country"
							value={state.country}
							onChange={handleOnChange}
							required
							disabled
							onInvalid={handleOnInvalid}
							onInput={handleOnInput}
						/>
					</div>
					<div className={classes['full-name']}>
						<InputField
							variant="1"
							id="form-checkout-address"
							type="text"
							label="Full Name"
							name="fullName"
							value={state.fullName}
							onChange={handleOnChange}
							required
							onInvalid={handleOnInvalid}
							onInput={handleOnInput}
						/>
					</div>

					<div className={classes['address']}>
						<InputField
							variant="1"
							id="form-checkout-address"
							type="text"
							label="Address"
							name="shippingAddress"
							value={state.shippingAddress}
							onChange={handleOnChange}
							required
							onInvalid={handleOnInvalid}
							onInput={handleOnInput}
						/>
					</div>
					<div className={classes['city']}>
						<InputField
							variant="1"
							id="form-checkout-city"
							type="text"
							label="City"
							name="city"
							value={state.city}
							onChange={handleOnChange}
							required
							onInvalid={handleOnInvalid}
							onInput={handleOnInput}
						/>
					</div>
					<div className={classes['pin']}>
						<InputField
							variant="1"
							id="form-checkout-pin"
							type="text"
							label="PIN Code"
							name="pin"
							value={state.pin}
							onChange={handleOnChange}
							required
							onInvalid={handleOnInvalid}
							onInput={handleOnInput}
						/>
					</div>
					<div className={classes['phone']}>
						<InputField
							variant="1"
							id="form-checkout-phone"
							type="text"
							label="Phone no."
							name="phone"
							value={state.phone}
							onChange={handleOnChange}
							required
							onInvalid={handleOnInvalid}
							onInput={handleOnInput}
						/>
					</div>
					<div className={classes['btn-container']}>
						<Button type="submit">
							{isSelectAddress ? 'Add Address' : 'Proceed to Checkout'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Address;
