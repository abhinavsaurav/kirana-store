import { Link } from 'react-router-dom';
import EmailIcon from '../../../UI/Icons/ShareIcons/EmailIcon';
import FacebookIcon from '../../../UI/Icons/ShareIcons/FacebookIcon';
import TwitterIcon from '../../../UI/Icons/ShareIcons/TwitterIcon';
import classes from './Share.module.scss';

const Share = (props) => {
	return (
		<div className={classes['share-container']}>
			{/* Link tag was acting strange so using the anchor tag */}
			<a href="mailto:?body:hi%20there%20&subject=check%20this%20out">
				<span>Share</span>
			</a>
			<Link to="#">
				<EmailIcon width="23" height="23" />
			</Link>
			<Link to="#">
				<FacebookIcon width="20" height="20" />
			</Link>
			<Link to="#">
				<TwitterIcon width="20" height="20" />
			</Link>
		</div>
	);
};

export default Share;
