import { useSelector } from 'react-redux';

const useAuth = () => {
	const auth = useSelector((state) => state.auth);
	const { isAuthenticated, userInfo, token, status, error, hasRedirected } =
		auth;

	if (!isAuthenticated) {
		return { isAuthenticated, status, error, hasRedirected };
	}
	return { isAuthenticated, status, userInfo, token, hasRedirected };
};

export default useAuth;
