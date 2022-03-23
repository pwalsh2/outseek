import Header from "./Header/Header";
import ToolMenu from "./ToolMenu/ToolMenu";
import { Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Store/GlobalStore";
import { AssetBreakdown } from "../Components/Charts/Presets/BreakdownCharts";
import { Button } from "react-bootstrap";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-grid-layout/css/styles.css";
const ResponsiveGridLayout = WidthProvider(Responsive);
function WireFrame(props) {
	const globalContext = useContext(GlobalContext);
	const [layoutState, setLayoutState] = useState();
	console.log(globalContext);
	const layout = {
		xs: [{ i: "1", x: 0, y: 0, w: 2, h: 1, minW: 2, minH: 1, comp: 1 }],
		md: [{ i: "2", x: 10, y: 0, w: 2, h: 1, minW: 2, minH: 1, comp: 1 }],
	};
	const loading = props.loading;

	const updateLayout = (layoutNew, allLayouts) => {
		console.log(layoutNew, allLayouts);
		setLayoutState(...layoutNew);
		console.log(layoutState);
	};
	return (
		<div>
			<Header></Header>
			<ToolMenu />
			{!loading && (
				<Tabs
					defaultActiveKey='profile'
					id='uncontrolled-tab-example'
					className='mb-3'>
					{globalContext.state.dashboards.map((dashboard, index) => {
						return (
							<Tab eventKey={dashboard.name} title={dashboard.name} key={index}>
								<ResponsiveGridLayout
									onLayoutChange={(l, allLayouts) =>
										updateLayout(l, allLayouts)
									}
									className='layout'
									layouts={layout}
									breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
									cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}>
									<div key='1'>
										<CustomGridItemComponent />
									</div>
								</ResponsiveGridLayout>
							</Tab>
						);
					})}
				</Tabs>
			)}
		</div>
	);
}

export default WireFrame;

const CustomGridItemComponent = React.forwardRef(
	
	({ style, className, ...props }, ref) => {
		return (
			<div style={{ ...style }} className={className} ref={ref}>
				<AssetBreakdown />
			</div>
		);
	}
);
