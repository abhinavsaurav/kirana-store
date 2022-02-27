import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CartContext from '../../contexts/cart/CartContext';
import Cart from '../cart/Cart';
import { createOrder } from '../../store/checkout/orderActions';

import Button from '../UI/button/Button';
import classes from './CartReview.module.scss';

const CartReview = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const cartCtx = useContext(CartContext);

	const userId = useSelector((state) => state.auth.userInfo._id);
	const token = useSelector((state) => state.auth.token);
	const address = useSelector((state) => state.address);
	const payment = useSelector((state) => state.payment.paymentMethod);
	const orderStatus = useSelector((state) => state.order.status);

	const totalItemsPrice = cartCtx.totalPrice;

	let taxPrice = 0; // will charge 12% tax i guess
	let priceAfterTax = 0;
	let shippingCharge = 10;
	let priceToPay = 0;
	taxPrice = +totalItemsPrice * (12 / 100); // will charge 12% tax i guess
	priceAfterTax = taxPrice + +totalItemsPrice; // will charge 12% tax i guess
	priceToPay = priceAfterTax + shippingCharge;

	useEffect(() => {}, []);

	const handleOrderAndPayment = async (e) => {
		e.preventDefault();
		if (cartCtx.items.length <= 0) {
			/**
			 * TODO show Error
			 *
			 */
			console.log('Nothing in cart to order');
			history.push('/');
			return;
		}

		// ! THIS WILL DO SHALLOW COPY AND MODIFY THE DATA
		// const dataToBeFormattedCopy = [...cartCtx.items];

		// ! DONT MUTATE DATA --> STILL GETTIN MUTATED SINCE NESTED ARRAY AND OBJECTS
		// ONLY NEED TO REMOVE THE NOT NEEDED DATA
		const formattedCart = cartCtx.items.map((data) => {
			if (typeof data.id === 'object') {
				data.product = data.id._id;
			} else {
				data.product = data.id;
			}
			// delete data.id;	// As a workaround i will let it stay. Also should clear the cart on every order anyways
			delete data.numReviews;
			// delete data.countInStock;
			// delete data.reviews;
			delete data.altImage;
			// Probably will uncheck a product as this is not gonna be used
			// delete data.createdAt;
			// delete data.updatedAt;
			return data;
		});

		// console.log('Ordering now');
		const orderData = {
			user: userId,
			cart: formattedCart,
			address: { address: address.shippingAddress, ...address },
			paymentMethod: payment,
			price: {
				taxed: taxPrice,
				shipping: shippingCharge,
				total: priceToPay,
			},
		};

		delete orderData.address.shippingAddress;
		console.log(orderData);
		console.log(formattedCart);

		dispatch(createOrder({ orderData, token: token }));
	};

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
				<div className={classes['right-container']}>
					<div className={classes.wrapper}>
						<div className={classes['continue-btn-container']}>
							<div className={classes['continue-btn-wrapper']}>
								<Button
									type="submit"
									onClick={handleOrderAndPayment}
									// disabled={cartCtx.totalAmount <= 0 ? true : false} // totalAmount is not
								>
									Place Order <br />&<br /> Pay
								</Button>
							</div>
						</div>
					</div>
					<div className={classes.price}>
						<div className={classes.subheader}>Price Breakdown</div>
						<p>
							<span>Cumulative Price</span>
							<span>:</span>
							<span>${totalItemsPrice.toFixed(2)}</span>
						</p>
						<p>
							<span>Tax Applicable</span>
							<span>:</span>
							<span>${taxPrice.toFixed(2)}</span>
						</p>
						<p>
							<span>Shipping charge</span>
							<span>:</span>
							<span>${shippingCharge.toFixed(2)}</span>
						</p>
						<p id={classes.rule}>
							<span></span>

							<span></span>
							<span></span>
						</p>
						<p>
							<span>Total Price</span>
							<span>:</span>
							<span>${priceToPay.toFixed(2)}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartReview;

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
