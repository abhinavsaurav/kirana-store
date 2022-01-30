import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, Link, useHistory } from 'react-router-dom';

import classes from './MainHeader.module.scss';
import Modal from '../../UI/modal/Modal';
import Dropdown from '../../UI/dropdown/Dropdown.js';
import InputField from '../../UI/input/InputField.js';

// just to test the modal taking in pics this can be removed
import Pic1 from '../../../assets/pictures/carousel/pic1.png';
import HeaderCartButton from './HeaderCartButton';
import Cart from '../../cart/Cart';
import useAuth from '../../../hooks/useAuth';
import useDimension from '../../../hooks/useDimension';
import { useEffect } from 'react';
// import useDimension from '../../../hooks/useDimension';

const MainHeader = () => {
	const [searchText, setSearchText] = useState('');
	const [showPinModal, setShowPinModal] = useState(false);
	const [showCartModal, setShowCartModal] = useState(false);

	const history = useHistory();

	const auth = useAuth();

	// still not performant enough
	const dimension = useDimension();

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

	// **********************************************
	// * Header sections
	// **********************************************

	const Logo = () => (
		<NavLink
			exact
			activeClassName={classes.active}
			to="/"
			className={classes.logo}
		>
			KiranaStore
		</NavLink>
	);

	const Pin = () => (
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
	);

	const Category = () => (
		<div className={`${classes['search-select']} ${classes.category}`}>
			<select>
				<option>All</option>
				<option>nonedddddd</option>
			</select>
		</div>
	);

	const SearchBar = () => (
		<div className={classes[`search-bar`]}>
			<InputField
				type="text"
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
				onKeyUp={checkEnterKeyPress}
			/>
		</div>
	);

	const SearchBtn = () => (
		<div className={classes.searchbtn}>
			<button onClick={handleSearchBtnClick}>
				<FontAwesomeIcon icon="search" />
			</button>
		</div>
	);

	const LoginStatus = () => (
		<NavLink
			exact
			to="/login"
			activeClassName={classes.active}
			className={classes.login}
		>
			{auth.isAuthenticated ? (
				<Dropdown defaultValue={`Hi ${auth.userInfo.name}`}>
					<a href="/search?item='test'">test1</a>
					<a href="#">test2</a>
					<a href="#">test3</a>
				</Dropdown>
			) : (
				`Login/off`
			)}
		</NavLink>
	);

	const CartBtn = () => (
		<NavLink
			to="#"
			onClick={(e) => toggleShowCartModal()}
			className={classes['cart-wrapper']}
		>
			<div className={classes['cart-btn']}>
				<HeaderCartButton />
			</div>
			<Modal show={showCartModal} toggleShowModal={toggleShowCartModal}>
				{/* <img src={Pic1} alt="dummy" /> */}
				<Cart toggleShowModal={toggleShowCartModal} history={history} />
			</Modal>
		</NavLink>
	);

	const [dynamicWidth, setDynamicWidth] = useState(dimension.width);
	useEffect(() => {
		setDynamicWidth(dimension.width);
	}, [dimension.width]);

	return (
		<header>
			<nav className={classes['header-nav']} style={{ width: dynamicWidth }}>
				{/* <div className={classes['nav-content-wrapper']}> */}
				{/* <div>Width:{dimension.width}</div> */}
				<Logo />
				<Pin />
				<div className={classes['search-elem']}>
					<div className={classes['outline-elem']}>
						<Category />
						<SearchBar />
						<SearchBtn />
					</div>
				</div>
				<LoginStatus />
				<CartBtn />
				{/* </div> */}
			</nav>
		</header>
	);
};

export default MainHeader;
