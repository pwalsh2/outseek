import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import {
	IncomeBreakdown,
	AssetBreakdown,
	LiabilitiesBreakdown,
	EquitiesBreakdown,
} from "../../../Components/Charts/Presets/BreakdownCharts";
import {
	Ratios,
	Growth,
} from "../../../Components/Analysis/Overview/Ratios/Ratios";
import {
	BalanceSheet,
	IncomeStatement,
	CashFlow,
} from "../../../Components/FinancialStatements/FinancialStatements/FinancialStatements";
import Screener from "../../../Components/Screener/Screener/Screener";
export default function WorkSpaceUI() {
	return (
		<div className='WorkSpaceDiv'>
			<div></div>
			<div style={{ padding: "15px" }}>
				<Ratios />
				<Growth />
				{/* <Screener /> */}
				<CashFlow />
				<BalanceSheet />
				<IncomeStatement />

				<AssetBreakdown />
				<LiabilitiesBreakdown />
				<EquitiesBreakdown />
				<IncomeBreakdown />
			</div>
			<div></div>
		</div>
	);
}
