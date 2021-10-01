// import logo from './logo.svg';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faShoppingCart,
	faSearch,
	faMapMarkedAlt,
	faGhost,
	faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import DefaultPage from "./components/DefaultPage";
import Login from "./components/login/Login";
import Layout from "./components/Layout/Layout";
import classes from "./App.module.scss";

library.add(
	faShoppingCart,
	faSearch,
	faMapMarkedAlt,
	faGhost,
	faShoppingBasket
);

function App() {
	return (
		<div className={classes.App}>
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
							<Route path="/">
								<Redirect to="/" />
							</Route>
						</Switch>
					</main>
				</Layout>
			</Router>
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
