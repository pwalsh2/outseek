import React, { useEffect, useState, useContext, useCallback } from "react";

import { Rnd } from "react-rnd";
import { Resizable } from "re-resizable";
import { Ratios, Growth } from "../Analysis/Overview/Ratios/Ratios";
import TradingViewWidget from "react-tradingview-widget";
import { ComponentContext } from "../../WireFrame/Content/WorkSpace/WorkSpace";
import { GlobalContext } from "../../Store/GlobalStore";
import deepCopy from "deepcopy";
import useWindowDimensions from "../../Utils/useWindowSize.hook";
import { useReducer } from "react";
import { useRef } from "react";
export function DraggableWrapper(props) {
	const [x, setX] = useState();
	const [y, setY] = useState();
	const componentContext = useContext(ComponentContext);

	const globalContext = useContext(GlobalContext);
	const rndREF = useRef(0);
	function dragStop(data) {
		setX(data.x);
		setY(data.y);
		console.log(rndREF.current);
		globalContext.updateComponentPosition({
			DashboardID: componentContext.DashboardNumber - 1,
			ComponentID: componentContext.ComponentNumber - 1,
			xPos: data.x,
			yPos: data.y,
		});
	}

	return (
		<Rnd
			ref={rndREF}
			default={{
				x:
					globalContext.dashboard.dashboards[
						componentContext.DashboardNumber - 1
					].components[componentContext.ComponentNumber - 1].xPos / 2,
				y:
					globalContext.dashboard.dashboards[
						componentContext.DashboardNumber - 1
					].components[componentContext.ComponentNumber - 1].yPos *
						0.49 +
					150,
			}}
			onDragStop={(e, d) => {
				dragStop(e, d);
			}}
			dragHandleClassName={"dragHandle"}
			bounds={"parent"}>
			{props.children}
		</Rnd>
	);
}

export const ResizableWrapper = (props) => {
	const style = {
		display: "flex",
		flexDirection: "column",
		border: "solid 1px #ddd",
		background: "rgba(0, 27, 45, 0.9)",
	};
	const componentContext = useContext(ComponentContext);
	const globalContext = useContext(GlobalContext);

	const [save, toggleSave] = useState(false);
	const [width, setWidth] = React.useState();
	const [height, setHeight] = React.useState();
	console.log();
	function resize(d) {
		setWidth(width + d.width);
		setHeight(height + d.height);
		globalContext.updateComponentSize({
			DashboardID: componentContext.DashboardNumber - 1,
			ComponentID: componentContext.ComponentNumber - 1,
			widthDelta: d.width,
			heightDelta: d.height,
		});
	}

	return (
		<div style={{ float: "left", paddingLeft: "2rem" }}>
			<Resizable
				style={style}
				defaultSize={{
					width:
						globalContext.dashboard.dashboards[
							componentContext.DashboardNumber - 1
						].components[componentContext.ComponentNumber - 1].width,
					height:
						globalContext.dashboard.dashboards[
							componentContext.DashboardNumber - 1
						].components[componentContext.ComponentNumber - 1].height,
				}}
				onResizeStop={(ev, dir, ref, delta) => {
					console.log(delta);
					resize(delta);
				}}>
				{props.children}
			</Resizable>
		</div>
	);
};

export const ComponentReducer = (props) => {
	switch (props.type) {
		case "Ratios":
			return (
				<DraggableWrapper>
					{" "}
					<ResizableWrapper>
						<Ratios />
					</ResizableWrapper>
				</DraggableWrapper>
			);
		case "Growth":
			return (
				<DraggableWrapper>
					{" "}
					<ResizableWrapper>
						<Growth></Growth>
					</ResizableWrapper>
				</DraggableWrapper>
			);
		case "CashFlow":
			break;
		case "IncomeStatement":
			break;
		case "BalanceSheet":
			break;
		case "IncomeBreakdown":
			break;
		case "EquityBreakdown":
			break;
		case "AssetBreakdown":
			break;
		case "":
			break;
		default:
			break;
	}
};
