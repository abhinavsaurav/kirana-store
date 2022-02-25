import classes from './CartReview.module.scss';

const CartReview = (props) => {
	return (
		<div className={classes['review-container']}>
			<div className={classes.header}>Review your order</div>
		</div>
	);
};

export default CartReview;
