import React, { useEffect, useState } from 'react'; // At starting not declaring it was causing errors
import { useLocation } from 'react-router-dom';

import FilterList from './FilterList/FilterList';
import SearchResult from './SearchResult/SearchResult';
import classes from './SearchPage.module.scss';

/**
 *  TODO:
 * 
    Based on the filter selected modify the search result which we get after getting 
    from the server maybe it will be paginated or not if we don't have the filtered 
    result upto the same level or we need to query for additional data
    * 
    * 
*/
const SearchPage = () => {
	// This is a fake data and needs to be removed upon integration also this search needs to be made based
	// off on the link and the keyword upon it

	const [data, setData] = useState([]);

	let path = useLocation();
	let term = new URLSearchParams(path.search).get('item');

	useEffect(() => {
		if (term) {
			const fetchSearchResult = async (path) => {
				const response = await fetch('https://fakestoreapi.com/products');
				return response.json();
			};
			fetchSearchResult().then((res) => setData(res));
		}
	}, [term]);

	return (
		<div className={classes.container}>
			<FilterList />
			{/* <div className={classes['vertical-line']} /> */}
			{/* <div className={classes['vertical-line']}>hi</div> */}
			{data ? <SearchResult data={data} /> : 'No item found'}
		</div>
	);
};

export default SearchPage;
