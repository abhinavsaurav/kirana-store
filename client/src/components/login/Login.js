import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';

import { login } from '../../store/authActions';
import { authDefaultActions } from '../../store/authSlice';
import {
	LOADING,
	EMAIL_VALIDATION_PATTERN,
	ERROR_LOGIN_SUBMIT,
} from '../../data/constants';

import Button from '../UI/button/Button';
import Spinner from '../UI/spinner/Spinner';
import InputField from '../UI/input/InputField';

import classes from './Login.module.scss';

// Added notes below the export line
const Login = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	// auth selectors
	const auth = useAuth();
	const apiError = auth.error;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (apiError) {
			setHasError(true);
			setErrorMessage(apiError.message);
		} else {
			setHasError(false);
		}
	}, [apiError]);

	useEffect(() => {
		if (auth.isAuthenticated) {
			history.push(redirect);
		}
	}, [history, auth.isAuthenticated, redirect]);

	const validateForm = async (email, password) => {
		const emailRE = EMAIL_VALIDATION_PATTERN;
		// REGEX needs time to check the pattern so was causing strange bugs
		const validEmail = await emailRE.test(email);

		if (!validEmail) {
			return false;
		}

		if (password.length < 8 || password.length > 20) {
			return false;
		}

		return true;
	};

	// * FORM HANDLER
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		await dispatch(authDefaultActions.resetAuthError());
		setErrorMessage('');
		// const formVal
		if (!validateForm(email, pass)) {
			console.log('Checking this is working ifne');
			setHasError(true);
			setErrorMessage(ERROR_LOGIN_SUBMIT);
			return false;
		}

		setHasError(false);
		await dispatch(login({ email, pass }));
	};

	const loginError = function () {
		return (
			<div className={classes['error-wrapper']}>
				<div className={classes.error}>
					<div className={classes.message}>
						{errorMessage ||
							'Something is not right. Please try logging again!'}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className={classes['container']}>
			<div className={classes['login-container']}>
				{hasError ? loginError() : ''}

				<div className={classes['login-wrapper']}>
					<form onSubmit={handleFormSubmit} className={classes.form}>
						<h1>Login</h1>
						<div className={classes['form-container']}>
							<div className={classes.uname}>
								<label htmlFor="uname">Email </label>
								<label>:</label>
								<InputField
									type="text"
									id="uname"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className={classes.pass}>
								<label
									className={hasError === true ? 'error' : ''}
									htmlFor="pass"
								>
									Password
								</label>
								<label>:</label>
								<InputField
									type="password"
									id="pass"
									value={pass}
									onChange={(e) => setPass(e.target.value)}
								/>
							</div>
						</div>
						<div className={classes['btn-container']}>
							<div className={classes['submit-btn']}>
								<Button
									type="submit"
									// onClick={testFunction}
									// disabled={hasError === true ? true : false}
									// className={classes['submit-btn']} to override the default style we can specify it
								>
									Login
								</Button>
							</div>
						</div>
						<div className={classes['link-cont']}>
							<NavLink to="/user-register">New to kirana?</NavLink>
							&nbsp;&nbsp;
							<NavLink to="/reset-password">Forgot Password?</NavLink>
						</div>

						<div className={classes.check}>
							<div>
								<td>Is Authenticated:</td>
								<td>{auth.isAuthenticated.toString()}</td>
							</div>
						</div>
						{auth.status === LOADING ? <Spinner w="20px" h="20px" /> : ''}
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;

/**
	 *
	 * @param {*} e event
	 * This should be added in the add user sections
	 * along with the session information
	 *
	 * // ALSO HANDLING THE Session will be done by integrating redux 
	 * 
	 * SIDE NOTE : HAndling adding cart items when elements 
Why is using the session not the best way to do it? I'd say it is.

You could have a separate, session-based "non-logged in" shopping cart structure, an exact copy of the normal cart. If the user is not logged in, the products are stored there.

When the user logs in, you merge the non-logged in cart's contents with whatever items the user may already have in their user-speficic cart.

That point is also the place to deal with any conflicts that may arise from the product selection (like, a selected product being present in the logged in user's cart already).

Using cookies as recommended by @Codemwnci to either store the products, or a cart ID is a good idea too, because it allows the user to come back later and still have their cart contents, which you may want.

The same principle of merging will apply here as well, with an additional check whether the products in the cookie really are valid ones (they could have been removed since the user made their selection, or the user could have altered the cookie).
	 *
	 */
