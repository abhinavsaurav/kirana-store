import classes from './Dropdown.module.scss';
import { Link } from 'react-router-dom';

const Dropdown = (props) => {
	return (
		<div className="wrapper">
			<div className={classes.dropdown}>
				<a href="#" className={classes.btn}>
					{props.defaultValue || `Default value`}
				</a>
				<div className={classes['dropdown-content']}>
					{props.children || (
						<>
							<Link to="#">{props.defaultValue || `Default value`}</Link>
							<Link to="#">{props.defaultValue || `Default value`}</Link>
							<Link to="#">{props.defaultValue || `Default value`}</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dropdown;
