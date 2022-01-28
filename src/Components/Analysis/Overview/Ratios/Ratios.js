import React, { useState, useEffect } from "react";
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

	const style = {
		display: "flex",
		flexDirection: "column",
		border: "solid 1px #ddd",
		background: "rgba(0, 27, 45, 0.9)",
	};

	const [width, setWidth] = React.useState(500);
	const [height, setHeight] = React.useState(1000);

	function setData() {
		// setInputVisible(!inputVisible);
		setTicker(inputTickerRef.current.value);
	}
	return (
		<>
			<div style={{ float: "left" }}>
				{" "}
				<Resizable
					style={style}
					size={{ width, height }}
					onResizeStop={(e, direction, ref, d) => {
						setWidth(width + d.width);
						setHeight(height + d.height);
					}}>
					{transition((style, item) =>
						item ? (
							<animated.div
								style={{
									...style,
									position: "relative",
									left: "0%",
									zIndex: 999,
								}}>
								<InputGroup
									style={{ zIndex: 10000 }}
									size='md'
									className='mb-3'>
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
								</InputGroup>{" "}
							</animated.div>
						) : (
							""
						)
					)}
					<Table columns={Growth_COLUMNS} data={growthData} />
				</Resizable>
			</div>
		</>
	);
}

export function Ratios() {
	const Ratios_COLUMNS = getCOLUMNS("Fundemental Ratios");

	const [ratioData, setRatioData] = useState([]);

	const [inputVisible, setInputVisible] = useState(true);
	const inputTickerRef = React.useRef(0);
	const transition = useTransition(inputVisible, {});
	const [ticker, setTicker] = useState("AAPL");

	const style = {
		display: "flex",
		flexDirection: "column",
		border: "solid 1px #ddd",
		background: "rgba(0, 27, 45, 0.9)",
	};

	const [width, setWidth] = React.useState(500);
	const [height, setHeight] = React.useState(1000);

	function setData() {
		// setInputVisible(!inputVisible);
		setTicker(inputTickerRef.current.value);
		console.log(ticker);
	}
	useEffect(() => {
		getRatios(ticker).then((dataRaw) => {
			console.log(dataRaw);
			setRatioData(TransformData(dataRaw.data));
		});
	}, [ticker]);

	return (
		<>
			<div style={{ float: "left" }}>
				{" "}
				<Resizable
					style={style}
					size={{ width, height }}
					onResizeStop={(d) => {
						setWidth(width + d.width);
						setHeight(height + d.height);
					}}>
					{transition((style, item) =>
						item ? (
							<animated.div
								style={{
									...style,
									position: "relative",
									left: "0%",
									zIndex: 999,
								}}>
								<InputGroup
									style={{ zIndex: 10000 }}
									size='md'
									className='mb-3'>
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
								</InputGroup>{" "}
							</animated.div>
						) : (
							""
						)
					)}
					<Table columns={Ratios_COLUMNS} data={ratioData} />
				</Resizable>
			</div>
		</>
	);
}
