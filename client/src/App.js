// import logo from './logo.svg';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DefaultPage from "./components/DefaultPage";
import Login from "./components/login/Login";

library.add(faShoppingCart);

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<main>
					<switch>
						<Route path="/" exact component={DefaultPage} />
						<Route path="/login" exact component={Login} />
					</switch>
				</main>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
