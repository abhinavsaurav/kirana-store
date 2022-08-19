import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import Dropdown from '../../../UI/dropdown/Dropdown';

const AdminButton = ({ classes }) => {
	const auth = useAuth();

	if (auth.isAuthenticated && auth.userInfo.isAdmin) {
		return (
			<div className={classes.admin}>
				<Dropdown defaultValue="Admin">
					<Link to="/admin/">Insights</Link>
					<Link to="/admin/users">Manage Users</Link>
					<Link to="/admin/products">Manage Users</Link>
					<Link to="/admin/orders">Manage Users</Link>
				</Dropdown>
			</div>
		);
	}

	return <></>;
};

export default AdminButton;
