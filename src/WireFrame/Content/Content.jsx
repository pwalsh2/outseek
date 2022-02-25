import React, { useContext, createContext } from "react";
import "./Content-Styles.css";
import WorkSpaceUI from "./WorkSpace/WorkSpace";

import { GlobalContext } from "../../Store/GlobalStore";

export const DashboardContext = createContext();

const ContentArea = (props) => {
	const globalContext = useContext(GlobalContext);
	const components = props.components;
	console.log(components);
	return (
		<div className='content-area'>
			<DashboardContext.Provider value={props.index}>
				<WorkSpaceUI components={components}></WorkSpaceUI>
			</DashboardContext.Provider>
		</div>
	);
};

export default ContentArea;
