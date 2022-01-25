import ProductContainer from './ProductContainer';
import { Link } from 'react-router-dom';
import classes from './ProductCard.module.scss';

const ProductCard = ({ data, width, height }) => {
	if (data) {
		// console.log(data);
		const {
			_id,
			// brand,
			// category,
			// countInStock,
			// description,
			image,
			name,
			numReviews,
			price,
			rating,
		} = data;
		// console.log(price);

		return (
			<div
				className={classes['squarish-product-card']}
				style={{ width: width, height: height }}
			>
				<Link className={classes.linkwrapper} to={`/products/${_id}`}>
					<div id={_id} className={classes['product-img']}>
						<img alt={name} src={image} />
					</div>
				</Link>
				<div className={classes['product-details-container']}>
					<div className="wrapper">
						<ProductContainer
							id={_id}
							name={name} //might need to remove this
							rating={rating}
							price={price}
							numReviews={numReviews}
						/>
					</div>
				</div>
			</div>
		);
	}
	return 'Loading..';
};

export default ProductCard;
