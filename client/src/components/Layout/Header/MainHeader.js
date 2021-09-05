import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

import classes from "./MainHeader.module.scss";

const MainHeader = () => {
	const [searchText, setSearchText] = useState("");
	// const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<header>
			<nav className={classes["header-nav"]}>
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
					activeClassName={classes.active}
					to="/pin"
					className={classes.pin}
				>
					Deliver to
					<FontAwesomeIcon icon="map-marked-alt" />
				</NavLink>
				<div className={classes["search-select"]}>
					<select>
						<option>All</option>
						<option>nonedddddd</option>
					</select>
				</div>
				<div className={classes["nav-fill"]}>
					<input
						type="text"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					/>
				</div>
				<div className={classes.srchbtn}>
					<button>
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

				<div className={classes["cart-btn"]}>
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
