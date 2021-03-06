import { useContext } from 'react';
import CartContext from '../../../../contexts/cart/CartContext';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import { logout } from '../../../../store/authActions';
import Dropdown from '../../../UI/dropdown/Dropdown.js';

const LoginStatus = ({ classes }) => {
	const auth = useAuth();
	const dispatch = useDispatch();
	const history = useHistory();
	const cartCtx = useContext(CartContext);
	// const location = useLocation();

	const logoutDispatcher = async (e) => {
		e.preventDefault();
		console.log('firing');
		await dispatch(logout(auth.token));
		await cartCtx.resetItems();
		localStorage.removeItem('cartData');
		// if (location.pathname !== '/') {
		history.push('/login');
		// }
	};

	return (
		<div
			// exact
			// to="/login"
			// ClassName={classes.active}
			className={classes.login}
		>
			{auth.isAuthenticated ? (
				<Dropdown defaultValue={`Hi ${auth.userInfo.name}`}>
					<a href="/search?item='test'">My profile</a>
					<a href="#" onClick={logoutDispatcher}>
						Log out
					</a>
					{/* <a href="#">test3</a> */}
				</Dropdown>
			) : (
				<NavLink to="/login">Login/off</NavLink>
			)}
		</div>
	);
};

export default LoginStatus;
