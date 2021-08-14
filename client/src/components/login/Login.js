import React, { useState } from "react";

const Login = (props) => {
	const [uname, setUname] = useState("");
	const [pass, setPass] = useState("");
	const [hasError, setHasError] = useState(true);

	const verifyPass = (e) => {
		// console.log(;
		const temp = e.target.value;
		const minPassLength = 4;
		const maxPassLength = 16;
		console.log(hasError);
		if (!(temp.length >= minPassLength) || !(temp.length <= maxPassLength)) {
			setHasError(true);
		} else {
			setHasError(false);
		}
		setPass(temp);
	};

	return (
		<div>
			<form>
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
				<button type="submit" disabled={hasError === true ? true : false}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Login;
