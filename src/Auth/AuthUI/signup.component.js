import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserPool from "../UserPool";
export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const PasswordDetails = () => {
		return (
			<div>
				<ListGroup style={{ fontSize: "9px" }} variant='flush'>
					<ListGroup.Item>Minimum password length 8</ListGroup.Item>
					<ListGroup.Item>
						{" "}
						Must have: uppercase letters, lowercase letters, special characters,
						numbers
					</ListGroup.Item>
				</ListGroup>
			</div>
		);
	};

	const navSignin = () => {
		navigate("../sign-in");
	};
	const onSubmit = (event) => {
		event.preventDefault();

		UserPool.signUp(email, password, [], null, (err, data) => {
			if (err) {
				console.error(err);
			}
			console.log(data);
			navigate("../sign-in", { replace: true });
		});
	};
	return (
		<div className='auth-wrapper'>
			<div className='auth-inner'>
				<form onSubmit={onSubmit}>
					<h3>Sign Up</h3>

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
					<PasswordDetails />
					<button type='submit' className='btn btn-primary btn-block'>
						Sign Up
					</button>
					<p className='forgot-password text-right'>
						Already registered{" "}
						<Button
							style={{ backgroundColor: "white", color: "blue" }}
							onClick={() => navSignin()}>
							sign in?
						</Button>
					</p>
				</form>
			</div>{" "}
		</div>
	);
}
