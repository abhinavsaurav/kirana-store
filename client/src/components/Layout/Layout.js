import { Fragment } from "react";
// import classes from "./Layout.module.scss";
import MainHeader from "./Header/MainHeader";
import MainFooter from "./Footer/MainFooter";

const Layout = (props) => {
	return (
		<Fragment>
			<MainHeader />
			<Fragment>{props.children}</Fragment>
			<MainFooter />
		</Fragment>
	);
};

export default Layout;
