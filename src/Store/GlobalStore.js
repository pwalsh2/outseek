import React, {
	createContext,
	useEffect,
	useMemo,
	useReducer,
	useState,
} from "react";

import {
	dashboardReducer,
	dashboardStateReducer,
} from "../Reducers/DashboardReducer";

import axios from "axios";
import deepCopy from "deepcopy";
import { INIT_DASHBOARD_STATE } from "../Utils/Constants";
import {
	ADD_DASHBOARD,
	DELETE_DASHBOARD,
	UPDATE_DASHBOARD,
	LOAD_DASHBOARD_STATE,
	ADD_COMPONENT,
} from "../Utils/Constants";

async function postGlobalData(dataIN) {
	const data = deepCopy(dataIN);
	return axios.put("http://localhost:3000/users/1", data);
}
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
	const [save, toggleSave] = useState(false);
	const [state, dispatch] = useReducer(
		dashboardStateReducer,
		INIT_DASHBOARD_STATE
	);

	function fetchData() {
		fetchGlobalData("Pwalsh2").then((data) => {
			console.log(data);
			dispatch({
				type: LOAD_DASHBOARD_STATE,
				payload: data.data,
			});
		});
	}
	function addDashboard(dashboard) {
		dispatch({
			type: ADD_DASHBOARD,
			payload: dashboard,
		});
	}

	function updateDashboardLayout(dashboardID, NewLayout) {
		dispatch({
			type: UPDATE_DASHBOARD,
			payload: { id: dashboardID, layout: NewLayout },
		});
	}

	function removeDashboard(id) {
		dispatch({
			type: DELETE_DASHBOARD,
			payload: id,
		});
	}

	function fetchComponents(DashboardID) {
		return state.dashboards.filter((d) => {
			return d.id === DashboardID;
		});
	}

	return (
		<GlobalContext.Provider
			value={{
				state,
				fetchComponentsListLength,
				fetchData,
				PostData,
				addDashboard,
				updateDashboardLayout,
				fetchComponents,
				removeDashboard,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

async function fetchGlobalData(name) {
	return axios.get("http://localhost:3000/dashboards");
}

function PostData(state) {
	postGlobalData(state).then((resp) => console.log("posted data!!!", resp));
}

function fetchComponentsListLength(DashboardID, state) {
	return state.dashboards[DashboardID - 1].components.length;
}


