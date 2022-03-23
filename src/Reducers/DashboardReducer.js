import deepCopy from "deepcopy";
import {
	ADD_DASHBOARD,
	DELETE_DASHBOARD,
	UPDATE_DASHBOARD,
	LOAD_DASHBOARD_STATE,
} from "../Utils/Constants";
export function dashboardReducer(state, action) {
	let copy = null;
	switch (action.type) {
		case "REFRESH_DATA":
			return {
				...action.payload[0],
			};
		case "TRIGGER_UPDATE":
			action.payload.triggerFunc(!action.payload.oldValue);
			return {
				...state,
			};
		case "REMOVE_COMPONENT":
			copy = deepCopy(state);
			console.log(action.payload);
			console.log(copy);
			var temp = copy.dashboards[action.payload.DashboardID - 1].components.map(
				(comp, index, arr) => {
					if (index + 1 !== action.payload.ComponentID) {
						console.log(index, arr, action.payload);
						return comp;
					} else {
						console.log(index, arr, action.payload);

						return null;
					}
				}
			);
			temp = temp.filter((n) => n);
			copy.dashboards[action.payload.DashboardID - 1].components = [...temp];
			return {
				...copy,
			};
		case "ADD_COMPONENT":
			copy = deepCopy(state);

			copy.dashboards[action.payload.DashboardID - 1].components.push(
				action.payload.component
			);

			return {
				...copy,
			};
		case "UPDATE_SIZE":
			copy = deepCopy(state);

			copy.dashboards[action.payload.DashboardID].components[
				action.payload.ComponentID
			].width =
				copy.dashboards[action.payload.DashboardID].components[
					action.payload.ComponentID
				].width + action.payload.widthDelta;
			copy.dashboards[action.payload.DashboardID].components[
				action.payload.ComponentID
			].height =
				copy.dashboards[action.payload.DashboardID].components[
					action.payload.ComponentID
				].height + action.payload.heightDelta;

			return {
				...copy,
			};
		case "UPDATE_POSITION":
			copy = deepCopy(state);
			copy.dashboards[action.payload.DashboardID].components[
				action.payload.ComponentID
			].yPos = action.payload.yPos;
			copy.dashboards[action.payload.DashboardID].components[
				action.payload.ComponentID
			].xPos = action.payload.xPos;
			return {
				...copy,
			};

		case "UPDATE_CORE":
			copy = deepCopy(state);
			console.log(action.payload);
			copy.dashboards[action.payload.DashboardID].components[
				action.payload.ComponentID
			].core = action.payload.core;

			return {
				...copy,
			};

		case "UPDATE_TICKER":
			copy = deepCopy(state);
			console.log(action.payload);
			copy.dashboards[action.payload.DashboardID].components[
				action.payload.ComponentID
			].ticker = action.payload.Ticker;

			return {
				...copy,
			};
		case "SAVE":
			copy = deepCopy(state);
			copy.dashboards[action.payload.DashboardID].components[
				action.payload.ComponentID
			].width = action.payload.width;
			copy.dashboards[action.payload.DashboardID].components[
				action.payload.ComponentID
			].height = action.payload.height;

			return {
				...copy,
			};
		case "LOAD":
			copy = deepCopy(state);
			copy.dashboards[action.payload.DasbboardID].components[
				action.payload.ComponentID
			].width = action.payload.width;
			copy.dashboards[action.payload.DasbboardID].components[
				action.payload.ComponentID
			].height = action.payload.height;

			return {
				...copy,
			};
		default:
			return state;
	}
}

export function dashboardStateReducer(state, action) {
	let copy = deepCopy(state);
	switch (action.type) {
		case LOAD_DASHBOARD_STATE:
			return {
				loading: false,
				dashboards: [...action.payload],
			};
		case DELETE_DASHBOARD:
			copy = copy.filter((dashboard) => {
				return dashboard.id !== action.payload;
			});
			return {
				...copy,
			};
		case ADD_DASHBOARD:
			copy = copy.push(action.payload);
			return { ...copy };
		case UPDATE_DASHBOARD:
			copy = copy.map((dashboard) => {
				if (dashboard.id === action.payload.id) {
					dashboard.layout = action.payload.layout;
					return dashboard;
				}
				return dashboard;
			});

			return {
				...copy,
			};
		default:
			return {
				...state,
			};
	}
}