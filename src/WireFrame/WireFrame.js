import ContentArea from "./Content/Content";
import Header from "./Header/Header";
import ToolMenu from "./ToolMenu/ToolMenu";
import { Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Store/GlobalStore";

import { Button } from "react-bootstrap";

function WireFrame({ state }) {
	const globalContext = useContext(GlobalContext);
	const [loading, setLoading] = useState(true);

	return (
		<div>
			<Header></Header>
			<ToolMenu />
			{}
			<Tabs
				defaultActiveKey='profile'
				id='uncontrolled-tab-example'
				className='mb-3'>
				{globalContext.dashboard.dashboards.map((dashboard, index) => {
					return (
						<Tab eventKey={dashboard.name} title={dashboard.name} key={index}>
							<ContentArea index={index + 1}></ContentArea>
						</Tab>
					);
				})}
			</Tabs>{" "}
		</div>
	);
}

export default WireFrame;
