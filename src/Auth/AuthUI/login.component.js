import React, { Component, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import UserPool from "../UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { GlobalContext } from "../../Store/GlobalStore";
export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const globalContext = useContext(GlobalContext);
	const [passwordError, toggleError] = useState(false);
	const navigate = useNavigate();
	const onSubmit = (event) => {
		event.preventDefault();

		const user = new CognitoUser({
			Username: email,
			Pool: UserPool,
		});

		const authDetails = new AuthenticationDetails({
			Username: email,
			Password: password,
		});

		user.authenticateUser(authDetails, {
			onSuccess: (data) => {
				console.log("onSuccess: ", data);
				globalContext.refreshData();
				navigate("../Dashboard", { replace: true });
			},
			onFailure: (err) => {
				console.log(authDetails);
				globalContext.refreshData();
				console.error("onFailure: ", err);
			},
			newPasswordRequired: (data) => {
				console.log("newPasswordRequired: ", data);
			},
		});
	};

	return (
		<div className='auth-wrapper'>
			<div className='auth-inner'>
				<form onSubmit={onSubmit}>
					<h3>Sign In</h3>
					<div className='form-group'>
						<label>Email address</label>
						<input
							type='email'
							className='form-control'
							placeholder='Enter email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label>Password</label>
						<input
							type='password'
							className='form-control'
							placeholder='Enter password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<div className='custom-control custom-checkbox'>
							<input
								type='checkbox'
								className='custom-control-input'
								id='customCheck1'
							/>
							<label className='custom-control-label' htmlFor='customCheck1'>
								Remember me
							</label>
						</div>
					</div>
					<button type='submit' className='btn btn-primary btn-block'>
						Submit
					</button>
					<p className='forgot-password text-right'>
						Forgot <a href='#'>password?</a>
					</p>
				</form>{" "}
			</div>{" "}
		</div>
	);
}
