import ProductContainer from './ProductContainer';
import { Link } from 'react-router-dom';
import classes from './ProductCard.module.scss';

const ProductCard = ({ data, width, height }) => {
	if (data) {
		console.log(data);
		const { id, image, title, rating, price, name } = data;
		// console.log(price);

		return (
			<div
				className={classes['squarish-product-card']}
				style={{ width: width, height: height }}
			>
				<Link className={classes.linkwrapper} to={`/products/${id}`}>
					<div id={id} className={classes['product-img']}>
						<img alt={title} src={image} />
					</div>
				</Link>
				<div className={classes['product-details-container']}>
					<div className="wrapper">
						<ProductContainer
							id={id}
							name={name}
							title={title} //might need to remove this
							rating={rating}
							price={price}
						/>
					</div>
				</div>
			</div>
		);
	}
	return 'Loading..';
};

export default ProductCard;
