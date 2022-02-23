import React, { useState, useEffect, useContext } from "react";
import {
	Col,
	Row,
	Container,
	ButtonGroup,
	Button,
	ButtonToolbar,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { GlobalContext } from "../Store/GlobalStore";
import { useNavigate } from "react-router-dom";
const styles = {
	border: "1px solid red",
};
const Logo = () => {
	return (
		<Row>
			<h1>Outseek</h1>
		</Row>
	);
};

const TopRightButtonGroup = () => {
	const navigate = useNavigate();

	const navSignup = () => {
		navigate("../sign-up", { replace: false });
	};

	const navSignin = () => {
		navigate("../sign-in", { replace: false });
	};
	return (
		<Row>
			<ButtonToolbar aria-label='Toolbar with button groups'>
				<ButtonGroup className='me-2' aria-label='First group'>
					<Button onClick={() => navSignup()}>Sign up</Button>
				</ButtonGroup>
				<ButtonGroup className='me-2' aria-label='Second group'>
					<Button onClick={() => navSignin()}>Sign in</Button>
				</ButtonGroup>
			</ButtonToolbar>
		</Row>
	);
};
const MainContentRightGroup1 = () => {
	return (
		<div
			style={{
				justifyContent: "center",
				width: "100%",
				height: "100%",
			}}>
			<div
				style={{
					margin: "25px",
					height: "90%",
					backgroundColor: "grey",
				}}></div>{" "}
		</div>
	);
};
const MainContentleftGroup1 = () => {
	const navigate = useNavigate();

	const navTerminal = () => {
		navigate("./Dashboard", { replace: true });
	};
	return (
		<>
			<Row style={{ justifyContent: "center" }}>
				<ButtonGroup style={{ width: "35rem", paddingTop: "10px" }}>
					<Button onClick={() => navTerminal()} size='lg'>
						Enter Outseek Terminal
					</Button>
				</ButtonGroup>
			</Row>
			<Row style={{ textAlign: "left" }}>
				<h1
					style={{
						font: "Montserrat",
						paddingLeft: "2rem",
						fontSize: "60px",
					}}>
					Access to <br></br>in-depth market,<br></br> economic, and<br></br>{" "}
					security <br></br>
					information.
				</h1>
			</Row>
		</>
	);
};

const MainContentRightGroup2 = () => {
	return (
		<>
			<Row style={{ textAlign: "left" }}>
				<h1 style={{ paddingLeft: "2rem", fontSize: "60px" }}>
					What Is OutSeek <br></br> All About?
				</h1>
			</Row>
			<Row style={{ textAlign: "left" }}>
				<h4 style={{ paddingLeft: "2rem" }}>
					At OutSeek we believe nobody should have to pay<br></br> for
					high-quality organized information of publicly-<br></br>traded
					financial securities. Even advanced ratios <br></br> and metrics
					should be completely free. That’s <br></br>why full access to all
					information on our website <br></br> is free. We offer a premium plan
					that gives <br></br>
					investors access to premium tools created by us.
				</h4>
			</Row>
			<Row style={{ textAlign: "left" }}>
				<h1 style={{ paddingLeft: "2rem", fontSize: "34px" }}>
					We will never charge for data<br></br>
					or information.
				</h1>
			</Row>
		</>
	);
};

const MainContentLeftGroup2 = () => {
	return (
		<div
			style={{
				justifyContent: "center",
				width: "100%",
				height: "100%",
			}}>
			<div
				style={{
					margin: "25px",
					height: "90%",
					backgroundColor: "grey",
				}}></div>{" "}
		</div>
	);
};

const MainContentLeftGroup3 = () => {
	return (
		<>
			<Row style={{ justifyContent: "center" }}>
				<ButtonGroup style={{ width: "35rem", paddingTop: "10px" }}>
					<Button size='lg'>Enter Outseek Terminal</Button>
				</ButtonGroup>
			</Row>
			<Row style={{ textAlign: "left" }}>
				<h1 style={{ paddingLeft: "2rem", fontSize: "60px" }}>
					Access to <br></br>in-depth market,<br></br> economic, and<br></br>{" "}
					security <br></br>
					information.
				</h1>
			</Row>
		</>
	);
};

const MainContentRightGroup3 = () => {
	return (
		<div
			style={{
				justifyContent: "center",
				width: "100%",
				height: "100%",
			}}>
			<div
				style={{
					margin: "25px",
					height: "90%",
					backgroundColor: "grey",
				}}></div>{" "}
		</div>
	);
};

const MainContentBottomGroup1 = () => {
	return (
		<h5 style={{ textAlign: "left" }}>
			OutSeek organizes and displays information in a way that allows <br></br>
			for optimal research and analysis of financial securities, economics, and
			financial markets. <br></br>We provide a series of powerful tools to find,
			analyze, and compare securities.
		</h5>
	);
};
export const Homepage = () => {
	return (
		<Container fluid>
			<Row style={styles}>
				<Col style={styles}>
					<Logo />
				</Col>
				<Col xs={7} style={styles}></Col>
				<Col style={styles}>
					<TopRightButtonGroup />
				</Col>
			</Row>
			<Row style={{ paddingTop: "70px" }}>
				<Col style={styles}>
					{" "}
					<MainContentleftGroup1 />
				</Col>
				<Col styles={styles}>
					<MainContentRightGroup1></MainContentRightGroup1>
				</Col>
			</Row>
			<Row style={styles}>
				<Col xs={9} style={styles}>
					{" "}
					<MainContentBottomGroup1 />
				</Col>
				<Col style={styles}></Col>
			</Row>
			<Row style={{ paddingTop: "70px" }}>
				<Col>
					<MainContentLeftGroup2 />
				</Col>
				<Col>
					<MainContentRightGroup2 />{" "}
				</Col>
			</Row>

			<Row style={{ paddingTop: "70x" }}>
				<Col>
					<MainContentLeftGroup3 />
				</Col>
				<Col>
					<MainContentRightGroup3 />{" "}
				</Col>
			</Row>
		</Container>
	);
};
