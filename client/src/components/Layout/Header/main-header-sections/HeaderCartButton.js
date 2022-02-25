import { useContext, useEffect } from 'react';
import CartContext from '../../../../contexts/cart/CartContext';
import HeaderCartIcon from '../../../UI/Icons/Cart/HeaderCartIcon';
import useAuth from '../../../../hooks/useAuth';

const HeaderCartButton = () => {
	const auth = useAuth();
	const cartCtx = useContext(CartContext);

	// * Storing the cart details to localStorage.
	// TODO: Need to modify it to dispatch a request to cart to db if logged in

	useEffect(() => {
		const data = {
			items: cartCtx.items,
			totalPrice: cartCtx.totalPrice,
		};
		// storing this locally
		localStorage.setItem('cartData', JSON.stringify(data));
	}, [auth.isAuthenticated, cartCtx.items, cartCtx.totalPrice]);

	// console.log(cartCtx);
	const noOfCartItems = cartCtx.items.reduce((curNumber, item) => {
		// console.log(cartCtx);
		const quantity = item.amount ?? item.qty;
		return curNumber + quantity;
	}, 0);

	return (
		<>
			<span>
				<HeaderCartIcon />
				{/* {` 10`} */}
			</span>
			<span>{noOfCartItems}</span>
			{/* <span>{cartCtx.totalAmount}</span> */}
			{/* <span>Cart</span> */}
		</>
	);
};

export default HeaderCartButton;
