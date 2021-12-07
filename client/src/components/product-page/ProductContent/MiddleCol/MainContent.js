import { Link } from 'react-router-dom';
import StarRating from '../../../UI/star-rating/StarRating';
import classes from './MainContent.module.scss';

const MainContent = ({ data }) => {
	function processDescription(data) {
		console.log(data.replace(/\./g, ';'));
		return data
			.replace(/,/g, ';')
			.replace(/\./g, ';')
			.split(';')
			.map((data) => (data.length > 1 ? <li>{data}</li> : ''));
	}

	console.log(data);
	return (
		<div className={classes.container}>
			<div className={classes.title}>
				<span>{data.title}</span>
			</div>
			<div className={classes.brand}>
				{/* Currently making the brand as the category */}
				<Link to={`/search?item=dummy&category=${data.category}`}>
					<span>Brand : </span>
					<span>{data.category}</span>
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
									(data.rating.rate * 10) % 10 >= 5
										? Math.ceil(data.rating.rate)
										: Math.floor(data.rating.rate)
								}
								isHoverDisabled="true"
							/>
						</span>

						<span>{data.rating.count} ratings</span>
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
							<td>{data.price}</td>
						</tr>
						<tr>
							<td>Price</td>
							<td>:</td>
							<td>{data.salePrice ? data.salePrice : data.price}</td>
						</tr>
						<tr>
							<td>You Save </td>
							<td>:</td>
							<td>
								Rs. {data.salePrice ? data.price - data.salePrice : 0}(% not
								added)
							</td>
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
						{typeof data.description === 'string'
							? processDescription(data.description)
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
