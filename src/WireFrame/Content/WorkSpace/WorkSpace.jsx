import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ComponentReducer } from "../../../Components/ComponentWrapper/ComponentWrapper";
import "./WorkSpace.css";
import { createContext, useContext } from "react";
import { DashboardContext } from "../Content";
import { GlobalContext } from "../../../Store/GlobalStore";

export const ComponentContext = createContext();
export default function WorkSpaceUI() {
	const DashboardNum = useContext(DashboardContext);
	const globalContext = useContext(GlobalContext);
	const components = globalContext.fetchComponents(DashboardNum);

	return (
		<>
			{components[0].components.map((comp, index) => {
				return (
					<ComponentContext.Provider
						value={{ DashboardNumber: DashboardNum, ComponentNumber: comp.id }}
						key={index}>
						<ComponentReducer type={comp.type}></ComponentReducer>{" "}
					</ComponentContext.Provider>
				);
			})}
		</>
	);
}