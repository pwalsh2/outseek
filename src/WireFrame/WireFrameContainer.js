import React, { useEffect } from "react";
import WireFrame from "./WireFrame";
import { GlobalContext } from "../Store/GlobalStore";

export const WireFrameContainer = () => {
	const globalContext = React.useContext(GlobalContext);

	return <WireFrame loading={globalContext.state.loading} />;
};