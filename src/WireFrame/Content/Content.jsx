import React, { useContext, createContext } from "react";
import "./Content-Styles.css";
import WorkSpaceUI from "./WorkSpace/WorkSpace";
export const DashboardContext = createContext();

const ContentArea = (props) => {
	return (
		<div className='content-area'>
			<DashboardContext.Provider value={props.index}>
				<WorkSpaceUI></WorkSpaceUI>
			</DashboardContext.Provider>
		</div>
	);
};

export default ContentArea;
