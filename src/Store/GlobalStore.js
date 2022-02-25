import React, {
	createContext,
	useEffect,
	useMemo,
	useReducer,
	useState,
} from "react";
import { dashboardReducer } from "../Reducers/DashboardReducer";
import axios from "axios";
import deepCopy from "deepcopy";

const InitialState = {
	user: {
		id: 1,
		name: "John Doe",
		loading: true,
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

async function postGlobalData(dataIN) {
	const data = deepCopy(dataIN);
	console.log(data);
	return axios.put("http://localhost:3000/users/1", data);
}
export const GlobalContext = createContext(InitialState);

export const GlobalProvider = ({ children }) => {
	const [serverData, setServerData] = useState(null);
	const [loading, setLoading] = useState(true);

	const [save, toggleSave] = useState(false);
	const [state, dispatch] = useReducer(dashboardReducer, InitialState.user);
	const [currentDashboard, setCurrentDashboard] = useState(1);
	const [componentUpdate, triggerUpdate] = useState(false);
	function RefreshData() {
		fetchGlobalData("Pwalsh2").then((data) => {
			dispatch({
				type: "REFRESH_DATA",
				payload: data.data,
			});
		});
	}

	function triggerUpdateFunc() {
		dispatch({
			type: "TRIGGER_UPDATE",
			payload: { oldValue: componentUpdate, triggerFunc: triggerUpdate },
		});
	}
	function fetchComponentsListLength(DashboardID) {
		console.log(DashboardID);
		return state.dashboards[DashboardID - 1].components.length;
	}
	function updateCurrentDashboard(newID) {
		setCurrentDashboard(newID);
	}
	function PostData() {
		postGlobalData(state).then((resp) => RefreshData());
	}
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

	function addComponent(component, DashboardID) {
		component.id = fetchComponentsListLength(DashboardID);
		dispatch({
			type: "ADD_COMPONENT",
			payload: {
				component: component,
				DashboardID: DashboardID,
			},
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
				currentDashboard: currentDashboard,
				didUpdate: componentUpdate,
				triggerUpdateFunc,
				fetchComponentsListLength,
				updateCurrentDashboard,
				PostData,
				RefreshData,
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
