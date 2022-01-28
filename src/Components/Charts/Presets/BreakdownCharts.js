import * as React from "react";
import {
	AreaChart,
	ResponsiveContainer,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";
import { curveCardinal } from "d3-shape";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Resizable } from "re-resizable";
import { InputGroup, FormControl, Button, Badge } from "react-bootstrap";
import { animated, useTransition } from "react-spring";
const data = [
	{
		name: "Page A",
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: "Page B",
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: "Page C",
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: "Page D",
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: "Page E",
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: "Page F",
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: "Page G",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

const cardinal = curveCardinal.tension(0.2);
function IncomeStatementCall(stock) {
	return axios({
		method: "get",
		url:
			"https://financialmodelingprep.com/api/v3/income-statement/" +
			stock +
			"?period=quarter&limit=40&apikey=6f583125e791bceb5e95b3307b84bd13",
		responseType: "json",
	});
}

function BalancesheetCall(stock) {
	return axios({
		method: "get",
		url:
			"https://financialmodelingprep.com/api/v3/balance-sheet-statement/" +
			stock +
			"?period=quarter&limit=40&apikey=6f583125e791bceb5e95b3307b84bd13",
		responseType: "json",
	});
}

function CashflowCall(stock) {
	return axios({
		method: "get",
		url:
			"https://financialmodelingprep.com/api/v3/cash-flow-statement/" +
			stock +
			"?period=quarter&limit=40&apikey=6f583125e791bceb5e95b3307b84bd13",
		responseType: "json",
	});
}
function reverseData(dataIN) {
	let ret_val = [];
	for (let i = 19; i > 0; i--) {
		ret_val.push(dataIN[i]);
	}

	console.log(ret_val);
	return ret_val;
}
function cleanIncomeData(rawData) {
	let cleanedData = [];

	for (let i = 0; i < 20; i++) {
		let entry = {
			Date: rawData[i]["date"],
			Revenue: rawData[i]["revenue"],
			CostOfRevenue: rawData[i]["costOfRevenue"],
			GrossProfit: rawData[i]["grossProfit"],
			editda: rawData[i]["ebitda"],
			OperationIncome: rawData[i]["operatingIncome"],
			IncomeBeforeTax: rawData[i]["incomeBeforeTax"],
			NetIncome: rawData[i]["netIncome"],
		};
		cleanedData.push(entry);
	}

	return reverseData(cleanedData);
}

function cleanAssetsData(rawData) {
	let cleanedData = [];

	for (let i = 0; i < 20; i++) {
		let entry = {
			Date: rawData[i]["date"],
			totalAssets: rawData[i]["totalAssets"],
			totalCurrentAssets: rawData[i]["totalCurrentAssets"],
			cashAndCashEquivalents: rawData[i]["cashAndCashEquivalents"],
			totalNonCurrentAssets: rawData[i]["totalNonCurrentAssets"],
			propertyPlantEquipmentNet: rawData[i]["propertyPlantEquipmentNet"],
		};
		cleanedData.push(entry);
	}

	return reverseData(cleanedData);
}
function cleanLiabailitiesData(rawData) {
	let cleanedData = [];

	for (let i = 0; i < 20; i++) {
		let entry = {
			Date: rawData[i]["date"],
			totalLiabilities: rawData[i]["totalLiabilities"],
			totalCurrentLiabilities: rawData[i]["totalCurrentLiabilities"],
			shortTermDebt: rawData[i]["shortTermDebt"],
			totalNonCurrentLiabilities: rawData[i]["totalNonCurrentLiabilities"],
			longTermDebt: rawData[i]["longTermDebt"],
		};
		cleanedData.push(entry);
	}

	return reverseData(cleanedData);
}

function cleanEquityData(rawData) {
	let cleanedData = [];

	for (let i = 0; i < 20; i++) {
		let entry = {
			Date: rawData[i]["date"],
			totalStockholdersEquity: rawData[i]["totalStockholdersEquity"],
			retainedEarnings: rawData[i]["retainedEarnings"],
			commonStock: rawData[i]["commonStock"],
			accumulatedOtherComprehensiveIncomeLoss:
				rawData[i]["accumulatedOtherComprehensiveIncomeLoss"],
		};
		cleanedData.push(entry);
	}

	return reverseData(cleanedData);
}

export function IncomeBreakdown() {
	const [dataChart, setData] = React.useState(data);
	const [ticker, setTicker] = React.useState("AAPL");

	const [inputVisible, setInputVisible] = React.useState(true);
	const inputTickerRef = React.useRef(0);
	const transition = useTransition(inputVisible, {});

	function setTickerWrapper() {
		// setInputVisible(!inputVisible);
		setTicker(inputTickerRef.current.value);
		console.log(ticker);
	}
	React.useEffect(() => {
		IncomeStatementCall(ticker).then((dataraw) => {
			setData(cleanIncomeData(dataraw.data));
		});
	}, [ticker]);

	const style = {
		display: "flex",
		flexDirection: "column",
		border: "solid 1px #ddd",
		background: "white",
	};

	const [width, setWidth] = React.useState(500);
	const [height, setHeight] = React.useState(1000);

	return (
		<div style={{ float: "left" }}>
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
							<InputGroup style={{ zIndex: 10000 }} size='md' className='mb-3'>
								<Button>Revenue Breakdown</Button>
								<FormControl
									aria-label='Small'
									aria-describedby='inputGroup-sizing-sm'
									placeholder='Enter Ticker...'
									ref={inputTickerRef}
								/>

								<Button
									onClick={() => {
										setTickerWrapper();
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
				<ResponsiveContainer width={"100%"} height='80%'>
					<AreaChart
						data={dataChart}
						margin={{
							top: 10,
							right: 30,
							left: 0,
							bottom: 0,
						}}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='Date' />
						<YAxis width={130} />
						<Legend verticalAlign='top' height={36} />
						<Tooltip />
						<Area
							type='monotone'
							dataKey='Revenue'
							stroke='#823c3c'
							fill='#823c3c'
							fillOpacity={0.3}
						/>
						<Area
							type={cardinal}
							dataKey='CostOfRevenue'
							stroke='#503c82'
							fill='#503c82'
							fillOpacity={0.3}
						/>
						<Area
							type='monotone'
							dataKey='GrossProfit'
							stroke='#8884d8'
							fill='#8884d8'
							fillOpacity={0.3}
						/>

						<Area
							type={cardinal}
							dataKey='editda'
							stroke='#82ca9d'
							fill='#82ca9d'
							fillOpacity={0.3}
						/>
						<Area
							type='monotone'
							dataKey='OperationIncome'
							stroke='#8884d8'
							fill='#8884d8'
							fillOpacity={0.3}
						/>
						<Area
							type={cardinal}
							dataKey='IncomeBeforeTax'
							stroke='#3c8274'
							fill='#3c8274'
							fillOpacity={0.3}
						/>
						<Area
							type='monotone'
							dataKey='NetIncome'
							stroke='#503c82'
							fill='#503c82'
							fillOpacity={0.3}
						/>
					</AreaChart>
				</ResponsiveContainer>{" "}
			</Resizable>{" "}
		</div>
	);
}

export function AssetBreakdown() {
	const [inputVisible, setInputVisible] = React.useState(true);
	const inputTickerRef = React.useRef(0);
	const transition = useTransition(inputVisible, {});
	const [dataChart, setData] = React.useState(data);
	const [ticker, setTicker] = React.useState("AAPL");

	function setTickerWrapper() {
		// setInputVisible(!inputVisible);
		setTicker(inputTickerRef.current.value);
		console.log(ticker);
	}
	React.useEffect(() => {
		BalancesheetCall(ticker).then((dataraw) => {
			setData(cleanAssetsData(dataraw.data));
		});
	}, [ticker]);

	const style = {
		display: "flex",
		flexDirection: "column",
		border: "solid 1px #ddd",
		background: "white",
	};

	const [width, setWidth] = React.useState(1000);
	const [height, setHeight] = React.useState(700);

	return (
		<div style={{ float: "left" }}>
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
							<InputGroup style={{ zIndex: 10000 }} size='md' className='mb-3'>
								<Button>Assets Breakdown</Button>
								<FormControl
									aria-label='Small'
									aria-describedby='inputGroup-sizing-sm'
									placeholder='Enter Ticker...'
									ref={inputTickerRef}
								/>
								<Button
									onClick={() => {
										setTickerWrapper();
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
				<ResponsiveContainer width={"100%"} height='80%'>
					<AreaChart
						data={dataChart}
						margin={{
							top: 10,
							right: 30,
							left: 0,
							bottom: 0,
						}}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='Date' />
						<YAxis width={130} />
						<Legend verticalAlign='top' height={36} />
						<Tooltip />
						<Area
							type='monotone'
							dataKey='totalAssets'
							stroke='#823c3c'
							fill='#823c3c'
							fillOpacity={0.3}
						/>
						<Area
							type={cardinal}
							dataKey='totalCurrentAssets'
							stroke='#503c82'
							fill='#503c82'
							fillOpacity={0.3}
						/>
						<Area
							type='monotone'
							dataKey='cashAndCashEquivalents'
							stroke='#8884d8'
							fill='#8884d8'
							fillOpacity={0.3}
						/>

						<Area
							type={cardinal}
							dataKey='totalNonCurrentAssets'
							stroke='#82ca9d'
							fill='#82ca9d'
							fillOpacity={0.3}
						/>
						<Area
							type='monotone'
							dataKey='propertyPlantEquipmentNet'
							stroke='#8884d8'
							fill='#8884d8'
							fillOpacity={0.3}
						/>
					</AreaChart>
				</ResponsiveContainer>{" "}
			</Resizable>{" "}
		</div>
	);
}

export function LiabilitiesBreakdown() {
	const [dataChart, setData] = React.useState(data);
	const [ticker, setTicker] = React.useState("AAPL");

	const [inputVisible, setInputVisible] = React.useState(true);
	const inputTickerRef = React.useRef(0);
	const transition = useTransition(inputVisible, {});
	function setTickerWrapper() {
		// setInputVisible(!inputVisible);
		setTicker(inputTickerRef.current.value);
		console.log(ticker);
	}
	React.useEffect(() => {
		BalancesheetCall(ticker).then((dataraw) => {
			setData(cleanLiabailitiesData(dataraw.data));
		});
	}, [ticker]);

	const style = {
		display: "flex",
		flexDirection: "column",
		border: "solid 1px #ddd",
		background: "white",
	};

	const [width, setWidth] = React.useState(1000);
	const [height, setHeight] = React.useState(700);

	return (
		<div style={{}}>
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
							<InputGroup style={{ zIndex: 10000 }} size='md' className='mb-3'>
								<Button>Liabilities Breakdown</Button>
								<FormControl
									aria-label='Small'
									aria-describedby='inputGroup-sizing-sm'
									placeholder='Enter Ticker...'
									ref={inputTickerRef}
								/>
								<Button
									onClick={() => {
										setTickerWrapper();
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
				<ResponsiveContainer width={"100%"} height='80%'>
					<AreaChart
						data={dataChart}
						margin={{
							top: 10,
							right: 30,
							left: 0,
							bottom: 0,
						}}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='Date' />
						<YAxis width={130} />
						<Legend verticalAlign='top' height={36} />
						<Tooltip />
						<Area
							type='monotone'
							dataKey='totalLiabilities'
							stroke='#003f5c'
							fill='#003f5c'
							fillOpacity={0.3}
						/>
						<Area
							type={cardinal}
							dataKey='totalCurrentLiabilities'
							stroke='#374c80'
							fill='#374c80'
							fillOpacity={0.3}
						/>
						<Area
							type='monotone'
							dataKey='shortTermDebt'
							stroke='#7a5195'
							fill='#7a5195'
							fillOpacity={0.3}
						/>

						<Area
							type={cardinal}
							dataKey='totalNonCurrentLiabilities'
							stroke='#bc5090'
							fill='#bc5090'
							fillOpacity={0.3}
						/>
						<Area
							type='monotone'
							dataKey='longTermDebt'
							stroke='#ffa600'
							fill='#ffa600'
							fillOpacity={0.3}
						/>
					</AreaChart>
				</ResponsiveContainer>{" "}
			</Resizable>{" "}
		</div>
	);
}

export function EquitiesBreakdown() {
	const [dataChart, setData] = React.useState(data);
	const [ticker, setTicker] = React.useState("AAPL");

	const [inputVisible, setInputVisible] = React.useState(true);
	const inputTickerRef = React.useRef(0);
	const transition = useTransition(inputVisible, {});

	function setTickerWrapper() {
		// setInputVisible(!inputVisible);
		setTicker(inputTickerRef.current.value);
		console.log(ticker);
	}
	React.useEffect(() => {
		BalancesheetCall(ticker).then((dataraw) => {
			setData(cleanEquityData(dataraw.data));
		});
	}, [ticker]);

	const style = {
		display: "flex",
		flexDirection: "column",
		border: "solid 1px #ddd",
		background: "white",
	};

	const [width, setWidth] = React.useState(500);
	const [height, setHeight] = React.useState(500);

	return (
		<div style={{ float: "left" }}>
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
							<InputGroup style={{ zIndex: 10000 }} size='md' className='mb-3'>
								<Button>Equity Breakdown</Button>
								<FormControl
									aria-label='Small'
									aria-describedby='inputGroup-sizing-sm'
									placeholder='Enter Ticker...'
									ref={inputTickerRef}
								/>
								<Button
									onClick={() => {
										setTickerWrapper();
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
				<ResponsiveContainer width={"100%"} height='80%'>
					<AreaChart
						data={dataChart}
						margin={{
							top: 10,
							right: 30,
							left: 0,
							bottom: 0,
						}}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='Date' />
						<YAxis width={130} />
						<Legend verticalAlign='top' height={36} />
						<Tooltip />
						<Area
							type='monotone'
							dataKey='totalStockholdersEquity'
							stroke='#003f5c'
							fill='#003f5c'
							fillOpacity={0.3}
						/>
						<Area
							type={cardinal}
							dataKey='retainedEarnings'
							stroke='#374c80'
							fill='#374c80'
							fillOpacity={0.3}
						/>
						<Area
							type='monotone'
							dataKey='commonStock'
							stroke='#7a5195'
							fill='#7a5195'
							fillOpacity={0.3}
						/>

						<Area
							type={cardinal}
							dataKey='accumulatedOtherComprehensiveIncomeLoss'
							stroke='#bc5090'
							fill='#bc5090'
							fillOpacity={0.3}
						/>
					</AreaChart>
				</ResponsiveContainer>{" "}
			</Resizable>{" "}
		</div>
	);
}
