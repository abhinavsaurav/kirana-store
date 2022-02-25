import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const PrivateRoute = ({ children, component, ...props }) => {
	const auth = useAuth();

	return (
		<>
			{auth.isAuthenticated ? (
				component ? (
					<Route {...props} component={component} />
				) : (
					<Route {...props}>{children}</Route>
				)
			) : (
				<Redirect to={`/login?ret=${props.path}`} />
			)}
		</>
	);
};

export default PrivateRoute;
