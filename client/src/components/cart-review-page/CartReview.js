import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import CartContext from '../../contexts/cart/CartContext';
import Cart from '../cart/Cart';
import {
	createOrder,
	orderPayment,
	orderPaymentError,
} from '../../store/checkout/orderActions';

import Button from '../UI/button/Button';
import classes from './CartReview.module.scss';
import { SUCCESS } from '../../data/constants';
import kiranaAPI from '../../apis/kiranaAPI';
import CheckoutSteps from '../UI/checkout-steps/CheckoutSteps';

const CartReview = (props) => {
	const history = useHistory();
	const auth = useAuth();
	const dispatch = useDispatch();
	const cartCtx = useContext(CartContext);

	const userId = useSelector((state) => state.auth.userInfo._id);
	const token = useSelector((state) => state.auth.token);
	const address = useSelector((state) => state.address);
	const paymentMethod = useSelector((state) => state.payment.paymentMethod);
	const orderStatus = useSelector((state) => state.order.status);
	const order = useSelector((state) => state.order);
	const paymentResult = useSelector((state) => state.order.paymentStatus);

	const totalItemsPrice = cartCtx.totalPrice;

	let taxPrice = 0; // will charge 12% tax i guess
	let priceToPay = 0;
	let shippingCharge = 0;
	let priceAfterTax = 0;

	if (cartCtx.items.length > 0) {
		shippingCharge = 10;
		taxPrice = cartCtx.items.length > 0 ? +totalItemsPrice * (12 / 100) : 0; // will charge 12% tax i guess
		priceAfterTax = taxPrice + +totalItemsPrice; // will charge 12% tax i guess
		priceToPay = priceAfterTax + shippingCharge;
	}

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://checkout.razorpay.com/v1/checkout.js';
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	useEffect(() => {
		if (orderStatus === SUCCESS) {
			const getKeyId = async () => {
				const response = await kiranaAPI.post('/config/razorpay', null, {
					headers: {
						Authorization: `Bearer ${auth.token}`,
					},
				});

				return response.data;
			};

			const keyId = getKeyId();

			var options = {
				key: keyId,
				amount: order.paymentOrder.amount,
				currency: order.paymentOrder.currency,
				name: 'Kirana Corp',
				description: 'This is a Test Transaction',
				image: 'https://example.com/your_logo',
				order_id: order.paymentOrder.orderId,
				// callback_url: 'http://localhost:3000/order/success', this is being sent to the server
				// redirect: true,
				handler: function (response) {
					dispatch(
						orderPayment({
							response: {
								razorpay_payment_id: response.razorpay_payment_id,
								razorpay_order_id: response.razorpay_order_id,
								razorpay_signature: response.razorpay_signature,
							},
							token: auth.token,
							orderId: order.orderId,
						})
					);
					// alert(response.razorpay_payment_id);
					// alert(response.razorpay_order_id);
					// alert(response.razorpay_signature);
				},
				prefill: {
					name: 'Kirana Inc',
					email: 'abhinavsaurav1@gmail.com',
					contact: '9999999999',
				},
				notes: {
					address: 'KiranaStore Corporate Office',
				},
				theme: {
					color: '#3399cc',
				},
			};
			var rzp1 = new window.Razorpay(options);
			rzp1.on('payment.failed', function (response) {
				const { code, description, source, step, reason, metadata } =
					response.error;

				dispatch(
					orderPaymentError({
						code,
						description,
						source,
						step,
						reason,
						metadata,
					})
				);

				// alert(response.error.code);
				// alert(response.error.description);
				// alert(response.error.source);
				// alert(response.error.step);
				// alert(response.error.reason);
				// alert(response.error.metadata.order_id);
				// alert(response.error.metadata.payment_id);
			});
			(function () {
				rzp1.open();
				// e.preventDefault();
			})();
		}
	}, [orderStatus]);

	useEffect(() => {
		if (paymentResult === SUCCESS) {
			cartCtx.resetItems();
			history.push('/orders/result');
		}
	}, [paymentResult]);

	// ! This is a hack i am doing not sure why this is happening probably
	// ! need more investigation to this
	// useEffect(() => {
	// 	if (cartCtx.items.length === 0) {
	// 		cartCtx.resetItems();
	// 	}
	// }, [cartCtx.items]);

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
			paymentMethod: paymentMethod,
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
			<CheckoutSteps step="4" />
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
							<div className={classes['payment-name']}>{paymentMethod}</div>
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
