import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../../../contexts/cart/CartContext';
import Lock from '../../../UI/Icons/Lock/Lock';
import classes from './MainContent.module.scss';

const MainContent = ({ data }) => {
	const cartCtx = useContext(CartContext);

	// console.log(data);
	const checkTotalQuant = data.countInStock;

	// TODO setting the quantity here and
	// eslint-disable-next-line
	const [totalQuantity, setTotalQuantity] = useState(checkTotalQuant);
	const [cartItemQuantity, setCartItemQuantity] = useState(1);

	const addToCartHandler = (e, check) => {
		console.log('hi' + data);
		console.log(+cartItemQuantity);

		cartCtx.addItem({ ...data, amount: +cartItemQuantity });
	};

	return (
		<div className={classes.container}>
			<div className={classes['price']}>
				<span>
					Rs.
					{/* have to include currency symbol */}
				</span>
				<span>{data.price}</span>
			</div>
			<div className={classes['stock-check']}>
				<span className={checkTotalQuant > 0 ? classes.green : classes.red}>
					{checkTotalQuant > 0 ? 'In stock' : 'Out of stock'}
				</span>
			</div>
			<div className={classes['seller']}>
				<span>
					Sold by {data.sellerName ? data.sellerName : 'dummy'} and brought to
					you by Kirana, your local love &#128539;
				</span>
			</div>
			<div className={classes['quantity']}>
				<span>Quantity: </span>
				<span>
					<select onChange={(e) => setCartItemQuantity(e.target.value)}>
						{Array(
							totalQuantity > 5 ? 5 : totalQuantity !== 0 ? totalQuantity : 1
						)
							.fill(0)
							.map((data, ind) => ind + 1)
							.map((data) => (
								<option key={data} value={data}>
									{data}
								</option>
							))}
					</select>
				</span>
			</div>
			<div className={classes['add-cart']}>
				<span>
					<button
						className={classes['add-btn']}
						disabled={checkTotalQuant >= 1 ? false : true}
						onClick={addToCartHandler}
					>
						Add to Cart
					</button>
				</span>
			</div>
			<div className={classes['buy-now']}>
				<span>
					<button
						className={classes['add-btn']}
						disabled={checkTotalQuant >= 1 ? false : true}
					>
						Buy Now
					</button>
				</span>
			</div>
			<div className={classes.secureTransaction}>
				<Link to="#">
					<Lock width="1.25rem" height="1.25rem" />
					<span>Secure Transaction</span>{' '}
				</Link>
			</div>
			<hr />
			<div className={classes.pin}>PIN should be added here</div>
		</div>
	);
};

export default MainContent;
