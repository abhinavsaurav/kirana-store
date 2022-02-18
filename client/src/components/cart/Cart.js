import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Cart.module.scss';
import CartContext from '../../contexts/cart/CartContext';
import CartItem from './CartItem';

// Cart will be displayed on the modal and below is the action just for that
const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const history = useHistory();

	const deleteBtnHandler = (id) => {
		// console.log('delete btn clicked id:' + id);
		cartCtx.removeItem(id);
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

	const handleCheckoutButtonClick = (toggleShowModal) => {
		if (cartCtx.items.length === 0) {
			console.log('Nothing in cart');
			return;
		}
		history.push('/address-select');
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
					<button
						onClick={(e) => handleCheckoutButtonClick(props.toggleShowModal)}
					>
						<span>Proceed to Checkout</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
