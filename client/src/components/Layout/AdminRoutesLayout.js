import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../UI/routes/PrivateRoute';
import ManageUsers from '../admin/ManageUsers';
import ManageProducts from '../admin/ManageProducts';
import ManageOrders from '../admin/ManageOrders';
import Insights from '../admin/Insights';

const AdminRoutesLayout = () => {
	return (
		<div>
			<h1>Admin Section</h1>
			<div>
				<Switch>
					<PrivateRoute path="/admin/insights" component={Insights} />
					<PrivateRoute path="/admin/users" exact component={ManageUsers} />
					<PrivateRoute
						path="/admin/products"
						exact
						component={ManageProducts}
					/>
					<PrivateRoute path="/admin/orders" exact component={ManageOrders} />
					<Redirect to="/admin/insights" />
				</Switch>
			</div>
		</div>
	);
};

export default AdminRoutesLayout;
