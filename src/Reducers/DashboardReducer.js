import deepCopy from "deepcopy";

export function dashboardReducer(state, action) {
	let copy = null;
	switch (action.type) {
		case "REFRESH_DATA":
			return {
				...action.payload.data,
			};
		case "REMOVE_COMPONENT":
			copy = deepCopy(state);
			copy.dashboards[action.payload.DashboardID].components.filter((comp) => {
				return comp.id !== action.payload.ComponentID;
			});
			return {
				...copy,
			};
		case "ADD_COMPONENT":
			copy = deepCopy(state);

			copy.dashboards[action.payload.DashboardID].components.push(
				action.payload
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
