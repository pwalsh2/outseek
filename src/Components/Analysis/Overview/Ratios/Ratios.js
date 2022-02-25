import React, { useState, useEffect, Children, useContext } from "react";
import { getGrowth, getOverview, getRatios, TransformData } from "../API/API";
import { Resizable } from "re-resizable";
import { TabContent, Button, Form } from "react-bootstrap";
import { Table } from "./Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { InputGroup, FormControl } from "react-bootstrap";
import { animated, useTransition } from "react-spring";
import { GlobalContext } from "../../../../Store/GlobalStore";
import { ComponentContext } from "../../../../WireFrame/Content/WorkSpace/WorkSpace";

// Define a default UI for filtering

export const getCOLUMNS = (type) => {
	return [
		{
			header: type,
			accessor: "key",
			sticky: "left",
		},

		{
			header: "Q1",
			accessor: "Q1",
			sticky: "left",
			disableFilters: true,
		},
		{ header: "Q2", accessor: "Q2", disableFilters: true },
		{
			header: "Q3",
			accessor: "Q3",
			disableFilters: true,
		},
		{
			header: "Q4",
			accessor: "Q4",
			disableFilters: true,
		},
		{
			header: "Q5",
			accessor: "Q5",
			disableFilters: true,
		},
		{
			header: "Q6",
			accessor: "Q6",
			disableFilters: true,
		},
		{ header: "Q7", accessor: "Q7", disableFilters: true },
		{
			header: "Q8",
			accessor: "Q8",
			disableFilters: true,
		},
		{
			header: "Q9",
			accessor: "Q9",
			disableFilters: true,
		},
	];
};

function TickerInput(props) {
	return (
		<>
			{" "}
			<input className='form-control' style={{ height: "2rem" }}></input>;
			<Button>Search</Button>
		</>
	);
}

export function Growth() {
	const Growth_COLUMNS = getCOLUMNS("Company Growth");

	const [growthData, setGrowthData] = useState([]);
	const [inputVisible, setInputVisible] = useState(true);
	const inputTickerRef = React.useRef(0);
	const transition = useTransition(inputVisible, {});
	const [ticker, setTicker] = useState("AAPL");
	useEffect(() => {
		getGrowth(ticker).then((dataRaw) => {
			setGrowthData(TransformData(dataRaw.data));
		});
	}, [ticker]);

	const [width, setWidth] = React.useState(500);
	const [height, setHeight] = React.useState(1000);

	function setData() {
		// setInputVisible(!inputVisible);
		setTicker(inputTickerRef.current.value);
	}
	return (
		<>
			{transition((style, item) =>
				item ? (
					<animated.div
						style={{
							...style,
							position: "relative",
							left: "0%",
							zIndex: 999,
						}}>
						<InputGroup style={{ zIndex: 10000 }} size='md' className='mb-3'>
							<FormControl
								aria-label='Small'
								aria-describedby='inputGroup-sizing-sm'
								placeholder='Enter Ticker...'
								ref={inputTickerRef}
							/>
							<Button
								onClick={() => {
									setData();
								}}
								style={{ float: "left" }}>
								{" "}
								<b> &#8592;</b>{" "}
							</Button>
							<Button className='dragHandle'>Drag</Button>
						</InputGroup>{" "}
					</animated.div>
				) : (
					""
				)
			)}
			<Table columns={Growth_COLUMNS} data={growthData} />
		</>
	);
}


export const MinMaxCloseButtonStyles = {
	close: {
		height: "25px",
		margin: "3px",
		width: "25px",
		backgroundColor: "#bbb",
		borderRadius: "50%",
		display: "inline-block",
	},
	min: {
		height: "25px",
		margin: "3px",
		width: "25px",
		backgroundColor: "#bbb",
		borderRadius: "50%",
		display: "inline-block",
	},
};

export const CloseButton = ({ DashboardID, ComponentID }) => {
	const globalContext = useContext(GlobalContext);

	const close = () => {
		globalContext.removeComponent(ComponentID, DashboardID);
		globalContext.triggerUpdateFunc();
	};

	return (
		<span onClick={() => close()} style={MinMaxCloseButtonStyles.close}>
			X
		</span>
	);
};
export function Ratios() {
	const Ratios_COLUMNS = getCOLUMNS("Fundemental Ratios");

	const [ratioData, setRatioData] = useState([]);
	const globalContext = useContext(GlobalContext);
	const componentContext = useContext(ComponentContext);
	const [inputVisible, setInputVisible] = useState(true);
	const inputTickerRef = React.useRef(0);
	const transition = useTransition(inputVisible, {});
	const [ticker, setTicker] = useState("AAPL");

	function setData() {
		// setInputVisible(!inputVisible);
		setTicker(inputTickerRef.current.value);
		globalContext.updateComponentTicker({
			DashboardID: componentContext.DashboardNumber - 1,
			ComponentID: componentContext.ComponentNumber - 1,
			Ticker: inputTickerRef.current.value,
		});
	}
	useEffect(() => {
		getRatios(ticker).then((dataRaw) => {
			setRatioData(TransformData(dataRaw.data));
		});
	}, [ticker]);

	return (
		<>
			{" "}
			{transition((style, item) =>
				item ? (
					<animated.div
						style={{
							...style,
							position: "relative",
							left: "0%",
							zIndex: 999,
						}}>
						<InputGroup style={{ zIndex: 10000 }} size='md' className='mb-3'>
							<CloseButton
								DashboardID={componentContext.DashboardNumber}
								ComponentID={componentContext.ComponentNumber}></CloseButton>
							{/* <span style={MinMaxCloseButtonStyles.min}>-</span> */}

							<FormControl
								aria-label='Small'
								aria-describedby='inputGroup-sizing-sm'
								placeholder='Enter Ticker...'
								ref={inputTickerRef}
							/>
							<Button
								onClick={() => {
									setData();
								}}
								style={{ float: "left" }}>
								{" "}
								<b> &#8592;</b>{" "}
							</Button>
							<Button className='dragHandle'>Drag</Button>
						</InputGroup>{" "}
					</animated.div>
				) : (
					""
				)
			)}
			<Table columns={Ratios_COLUMNS} data={ratioData} />
		</>
	);
}
