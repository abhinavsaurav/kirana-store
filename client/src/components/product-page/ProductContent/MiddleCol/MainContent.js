import { Link } from 'react-router-dom';
import StarRating from '../../../UI/star-rating/StarRating';
import classes from './MainContent.module.scss';

const MainContent = ({ data }) => {
	// * salePrice should be added for discounts
	const {
		name,
		rating,
		brand,
		numReviews,
		price,
		description,
		category,
		salePrice,
	} = data;

	function processDescription(data) {
		return data
			.replace(/,/g, ';')
			.replace(/\./g, ';')
			.split(';')
			.map((data, ind) => (data.length > 1 ? <li key={ind}>{data}</li> : ''));
	}

	return (
		<div className={classes.container}>
			<div className={classes.title}>
				<span>{name}</span>
			</div>
			<div className={classes.brand}>
				{/* Currently making the brand as the category */}
				<Link to={`/search?category=${category}&brand=${brand}`}>
					<span>Brand : </span>
					<span>{brand}</span>
				</Link>
			</div>
			<div className={classes.links}>
				<div className={classes.rating}>
					<Link to="#">
						<span>
							<StarRating
								color="orange"
								noOfStars="5"
								defaultRating={
									rating
									// (rating * 10) % 10 >= 5
									// 	? Math.ceil(rating)
									// 	: Math.floor(rating)
								}
								isHoverDisabled="true"
							/>
						</span>
						{/* <Link to="#"> */}
						<span>{numReviews}</span>
						<span>&nbsp;reviews</span>
						{/* </Link> */}
					</Link>
				</div>
				{/**
				 * TODO: Need to add a no of question answered tag in a seprate div and
				 *       group them
				 *  */}
			</div>
			<div className={classes['unified-price']}>
				<table>
					<tbody>
						<tr>
							<td>MRP </td>
							<td>:</td>
							<td>{price}</td>
						</tr>
						<tr>
							<td>Price</td>
							<td>:</td>
							<td>{salePrice ? salePrice : price}</td>
						</tr>
						<tr>
							<td>You Save </td>
							<td>:</td>
							<td>Rs. {salePrice ? price - salePrice : 0}(% not added)</td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td>Inclusive of all taxes</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={classes['item-information']}>
				<div className={classes.heading}>
					<span>About this item :</span>
				</div>
				<div className={classes['heading-content']}>
					<ul>
						{typeof description === 'string'
							? processDescription(description)
							: 'Data problem could be corrupted'}
						<li>
							<Link to="#">See more product details</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default MainContent;
