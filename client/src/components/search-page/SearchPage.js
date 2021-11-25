import React from 'react'; // At starting not declaring it was causing errors
import FilterList from './FilterList/FilterList';
import SearchResult from './SearchResult/SearchResult';

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
	return (
		<div>
			<FilterList />
			<SearchResult />
		</div>
	);
};

export default SearchPage;
