// import { useState } from 'react';
// import { useEffect } from 'react';
import { useContext } from 'react';
import CartContext from '../../contexts/cart/CartContext';
import { useSelector } from 'react-redux';
import Cart from '../cart/Cart';
import Button from '../UI/button/Button';
import classes from './CartReview.module.scss';
import { useEffect } from 'react';

const CartReview = (props) => {
	// This works but not using this
	// const [cartData, setCartData] = useState();
	// const fetchCartCtx = (cartCtx) => {
	// 	if (cartCtx && cartCtx.totalPrice) {
	// 		setCartData(cartCtx);
	// 	}
	// 	return cartCtx;
	// };

	// useEffect(() => {
	// 	console.log(cartData);
	// 	fetchCartCtx();
	// }, [fetchCartCtx]);

	const cartCtx = useContext(CartContext);
	const address = useSelector((state) => state.address);
	const payment = useSelector((state) => state.payment);
	console.log(address);

	// useEffect(() => {}, [address]);

	return (
		<div className={`${classes['review-container']}`}>
			<div className={classes.header}>
				<h2>Review your order</h2>
			</div>
			<hr />
			<div className={classes['content-container']}>
				<div className={classes['content-list-wrapper']}>
					<div className={`${classes.address}  ${classes['add-space']}`}>
						<div className={classes['address-wrapper']}>
							<div className={classes.subheader}>Shipping address</div>
							<div className={classes.fullname}>{address.fullName}</div>
							<div className={classes['shipping-address']}>
								{address.shippingAddress}
							</div>
							<div className={classes.pin}>{address.pin}</div>
							<div className={classes.city}>{address.city}</div>
							<div className={classes.phone}>Phone: {address.phone}</div>
							<div className={classes.country}>{address.country}</div>
						</div>
						<div className={classes['selected-payment-wrapper']}>
							<div className={classes.subheader}>Payment method</div>
							<div className={classes['payment-name']}>
								{payment.paymentMethod}
							</div>
						</div>
						{/* <div className={classes.} */}
					</div>
					<div className={`${classes['cart-items']} ${classes['add-space']}`}>
						{/* Add a subheader if required */}
						<div className={classes.subheader}>
							Review your cart items before ordering
						</div>

						<Cart
							display="items"
							header=" "
							// fetchCartCtx={fetchCartCtx}
						/>
					</div>
				</div>
				<div className={classes['continue-btn-container']}>
					<div className={classes.totalPrice}>
						Total Price: ${cartCtx.totalPrice}
					</div>
					<div className={classes['continue-btn-wrapper']}>
						<Button type="submit">Pay Now</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartReview;
