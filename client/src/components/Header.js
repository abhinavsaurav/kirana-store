import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
 
import './Header.scss';

const Header = () =>{
    const [searchText, setSearchText] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <header>
            <div className="logo">
                <div className="logo-align">
                logo
                </div>
            </div>
            <div className="site-name">
                PinLocation
            </div>
            <div className="searchbar">
                <input type="text" value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
            </div>
            <div className="login-btn">
                <Link to="/login">Login/off</Link>
            </div>
            <div className="cart-btn">
                <FontAwesomeIcon icon="shopping-cart" />
            </div>
        </header>
    );
};

export default Header;