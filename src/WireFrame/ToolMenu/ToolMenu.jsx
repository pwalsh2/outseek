import React from "react";
import "./Header-Styles.css";
import { Button, ButtonGroup } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
const ToolMenu = () => {
	return (
		<header>
			<div className='toolbar-container'>
				<div className='toolbar' style={{ width: "19rem" }}>
					<ButtonGroup
						size='sm'
						aria-label='Basic example'
						style={{ height: "2.5rem", position: "absolute" }}>
						<Button variant='secondary'>Save</Button>
						<Button variant='secondary'>Analysis</Button>

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
