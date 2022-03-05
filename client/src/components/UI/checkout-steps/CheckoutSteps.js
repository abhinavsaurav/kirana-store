import HeaderCartIcon from '../Icons/Cart/HeaderCartIcon';
import classes from './CheckoutSteps.module.scss';

const CheckoutSteps = (props) => {
	return (
		<div className={classes['steps-container']}>
			<div className={classes.wrapper}>
				<div className={classes['all-steps']}>
					<div className={classes.step1}>
						<span>Sign In</span>
					</div>
					<div className={classes.step2}>
						<span>Address</span>
					</div>
					<div className={classes.step3}>
						<span>Payment</span>
					</div>
					<div className={classes.step4}>
						<span>Place Order</span>
					</div>
					<div className={classes.step5}>
						<span>Complete Payment</span>
					</div>
				</div>
			</div>
			<div className={classes['main-wrapper']}>
				<div className={classes['line-wrapper']}>
					<div className={classes.line}></div>
					<div className={classes.variable}></div>

					<div className={classes.cart}>
						<HeaderCartIcon />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutSteps;
