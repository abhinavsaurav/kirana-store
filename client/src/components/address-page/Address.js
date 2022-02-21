import { useState } from 'react';
import InputField from '../UI/input/InputField';
import Button from '../UI/button/Button';
import classes from './Address.module.scss';

const Address = (props) => {
	const [state, setState] = useState({
		fullname: '',
		address: '',
		city: '',
		pin: '',
	});

	return (
		<div className={classes['address-container']}>
			<form typeof="GET">
				<div className="header">
					<h1>Address for delivery</h1>
				</div>
				<div className="full-name">
					<InputField
						variant="1"
						id="form-checkout-address"
						type="text"
						label="Full Name"
						name="fullname"
					/>
				</div>
				<div className="address">
					<InputField
						variant="1"
						id="form-checkout-address"
						type="text"
						label="Address"
						name="address"
					/>
				</div>
				<div className="city">
					<InputField
						variant="1"
						id="form-checkout-city"
						type="text"
						label="City"
						name="city"
					/>
				</div>
				<div className="pin">
					<InputField
						variant="1"
						id="form-checkout-pin"
						type="text"
						label="PIN Code"
						name="pin"
					/>
				</div>
				<div className="country">
					<InputField
						id="form-checkout-country"
						label="Country"
						type="text"
						variant="1"
						name="country"
					/>
				</div>
				<Button type="submit">Submit</Button>
			</form>
		</div>
	);
};

export default Address;
