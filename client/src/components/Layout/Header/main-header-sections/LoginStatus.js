import { useContext, useEffect } from 'react';
import CartContext from '../../../../contexts/cart/CartContext';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import { logout } from '../../../../store/authActions';
import Dropdown from '../../../UI/dropdown/Dropdown.js';

const LoginStatus = ({ classes }) => {
	const auth = useAuth();
	const dispatch = useDispatch();
	const history = useHistory();
	const cartCtx = useContext(CartContext);
	const location = useLocation();

	useEffect(() => {
		if (!auth.isAuthenticated) {
			console.log('i am running');
			cartCtx.resetItems();
			localStorage.removeItem('cartData');
			if (location.pathname !== '/') {
				history.push('/login'); // removing this removes the
			}
		}
	}, [auth.isAuthenticated]);

	const logoutDispatcher = async (e) => {
		e.preventDefault();
		console.log('firing');
		localStorage.removeItem('cartData');
		await dispatch(logout(auth.token));
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
					<Link to="/search?item='test'">My profile</Link>
					<Link to="#" onClick={logoutDispatcher}>
						Log out
					</Link>
					{/* <a href="#">test3</a> */}
				</Dropdown>
			) : (
				<NavLink to="/login">Login/off</NavLink>
			)}
		</div>
	);
};

export default LoginStatus;
