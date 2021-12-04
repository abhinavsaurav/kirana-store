import classes from './AltContent.module.scss';

const AltContent = (props) => {
	return (
		<div className={classes['alt-imgs']}>
			<ul className={classes['img-list']}>
				{/* should contain a map of alternate images which should switch */}
				{props.children}
			</ul>
		</div>
	);
};

export default AltContent;
