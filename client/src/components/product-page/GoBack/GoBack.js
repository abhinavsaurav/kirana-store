import { useHistory, Link } from 'react-router-dom';
import classes from './GoBack.module.scss';

/**
 *
 * @param {*} props
 * @returns should return go back to results if searched for a result otherwise
 *          if we are looking for a category then it should display the category and
 *          the drop down accordingly
 *
 */

const GoBack = (props) => {
	const history = useHistory();

	return (
		<div className={classes['go-back']}>
			<ul>
				<li className={classes['li-symbol']}>
					<span>
						{props.symbol || (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className={classes['symbol']}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						)}
					</span>
				</li>
				<li className={classes['back-link']}>
					<Link onClick={() => history.goBack()}>
						<span>{props.message}</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default GoBack;
