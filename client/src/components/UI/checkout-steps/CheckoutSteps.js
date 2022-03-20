import HeaderCartIcon from '../Icons/Cart/HeaderCartIcon';
import classes from './CheckoutSteps.module.scss';

const CheckoutSteps = (props) => {
	const stepNo = parseInt(props.step);
	let step;

	switch (stepNo) {
		case 1:
			step = 'one';
			break;
		case 2:
			step = 'two';
			break;
		case 3:
			step = 'three';
			break;
		case 4:
			step = 'four';
			break;
		case 5:
			step = 'five';
			break;
		default:
			step = 'two';
			break;
	}

	return (
		<div className={classes['steps-container']}>
			<div className={classes.wrapper}>
				<div className={classes['all-steps']}>
					<div
						className={`${classes.step} ${stepNo >= 1 ? classes.active : ''}`}
					>
						<span>Sign In</span>
					</div>
					<div
						className={`${classes.step} ${stepNo >= 2 ? classes.active : ''}`}
					>
						<span>Address</span>
					</div>
					<div
						className={`${classes.step} ${stepNo >= 3 ? classes.active : ''}`}
					>
						<span>Payment</span>
					</div>
					<div
						className={`${classes.step} ${stepNo >= 4 ? classes.active : ''}`}
					>
						<span>Place Order</span>
					</div>
					<div
						className={`${classes.step} ${stepNo >= 5 ? classes.active : ''}`}
					>
						<span>Complete Payment</span>
					</div>
				</div>
			</div>
			<div className={classes['main-wrapper']}>
				<div className={`${classes['line-wrapper']} ${classes[step]}`}>
					<div className={classes.line}></div>
					<div className={`${classes.variable}`}></div>

					<div className={`${classes.cart}`}>
						<HeaderCartIcon />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutSteps;
