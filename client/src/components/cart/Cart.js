import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Cart.module.scss';
import CartContext from '../../contexts/cart/CartContext';
import CartItem from './CartItem';

// Cart will be displayed on the modal and below is the action just for that
const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const history = useHistory();

	const handleItemDelete = (id) => {
		// Since Id will be populated handling its case when its a object and when its not
		let productId = id;
		if (typeof id === 'object') {
			productId = id._id;
		}
		cartCtx.removeItem(productId);
	};

	const cartItemsList = cartCtx.items.map((item) => {
		return (
			<CartItem
				key={item._id ?? item.id}
				{...props}
				{...item}
				handleItemDelete={handleItemDelete}
			/>
		);
	});

	const handleCheckout = (toggleShowModal) => {
		if (cartCtx.items.length === 0) {
			console.log('Nothing in cart');
			return;
		}
		history.push('/checkout/shipping');
		toggleShowModal();
	};

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
					<span>{cartCtx.totalPrice.toFixed(2)}</span>
				</div>
				<div className={classes['checkout-btn']}>
					<button onClick={(e) => handleCheckout(props.toggleShowModal)}>
						<span>Proceed to Checkout</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
