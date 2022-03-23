import React, { useEffect, useState, useContext, useCallback } from "react";

import { Ratios, Growth } from "../Components/Analysis/Overview/Ratios/Ratios";
import TradingViewWidget from "react-tradingview-widget";

export const ComponentFactory = (props) => {
	switch (props.type) {
		case "Ratios":
			return <Ratios />;
		case "Growth":
			return <Growth></Growth>;
		case "CashFlow":
			break;
		case "IncomeStatement":
			break;
		case "BalanceSheet":
			break;
		case "IncomeBreakdown":
			break;
		case "EquityBreakdown":
			break;
		case "AssetBreakdown":
			break;
		case "":
			break;
		default:
			break;
	}
};
