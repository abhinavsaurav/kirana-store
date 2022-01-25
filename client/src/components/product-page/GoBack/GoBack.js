import { useHistory } from 'react-router-dom';
import ChevronLeft from '../../UI/Icons/Chevron/ChevronLeft';
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
					{/* {props.symbol ? (
						<span>{props.symbol}</span>
					) : ( */}
					<ChevronLeft className={classes['symbol']} />
					{/* )} */}
				</li>
				<li className={classes['back-link']}>
					<div onClick={() => history.goBack()}>
						<span>{props.message}</span>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default GoBack;
