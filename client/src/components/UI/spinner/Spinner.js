import classes from './Spinner.module.scss';

const Spinner = ({ w, h, p }) => {
	return (
		<div className={classes.container}>
			<div
				className={classes.spinner}
				style={{ width: w, height: h, padding: p }}
			></div>
		</div>
	);
};

export default Spinner;
