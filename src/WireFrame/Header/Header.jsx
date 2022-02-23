import React, { useContext } from "react";
import "./Header-Styles.css";
import "bootstrap";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/OutseekLogo.png";
import { AccountContext } from "../../Auth/Account";
import Status from "../../Auth/Status";
console.log();
const Header = () => {
	return (
		<header>
			<div className='header-container'>
				<div style={{ width: "19rem" }}>
					{/* <img
						style={{ height: "4rem", paddingLeft: "1rem" }}
						alt='logo'
						src={logo}></img> */}
					<Status></Status>
				</div>
				<div></div>
			</div>
		</header>
	);
};

export default Header;
