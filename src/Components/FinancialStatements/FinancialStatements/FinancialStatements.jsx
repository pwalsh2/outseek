import React, { useState, useEffect } from "react";
import {
	getBalanceSheet,
	getCashFlow,
	getIncomeStatement,
	TransformData,
} from "./API/FinancialStatementsAPI";
import { Resizable } from "re-resizable";
import { TabContent, Button } from "react-bootstrap";
import { Table } from "./Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FakeData } from "./API/FakeData";
import { InputGroup, FormControl } from "react-bootstrap";
import { animated, useTransition, transition } from "react-spring";

const startingWidth = 500;
const startingHeight = 1000;
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

export function BalanceSheet() {
	const BS_COLUMNS = getCOLUMNS("Balance Sheet");
	const [BSdata, setBSdata] = useState([]);
	const [ticker, setTicker] = useState("AAPL");
	const [inputVisible, setInputVisible] = useState(true);
	const inputTickerRef = React.useRef(0);
	const style = {
		display: "flex",
		flexDirection: "column",
		border: "solid 1px #ddd",
		background: "rgba(0, 27, 45, 0.9)",
	};

	const transition = useTransition(inputVisible, {});
	const [width, setWidth] = React.useState(startingWidth);
	const [height, setHeight] = React.useState(startingHeight);
	useEffect(() => {
		getBalanceSheet(ticker).then((dataRaw) => {
			setBSdata(TransformData(dataRaw.data));
		});
	}, [ticker]);

	function setData() {
		setTicker(inputTickerRef.current.value);
	}
	return (
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
							</InputGroup>{" "}
						</animated.div>
					) : (
						""
					)
				)}
				<Table columns={BS_COLUMNS} data={BSdata} />
			</Resizable>
		</div>
	);
}

export function IncomeStatement() {
	const IS_COLUMNS = getCOLUMNS("Income Statement");

	const [ISdata, setISdata] = useState([]);
	const [inputVisible, setInputVisible] = useState(true);
	const [ticker, setTicker] = useState("AAPL");

	const inputTickerRef = React.useRef(0);
	const transition = useTransition(inputVisible, {});
	const style = {
		display: "flex",
		flexDirection: "column",
		border: "solid 1px #ddd",
		background: "rgba(0, 27, 45, 0.9)",
	};

	const [width, setWidth] = React.useState(startingWidth);
	const [height, setHeight] = React.useState(startingHeight);
	useEffect(() => {
		getIncomeStatement(ticker).then((dataRaw) => {
			setISdata(TransformData(dataRaw.data));
		});
	}, [ticker]);

	function setData() {
		setTicker(inputTickerRef.current.value);
	}

	return (
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
							</InputGroup>{" "}
						</animated.div>
					) : (
						""
					)
				)}
				<Table columns={IS_COLUMNS} data={ISdata} />
			</Resizable>
		</div>
	);
}

export function CashFlow() {
	const CF_COLUMNS = getCOLUMNS("Cash Flow Statement");
	const [CFdata, setCFdata] = useState([]);

	const [ticker, setTicker] = useState("AAPL");
	const [inputVisible, setInputVisible] = useState(true);
	const inputTickerRef = React.useRef(0);
	const style = {
		display: "flex",
		flexDirection: "column",
		border: "solid 1px #ddd",
		background: "rgba(0, 27, 45, 0.9)",
	};
	const transition = useTransition(inputVisible, {});
	const [width, setWidth] = React.useState(startingWidth);
	const [height, setHeight] = React.useState(startingHeight);
	useEffect(() => {
		getCashFlow(ticker).then((dataRaw) => {
			setCFdata(TransformData(dataRaw.data));
		});
	}, [ticker]);

	function setData() {
		setTicker(inputTickerRef.current.value);
	}

	return (
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
							</InputGroup>{" "}
						</animated.div>
					) : (
						""
					)
				)}
				<Table columns={CF_COLUMNS} data={CFdata} />
			</Resizable>
		</div>
	);
}
