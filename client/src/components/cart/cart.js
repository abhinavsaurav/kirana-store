import { useContext } from 'react';
import classes from './cart.module.scss';
import CartContext from '../../contexts/cart/CartContext';

// Cart will be displayed on the modal and below is the action just for that
const Cart = (props) => {
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

	return <div className={classes.cart}>Just a test</div>;
};

export default Cart;
