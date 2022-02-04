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
	...props
}) => {
	// console.log(type);

	if (parseInt(variant) === 1) {
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
