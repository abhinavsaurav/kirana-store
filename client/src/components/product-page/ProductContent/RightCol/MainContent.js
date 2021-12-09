import { useEffect, useState } from 'react';
import Lock from '../../../UI/Icons/Lock/Lock';
import classes from './MainContent.module.scss';

const MainContent = ({ data }) => {
	const checkTotalQuant = data.quantity;

	// setting the quantity here and
	const [quantity, setQuantity] = useState(1);

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
					<select onChange={(e) => setQuantity(e.target.value)}>
						{Array(6)
							.fill(0)
							.map((data, ind) => ind + 1)
							.map((data) => (
								<option value={data}>{data}</option>
							))}
					</select>
				</span>
			</div>
			<div className={classes['add-cart']}>
				<span>
					<button
						className={classes['add-btn']}
						disabled={checkTotalQuant >= 1 ? false : true}
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
				<a href="#">
					<Lock width="1.25rem" height="1.25rem" />
					<span>Secure Transaction</span>{' '}
				</a>
			</div>
			<hr />
			<div className={classes.pin}>PIN should be added here</div>
		</div>
	);
};

export default MainContent;
