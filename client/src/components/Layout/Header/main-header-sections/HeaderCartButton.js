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
			amount: cartCtx.totalAmount,
		};
		// storing this locally
		localStorage.setItem('cartData', JSON.stringify(data));
	}, [cartCtx.items, cartCtx.totalAmount]);

	useEffect(() => {
		if (auth.isAuthenticated) {
			cartCtx.updateItems(cartCtx.items, cartCtx.totalAmount);
		}
	}, [auth.isAuthenticated, cartCtx.items, cartCtx.totalAmount]);

	// console.log(cartCtx);
	const noOfCartItems = cartCtx.items.reduce((curNumber, item) => {
		// console.log(cartCtx);
		return curNumber + item.amount;
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
