// import { useEffect, useState } from 'react';
import ProductCard from '../../UI/card/ProductCards/SmallCard/ProductCard';
import classes from './SearchResult.module.scss';
// import useDimension from '../../../hooks/useDimension';

const SearchResult = ({ data }) => {
	/**
	 * Not using this now needs some modification to take care of performance issue
	 */
	// const [width, height] = useDimension();
	// let width;
	// if (window.innerWidth > 700) {
	// 	width = window.innerWidth - 350;
	// }

	const renderProuctCard = data.map((val, ind) => (
		<ProductCard key={ind} data={val} width="260px" />
	));

	return (
		<div className={classes['result-container']} style={{}}>
			<div className={classes['ad-container']}>Can be Advertisements</div>
			<div className={classes['search-results']}>{renderProuctCard}</div>
		</div>
	);
};

export default SearchResult;
