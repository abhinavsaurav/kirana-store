import { useSelector } from 'react-redux';

const useAuth = () => {
	const auth = useSelector((state) => state.auth);
	const { isAuthenticated, userInfo, token, status, error } = auth;

	if (!isAuthenticated) {
		return { isAuthenticated, status, error };
	}
	return { isAuthenticated, status, userInfo, token };
};

export default useAuth;
