import { Link } from 'react-router-dom';
import Dropdown from '../../../UI/dropdown/Dropdown';

const AdminButton = ({ classes }) => {
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
};

export default AdminButton;
