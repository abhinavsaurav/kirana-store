import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const PrivateRoute = (props) => {
	const auth = useAuth();

	return (
		<>
			{auth.isAuthenticated ? (
				<Route {...props} />
			) : (
				<Redirect to={`/login?ret=${props.path}`} />
			)}
		</>
	);
};

export default PrivateRoute;
