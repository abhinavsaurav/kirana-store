import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../../../star-rating/StarRating';
import classes from './ProductContainer.module.scss';

const ProductContainer = ({ id, name, rating, price, numReviews }) => {
	// console.log(price);
	const path = `/products/${id}`;
	return (
		<Fragment>
			<Link className={classes.name} to={path}>
				<div>{name}</div>
			</Link>
			<div className={classes.rating}>
				<StarRating
					color="orange"
					noOfStars="5"
					defaultRating={rating}
					isHoverDisabled="true"
				/>
				<Link className={classes.count} to={path}>
					<span>{numReviews}</span>
				</Link>
			</div>
			<div className={classes.price}>
				<span>Rs.</span>
				<span>{price}</span>
			</div>
		</Fragment>
	);
};

export default ProductContainer;
