import { Link } from 'react-router-dom';

const FilterLinks = (props) => {
	return (
		<li>
			<Link to={props.url}>
				<span>{props.children}</span>
			</Link>
		</li>
	);
};

export default FilterLinks;
