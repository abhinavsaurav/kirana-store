import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useHistory } from 'react-router-dom';

import classes from './MainHeader.module.scss';
import Modal from '../../UI/modal/Modal';

// just to test the modal taking in pics this can be removed
import Pic1 from '../../../assets/pictures/carousel/pic1.png';
import HeaderCartButton from './HeaderCartButton';
import Cart from '../../cart/Cart';
import useAuth from '../../../hooks/useAuth';

const MainHeader = () => {
	const [searchText, setSearchText] = useState('');
	const [showPinModal, setShowPinModal] = useState(false);
	const [showCartModal, setShowCartModal] = useState(false);
	// const [isLoggedIn, setIsLoggedIn] = useState(false);

	const history = useHistory();

	const auth = useAuth();

	const toggleShowPinModal = () => {
		setShowPinModal(!showPinModal);
	};

	const toggleShowCartModal = () => {
		setShowCartModal(!showCartModal);
	};

	const handleSearchBtnClick = () => {
		// console.log(searchText + ' ');
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
					to="#"
					className={classes.pin}
					onClick={(e) => toggleShowPinModal()}
				>
					<span>Deliver to</span>
					<FontAwesomeIcon icon="map-marked-alt" />
					<Modal show={showPinModal} toggleShowModal={toggleShowPinModal}>
						<img src={Pic1} alt="dummy" />
					</Modal>
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
					{auth.isAuthenticated ? `Hi ${auth.userInfo.name}` : `Login/off`}
				</NavLink>
				<NavLink to="#" onClick={(e) => toggleShowCartModal()}>
					<div className={classes['cart-btn']}>
						<HeaderCartButton />
					</div>
					<Modal show={showCartModal} toggleShowModal={toggleShowCartModal}>
						{/* <img src={Pic1} alt="dummy" /> */}
						<Cart toggleShowModal={toggleShowCartModal} history={history} />
					</Modal>
				</NavLink>
			</nav>
		</header>
	);
};

export default MainHeader;
