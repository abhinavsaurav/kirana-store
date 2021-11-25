import { Link } from 'react-router-dom';
import StarRating from '../../UI/star-rating/StarRating';
import FilterLinks from './FilterLinks';
import classes from './FilterList.module.scss';

const FilterList = () => {
	return (
		<div>
			{/* TODO: Probably category include it and add its subcategory once integration is done*/}
			<div className={classes['filter-section']}>
				<div className={classes['filter-name']}>
					<span>Customer Review</span>
				</div>
				<div className={classes['filter-main']}>
					<StarRating />
				</div>
			</div>
			<div className={classes['filter-section']}>
				<div className={classes['filter-name']}>
					<span>Price</span>
				</div>
				<ul className={`${classes['filter-main']} ${classes['list']}`}>
					{/* Keep in mind we should make it variable so that the below
						 changes with category after which we will pass the ul tag 
						 above inside and get it based of the api call we will probably
						 receive a array of the category discount 
						 which we can then pass to FilterLinks and it will 
						 generate all the links and such based off of that and 
						 probably we need to pass a function with this so that 
						 it will be able to modify the 


					*/}
					<FilterLinks url="#">Under &#8377;500</FilterLinks>
					<FilterLinks url="#">&#8377;500 - &#8377;1000</FilterLinks>
					<FilterLinks url="#">&#8377;1000 - &#8377;1500</FilterLinks>
					<FilterLinks url="#">&#8377;1500 - &#8377;2500</FilterLinks>
					<FilterLinks url="#">&#8377;2500 - &#8377;5000</FilterLinks>
					<FilterLinks url="#">&#8377;5000 & up!</FilterLinks>
				</ul>
			</div>
			<div className={classes['filter-section']}>
				<div className={classes['filter-name']}>
					<span>Discount</span>
				</div>
				<ul
					className={`${classes['filter-main']} ${classes['list']}`}
					// Added style here for now <- added it in the file
					// style={{ listStyle: 'none', padding: '0 0 0 10px', margin: '0px' }}
				>
					<FilterLinks url="#">10% Off or more</FilterLinks>
					<FilterLinks url="#">25% Off or more</FilterLinks>
					<FilterLinks url="#">35% Off or more</FilterLinks>
					<FilterLinks url="#">50% Off or more</FilterLinks>
					<FilterLinks url="#">60% Off or more</FilterLinks>
					<FilterLinks url="#">70% Off or more</FilterLinks>
				</ul>
			</div>
			<div className={classes['filter-section']}>
				<div className={classes['filter-name']}>
					<span>Pay on delivery</span>
				</div>
				<div className={classes['filter-main']}>
					<input id="pod" type="checkbox" />
					<label htmlFor="pod">Eligible for Pay on delivery</label>
				</div>
			</div>
			<div className={classes['filter-section']}>
				<div className={classes['filter-name']}>
					<span>Availability</span>
				</div>
				<div className={classes['filter-main']}>
					<input id="availability" type="checkbox" />
					<label htmlFor="availability">Include out of stock</label>
				</div>
			</div>
		</div>
	);
};

export default FilterList;
