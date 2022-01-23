import classes from './Spinner.module.scss';

const Spinner = ({ w, h, m }) => {
	return (
		<div className={classes.container}>
			<div
				className={classes.spinner}
				style={{ width: w, height: h, margin: m }}
			></div>
		</div>
	);
};

export default Spinner;
