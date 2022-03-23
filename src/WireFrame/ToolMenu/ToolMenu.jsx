import React, { useContext } from "react";
import "./Header-Styles.css";
import { Button, ButtonGroup } from "react-bootstrap";
import { GlobalContext } from "../../Store/GlobalStore";
import "bootstrap/dist/css/bootstrap.min.css";


const ToolMenu = () => {
	const globalContext = useContext(GlobalContext);

	return (
		<header>
			<div className='toolbar-container'>
				<div className='toolbar' style={{ width: "19rem" }}>
					<ButtonGroup
						size='sm'
						aria-label='Basic example'
						style={{ height: "2.5rem", position: "absolute" }}>
						<Button
							variant='secondary'
							onClick={(e) => globalContext.PostData()}>
							Save
						</Button>
						{/* <Button
							variant='secondary'
							onClick={(e) =>
								globalContext.addComponent(
									componentConfigMapper["Ratios"],
									globalContext.currentDashboard
								)
							}>
							Analysis
						</Button> */}

						<Button variant='secondary'>Financial Statements</Button>

						<Button variant='secondary'> Screener</Button>

						<Button variant='secondary'>Income Breakdown</Button>

						<Button variant='secondary'>Asset Breakdown </Button>

						<Button variant='secondary'>Equity Breakdown</Button>

						<Button variant='secondary'>Liabilities Breakdown</Button>
					</ButtonGroup>
				</div>
				<div></div>
			</div>
		</header>
	);
};

export default ToolMenu;
