import classes from './MainContent.module.scss';

const MainContent = (props) => {
	return (
		<div className={classes['imgs-wrapper']}>
			<div className={classes['img-container']}>{props.children}</div>
		</div>
	);
};

export default MainContent;
