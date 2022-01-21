import React from "react";
import "./Content-Styles.css";

import WorkSpaceUI from "./WorkSpace/WorkSpace";
const ContentArea = () => {
	return (
		<div className='content-area'>
			<WorkSpaceUI></WorkSpaceUI>
		</div>
	);
};

export default ContentArea;
