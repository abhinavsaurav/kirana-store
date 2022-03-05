import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

import useDimension from '../../../hooks/useDimension';

import LoginStatus from './main-header-sections/LoginStatus';
import Cart from '../../cart/Cart';
import Modal from '../../UI/modal/Modal';
import InputField from '../../UI/input/InputField.js';
import HeaderCartButton from './main-header-sections/HeaderCartButton';

import classes from './MainHeader.module.scss';
import Pic1 from '../../../assets/pictures/carousel/pic1.png';

const MainHeader = () => {
	const [searchText, setSearchText] = useState('');
	const [showPinModal, setShowPinModal] = useState(false);
	const [showCartModal, setShowCartModal] = useState(false);

	const history = useHistory();
	const location = useLocation();

	const dimension = useDimension();

	console.log(/^\/checkout\//.test(location.pathname));

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

	const SearchBtn = () => (
		<div className={classes.searchbtn}>
			<button onClick={handleSearchBtnClick}>
				<FontAwesomeIcon icon="search" />
			</button>
		</div>
	);

	const CartBtn = () => (
		<button
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
		</button>
	);

	// Maybe
	const [dynamicWidth, setDynamicWidth] = useState(dimension.width);
	useEffect(() => {
		setDynamicWidth(dimension.width);
	}, [dimension.width]);

	return (
		<header>
			<nav
				className={
					/^\/checkout\//.test(location.pathname)
						? `${classes['lone-header']} ${classes['header-nav']}`
						: `${classes['header-nav']}`
				}
				style={{ width: dynamicWidth }}
			>
				{/* <div className={classes['nav-content-wrapper']}> */}
				{/* <div>Width:{dimension.width}</div> */}
				<Logo />
				{/^\/checkout\//.test(location.pathname) ? (
					''
				) : (
					<>
						<Pin />
						{/** //! Below div encapsulates the search bar along with its category and searchbtn as a whole  */}
						<div className={classes['search-elem']}>
							<div className={classes['outline-elem']}>
								<Category />
								<div className={classes[`search-bar`]}>
									<InputField
										type="text"
										value={searchText}
										onChange={(e) => setSearchText(e.target.value)}
										onKeyUp={checkEnterKeyPress}
									/>
								</div>
								<SearchBtn />
							</div>
						</div>
						<LoginStatus classes={classes} />
						<CartBtn />
					</>
				)}
			</nav>
		</header>
	);
};

export default MainHeader;

// * Below commented code for search bar but it doesn't factor in the compoenent change making
// * this unnecessary complicated for some reason
// const runner = (e) => {
// 	console.log(e.target.value);
// 	setSearchText(e.target.value);
// };

// const SearchBar = (props) => (
// 	<div className={classes[`search-bar`]}>
// 		<InputField
// 			type="text"
// 			value={searchText}
// 			onChange={props.onChange}
// 			onKeyUp={props.onKeyUp}
// 		/>
// 	</div>
// );
