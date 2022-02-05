import { useContext } from 'react';
import CartContext from '../../../../contexts/cart/CartContext';
import HeaderCartIcon from '../../../UI/Icons/Cart/HeaderCartIcon';

const HeaderCartButton = () => {
	const cartCtx = useContext(CartContext);
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
