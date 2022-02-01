import { Link } from 'react-router-dom';

import ChevronDown from '../Icons/Chevron/ChevronDown';

import classes from './Dropdown.module.scss';

const Dropdown = (props) => {
	return (
		<div className="wrapper">
			<div className={classes.dropdown}>
				<a href="#" className={classes.btn}>
					<span>{props.defaultValue || `Default value`}</span>
					<ChevronDown className={classes.symbol} />
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
