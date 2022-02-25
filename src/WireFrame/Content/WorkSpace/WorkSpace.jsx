import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ComponentReducer } from "../../../Components/ComponentWrapper/ComponentWrapper";
import "./WorkSpace.css";
import { createContext, useContext, useEffect } from "react";
import { DashboardContext } from "../Content";
import { GlobalContext } from "../../../Store/GlobalStore";

export const ComponentContext = createContext();
export default function WorkSpaceUI(props) {
	const DashboardNum = useContext(DashboardContext);
	const globalContext = useContext(GlobalContext);

	return (
		<>
			{props.components.map((comp, index) => {
				return (
					<ComponentContext.Provider
						value={{
							DashboardNumber: DashboardNum,
							ComponentNumber: index + 1,
						}}
						key={index}>
						<ComponentReducer type={comp.type}></ComponentReducer>{" "}
					</ComponentContext.Provider>
				);
			})}
		</>
	);
} 