import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "./Account";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const Status = () => {
	const [status, setStatus] = useState(false);

	const { getSession, logout, authenticate } = useContext(AccountContext);

	useEffect(() => {
		getSession().then((session) => {
			console.log("Session: ", session);
			setStatus(true);
		});
	}, [getSession]);

	function LOGOUT() {
		logout();
		setStatus(false);
	}
	return (
		<div style={{ fontSize: "24px" }}>
			{status ? (
				<Button onClick={() => LOGOUT()}>Logout</Button>
			) : (
				<Button>Sign In</Button>
			)}
		</div>
	);
};
export default Status;
