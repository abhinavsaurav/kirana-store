import React, { useState } from "react";
import classes from "./Login.module.scss";

const Login = (props) => {
	const [uname, setUname] = useState("");
	const [pass, setPass] = useState("");
	const [hasError, setHasError] = useState(false);

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
		<div>
			<form onSubmit={handleFormSubmit}>
				<div className="uname">
					<label htmlFor="uname">Username</label>
					<input
						type="text"
						id="uname"
						value={uname}
						onChange={(e) => setUname(e.target.value)}
					/>
				</div>
				<div className="pass">
					<label className={hasError === true ? "error" : ""} htmlFor="pass">
						Password
					</label>
					<input type="password" id="pass" value={pass} onChange={verifyPass} />
				</div>
				<button
					type="submit"
					// disabled={hasError === true ? true : false}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Login;
