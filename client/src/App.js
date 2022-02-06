// import logo from './logo.svg';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faShoppingCart,
	faSearch,
	faMapMarkedAlt,
	faGhost,
	faStar,
	faShoppingBasket,
} from '@fortawesome/free-solid-svg-icons';

import { faStar as faStarHollow } from '@fortawesome/free-regular-svg-icons';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import DefaultPage from './components/DefaultPage';
import Login from './components/login/Login';
import Layout from './components/Layout/Layout';
import SearchPage from './components/search-page/SearchPage';

import classes from './App.module.scss';
import ProductPage from './components/product-page/ProductPage';

import CartProvider from './contexts/cart/CartProvider';
import PrivateRoute from './components/UI/routes/PrivateRoute';
import Address from './components/address-page/Address';
import Signup from './components/signup/Signup';
import { useEffect, useState } from 'react';

library.add(
	faShoppingCart,
	faSearch,
	faMapMarkedAlt,
	faGhost,
	faShoppingBasket,
	faStar,
	faStarHollow
);

function App() {
	// const [loading, setLoading] = useState(true);
	// const auth = useAuth();

	useEffect(() => {
		const elem = document.getElementById('pre-loader');
		elem.remove();
		clearInterval(window.timeoutId);
	});
	// 	return elem.removeEventListener('loading');
	// }, []);

	// if (loading) {
	// 	return 'loading';
	// }

	return (
		<div id="app" className={classes.App}>
			<CartProvider>
				<Router>
					{/**
					 *  Layout Component starts here
					 *
					 *  */}
					<Layout>
						<main>
							<div className={classes['main-wrapper']}>
								<Switch>
									<Route path="/" exact>
										<DefaultPage />
									</Route>
									<Route path="/login" exact component={Login} />
									<Route path="/users/signup" component={Signup} />
									<PrivateRoute path="/address-select" component={Address} />
									<PrivateRoute
										path="/orders/payment-selection"
										component={<div>Payment page</div>}
									/>
									<PrivateRoute
										path="/orders/review-order"
										component={<div>Review order</div>}
									/>
									<Route path="/search" exact>
										<SearchPage />
									</Route>
									<Route path="/products/:id" exact component={ProductPage} />
									<Route path="/">
										<Redirect to="/" />
									</Route>
								</Switch>
							</div>
						</main>
					</Layout>
				</Router>
			</CartProvider>
		</div>
	);
}

export default App;

/**
 *
 *
 *
 *
 *
 */
