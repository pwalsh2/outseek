import React from "react";
import "./Header-Styles.css";
import logo from "./assets/OutseekLogo.png";
const Header = () => {
	return (
		<header>
			<div className='header-container'>
				<div style={{ width: "19rem" }}>
					{/* <img
						style={{ height: "4rem", paddingLeft: "1rem" }}
						alt='logo'
						src={logo}></img> */}
				</div>
				<div></div>
			</div>
		</header>
	);
};

export default Header;
