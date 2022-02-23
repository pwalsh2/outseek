import React, { createContext, useEffect, useReducer, useState } from "react";
import { dashboardReducer } from "../Reducers/DashboardReducer";
import axios from "axios";

const InitialState = {
	user: {
		id: 1,
		name: "John Doe",
		dashboards: [
			{
				id: 1,
				name: "Nathan's Dashboard",
				components: [
					{
						id: 1,
						type: "Ratios",
						width: 300,
						height: 400,
						xPos: 0,
						yPos: 0,
						core: {},
						ticker: "AAPL",
					},
					{
						id: 2,
						type: "Ratios",
						width: 300,
						height: 400,
						xPos: 100,
						yPos: 0,
						core: {},
						ticker: "AAPL",
					},
					{
						id: 3,
						type: "Growth",
						width: 500,
						height: 1000,
						xPos: 300,
						yPos: 0,
						core: {},
						ticker: "AAPL",
					},
				],
			},
			{
				id: 2,
				name: "Paul's Dashboard",
				components: [
					{
						id: 1,
						type: "Ratios",
						width: 300,
						height: 400,
						xPos: 500,
						yPos: 400,
						core: {},
						ticker: "AAPL",
					},
					{
						id: 2,
						type: "Ratios",
						width: 300,
						height: 400,
						xPos: 100,
						yPos: 400,
						core: {},
						ticker: "AAPL",
					},
				],
			},
		],
	},
};

async function fetchGlobalData(name) {
	return axios.get("http://localhost:3000/users");
}
export const GlobalContext = createContext(InitialState);

export const GlobalProvider = ({ children }) => {
	const [serverData, setServerData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [save, toggleSave] = useState(false);
	const [state, dispatch] = useReducer(dashboardReducer, InitialState.user);

	function addDashboard(dashboard) {
		dispatch({
			type: "ADD_DASHBOARD",
			payload: dashboard,
		});
	}

	function updateDashboards(dashboard) {
		dispatch({
			type: "UPDATE_DASHBOARD",
			payload: dashboard,
		});
	}

	function removeDashboard(id) {
		dispatch({
			type: "REMOVE_DASHBOARD",
			payload: id,
		});
	}

	function addComponent(component) {
		dispatch({
			type: "ADD_COMPONENT",
			payload: component,
		});
	}

	function removeComponent(CompID, DashboardIDIN) {
		dispatch({
			type: "REMOVE_COMPONENT",
			payload: { DashboardID: DashboardIDIN, ComponentID: CompID },
		});
	}

	function updateComponentSize(updateSizeObj) {
		dispatch({ type: "UPDATE_SIZE", payload: updateSizeObj });
	}

	function updateComponentPosition(updatePositionObj) {
		dispatch({
			type: "UPDATE_POSITION",
			payload: updatePositionObj,
		});

		console.log(state);
	}

	function updateComponentCore(updateCoreObj) {
		dispatch({
			type: "UPDATE_CORE",
			payload: updateCoreObj,
		});
	}

	function updateComponentTicker(updateTickerObj) {
		dispatch({
			type: "UPDATE_TICKER",
			payload: updateTickerObj,
		});
		console.log(state);
	}
	function saveState() {
		toggleSave(!save);
	}

	function fetchComponents(DashboardID) {
		return state.dashboards.filter((d) => {
			return d.id === DashboardID;
		});
	}
	return (
		<GlobalContext.Provider
			value={{
				dashboard: state,
				loading: loading,

				addDashboard,
				fetchComponents,
				updateDashboards,
				removeDashboard,
				addComponent,
				removeComponent,
				updateComponentSize,
				updateComponentCore,
				updateComponentPosition,
				updateComponentTicker,
				saveState,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};
