import React from 'react';
import classes from './InputField.module.scss';

const InputField = ({ id, type, value, onChange, placeholder }) => {
	return (
		<React.Fragment>
			<input
				id={id}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder ?? null}
			/>
		</React.Fragment>
	);
};

export default InputField;
