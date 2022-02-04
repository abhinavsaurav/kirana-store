import { useState, useEffect } from 'react';
import Button from '../UI/button/Button';
import InputField from '../UI/input/InputField';
import ProfilePic from '../UI/profile-picture/ProfilePic';
import classes from './Signup.module.scss';

const Signup = (props) => {
	const formSubmitHandler = async (e) => {
		e.preventDefault();
	};

	return (
		<div className={classes.wrapper}>
			<form onSubmit={formSubmitHandler}>
				<h1>Sign up!</h1>
				<div className={classes['form-wrapper']}>
					<ProfilePic />
					<div>
						<InputField
							variant="1"
							label="Name"
							type="text"
							placeholder="Enter your name"
						/>
					</div>
					<div>
						<InputField
							variant="1"
							label="Email"
							type="text"
							placeholder="Enter your password"
						/>
					</div>
					<div>
						<InputField
							variant="1"
							label="Password"
							type="password"
							placeholder="Enter your password"
						/>
					</div>
					<div>
						<InputField
							variant="1"
							label="Confirm Password"
							type="password"
							placeholder="Retype your password"
						/>
					</div>
					<div className={classes.submit}>
						<Button type="submit">Submit</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Signup;
