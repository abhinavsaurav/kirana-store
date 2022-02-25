import React from 'react';
import classes from './InputField.module.scss';

const InputField = ({
	id,
	type,
	label,
	variant,
	value,
	onChange,
	placeholder,
	children,
	...props
}) => {
	// console.log(type);

	if (parseInt(variant) === 1) {
		// contains label
		return (
			<div className={classes.variant1}>
				<label htmlFor={id}>{label}</label>
				<input
					id={id}
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder ?? null}
					{...props}
				/>
			</div>
		);
	}

	if (type === 'radio') {
		return (
			<div className={classes.radio}>
				<input
					id={id}
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder ?? null}
					{...props}
				/>
				<label htmlFor={id}>{label}</label>
			</div>
		);
	}

	return (
		<React.Fragment>
			<input
				id={id}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder ?? null}
				{...props}
			/>
		</React.Fragment>
	);
};

export default InputField;
