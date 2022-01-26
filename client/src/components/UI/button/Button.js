import classes from './Button.module.scss';

const Button = (props) => {
	const { children, ...propObj } = props;
	return (
		<button className={classes.btn} {...propObj}>
			{children}
		</button>
	);
};

export default Button;
