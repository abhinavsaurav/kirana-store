import { Link } from 'react-router-dom';
import classes from './CartItem.module.scss';
const CartItem = ({
	id,
	name,
	image,
	countInStock,
	price,
	qty,
	deleteBtnHandler,
	history,
	toggleShowModal,
}) => {
	console.log(countInStock + '  ' + qty);

	const linkClickHandler = (e) => {
		e.preventDefault();
		console.log('I am printing');
		toggleShowModal();
		history.push(`/products/${id}`);
	};

	return (
		<div className={classes['cart-item']}>
			<div className={classes['col--img']}>
				<img src={image} alt={name} />
			</div>
			<div className={classes['col--item-details']}>
				<ul>
					<li className={classes.name}>
						<span>
							<Link to={'#'} onClick={linkClickHandler}>
								{name}
							</Link>
						</span>
					</li>

					<li className={+countInStock >= +qty ? classes.green : classes.red}>
						<span>{+countInStock >= +qty ? 'In Stock' : 'Out Of Stock'}</span>
					</li>
					<li className={classes.dummy}></li>
				</ul>
				<p className={classes['quant-delete']}>
					<span>Quantity: </span>
					<span>{qty}</span>
					<span>{`|`}</span>
					<span>
						<button onClick={() => deleteBtnHandler(id)}>Delete</button>
					</span>
				</p>
			</div>
			<div className={classes['col-item-price']}>
				<span>{price}</span>
			</div>
		</div>
	);
};

export default CartItem;
