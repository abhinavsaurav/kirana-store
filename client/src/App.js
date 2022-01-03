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
	return (
		<div className={classes.App}>
			<CartProvider>
				<Router>
					{/**
					 *  Layout Component starts here
					 *
					 *  */}
					<Layout>
						<main>
							<Switch>
								<Route path="/" exact>
									<DefaultPage />
								</Route>
								<Route path="/login" exact component={Login} />
								<Route path="/search" exact>
									<SearchPage />
								</Route>
								<Route path="/products/:id" exact component={ProductPage} />
								<Route path="/">
									<Redirect to="/" />
								</Route>
							</Switch>
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
