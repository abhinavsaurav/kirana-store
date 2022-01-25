import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Login.module.scss';
import { authAction } from '../../store';
import { useSelector, useDispatch } from 'react-redux';

const Login = (props) => {
	const [uname, setUname] = useState('');
	const [pass, setPass] = useState('');
	const [hasError, setHasError] = useState(false);

	const isAuthenticated = useSelector((state) => {
		console.log(state);
		return state.auth.isAuthenticated;
	});

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
	const verifyPass = (e) => {
		/**
		 * TODO : username and password secure and authentication
		 */
		const temp = e.target.value;
		// const minPassLength = 4;
		// const maxPassLength = 16;
		console.log(hasError);

		// TODO: This should be checked in handlesubmit form or not or i can create a
		// checkbox indicating but this is n

		setPass(temp);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		/**
		 * Mongo form submit i think i need to pass it to the backend
		 *
		 */
		const temp = pass;
		const minPassLength = 4;
		const maxPassLength = 16;
		if (!(temp.length >= minPassLength) || !(temp.length <= maxPassLength)) {
			setHasError(true);
		} else {
			setHasError(false);
		}
	};

	return (
		<form onSubmit={handleFormSubmit} className={classes.form}>
			<div className={classes['form-container']}>
				<div className={classes.uname}>
					<label htmlFor="uname">Username :</label>
					<input
						type="text"
						id="uname"
						value={uname}
						onChange={(e) => setUname(e.target.value)}
					/>
				</div>
				<div className={classes.pass}>
					<label className={hasError === true ? 'error' : ''} htmlFor="pass">
						Password :
					</label>
					<input type="password" id="pass" value={pass} onChange={verifyPass} />
				</div>
			</div>

			<div className={classes['link-cont']}>
				<NavLink to="/user-register">New to kirana?</NavLink>
				&nbsp;&nbsp;
				<NavLink to="/reset-password">Forgot Password?</NavLink>
			</div>
			<button
				type="submit"
				// disabled={hasError === true ? true : false}
				className={classes['submit-btn']}
			>
				Submit
			</button>
			<div>
				<td>Is Authenticated:</td>
				<td>{isAuthenticated.toString()}</td>
			</div>
		</form>
	);
};

export default Login;
