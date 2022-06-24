import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../UI/routes/PrivateRoute';
import ManageUsers from '../admin/ManageUsers';
import ManageProducts from '../admin/ManageProducts';
import ManageOrders from '../admin/ManageOrders';
import Insights from '../admin/Insights';
import useAuth from '../../hooks/useAuth';
import classes from './AdminRoutesLayout.module.scss';

const AdminRoutesLayout = () => {
	const auth = useAuth();

	if (auth.isAuthenticated && !auth.userInfo.isAdmin) {
		return (
			<>
				{/* <Switch> */}
				<Redirect to="/" />
				{/* </Switch> */}
			</>
		);
	}

	return (
		<div className={classes['admin-container']}>
			<div className={classes.sidebar}>
				<div className={classes.header}>
					<h1>Admin</h1>
				</div>
			</div>
			{/* <div className={classes.separator}></div> */}
			<div className={classes.body}>
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
