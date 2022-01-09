import { useContext } from 'react';
import classes from './Cart.module.scss';
import CartContext from '../../contexts/cart/CartContext';
import CartItem from './CartItem';

// Cart will be displayed on the modal and below is the action just for that
const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const deleteBtnHandler = (e) => {
		console.log('delete btn clicked');
	};

	const cartItemsList = cartCtx.items.map((item) => {
		return (
			<CartItem
				key={item.id}
				{...props}
				{...item}
				deleteBtnHandler={deleteBtnHandler}
			/>
		);
	});

	return (
		<div className={classes['flex-wrapper']}>
			<div className={classes.wrapper}>
				<div className={classes.header}>My Cart:</div>
				<div className={classes['col-name']}>
					<div>Price</div>
				</div>
				<div className={classes['list-cart-item']}>{cartItemsList}</div>
			</div>
			<div className={classes['checkout-wrapper']}>
				<div className={classes['total-price']}>
					<span className={classes.first}>Total Price:</span>
					<span>{cartCtx.totalAmount}</span>
				</div>
				<div className={classes['checkout-btn']}>
					<button>
						<span>Proceed to Checkout</span>
					</button>
				</div>
			</div>
		</div>
	);

	// ! need to rewrite below

	// const cartCtx = useContext(CartContext);

	// const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	// const hasItems = cartCtx.items.length > 0;

	// const cartItemAddHandler = (item) => {
	// 	// adding the amount of item explicity here
	// 	cartCtx.addItem({ ...item, amount: 1 });
	// };

	// const cartItemRemoveHandler = (id) => {
	// 	cartCtx.removeItem(id);
	// };

	// const cartItems = {
	// 	// needs to be added
	// };
};

export default Cart;
