import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useHistory } from 'react-router-dom';

import classes from './MainHeader.module.scss';

const MainHeader = () => {
	const [searchText, setSearchText] = useState('');
	// const [isLoggedIn, setIsLoggedIn] = useState(false);
	const history = useHistory();

	const handleSearchBtnClick = () => {
		console.log(searchText + ' ');
		if (searchText !== '') {
			history.push(`/search?item=${searchText}`);
			// will not set the search text to '' here and should be done on clicking the main link
			// which should be integrated into redux i believe
		}

		return;
	};

	const checkEnterKeyPress = (e) => {
		console.log(e);
		if (e.keyCode === 13) {
			handleSearchBtnClick();
		}
	};

	return (
		<header>
			<nav className={classes['header-nav']}>
				<NavLink
					exact
					activeClassName={classes.active}
					to="/"
					className={classes.logo}
				>
					KiranaStore
				</NavLink>
				<NavLink
					exact
					activeClassName={classes.active} // check about this part when to be active as its added in the above thing
					to="/pin"
					className={classes.pin}
				>
					Deliver to
					<FontAwesomeIcon icon="map-marked-alt" />
				</NavLink>
				<div className={classes['search-select']}>
					<select>
						<option>All</option>
						<option>nonedddddd</option>
					</select>
				</div>
				<div className={classes['nav-fill']}>
					<input
						type="text"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						onKeyUp={checkEnterKeyPress}
					/>
				</div>
				<div className={classes.srchbtn}>
					<button onClick={handleSearchBtnClick}>
						<FontAwesomeIcon icon="search" />
					</button>
				</div>
				<NavLink
					exact
					to="/login"
					activeClassName={classes.active}
					className={classes.login}
				>
					Login/off
				</NavLink>

				<div className={classes['cart-btn']}>
					<span>
						<FontAwesomeIcon icon="shopping-cart" />
						{` 10`}
					</span>
					Cart
				</div>
			</nav>
		</header>
	);
};

export default MainHeader;
