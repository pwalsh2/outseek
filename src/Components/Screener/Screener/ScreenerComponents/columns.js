
import { ColumnFilter } from "./ColumnFilter";

export const COLUMNS = [
	{ accessor: "id", header: "id", show: false },
	{
		accessor: "symbol",
		header: "Symbol",
		style: { whiteSpace: "nowrap" },
		Filter: ColumnFilter,
		filter: "Text",
		show: true,
	},
	{
		accessor: "companyName",
		header: "Company Name",
		show: true,
		Filter: ColumnFilter,
		filter: "Text",
	},
	{
		accessor: "exchange",
		header: "Exchange",
		show: true,
		Filter: ColumnFilter,
		filter: "Text",
	},

	{
		accessor: "quickRatio",
		header: "Quick Ratio",
		show: false,
	},

	{
		accessor: "revenueGrowth",
		header: "Revenue Growth",
		show: false,
	},
	{
		accessor: "grossProfitGrowth",
		header: "Gross Profit Growth",
		show: false,
	},
	{
		accessor: "ebitgrowth",
		header: "Ebit growth",
		show: false,
	},
	{
		accessor: "operatingIncomeGrowth",
		header: "Operating Income Growth",
		show: false,
	},
	{
		accessor: "netIncomeGrowth",
		header: "Net Income Growth",
		show: false,
	},
	{
		accessor: "epsdilutedGrowth",
		header: "EPS Diluted Growth",
		show: false,
	},
	{
		accessor: "weightedAverageSharesGrowth",
		header: "Weighted Average Shares Growth",
		show: false,
	},
	{
		accessor: "weightedAverageSharesDilutedGrowth",
		header: "Weighted Average Shares Diluted Growth",
		show: false,
	},
	{
		accessor: "dividendsperShareGrowth",
		header: "Dividends per Share Growth",
		show: false,
	},
	{
		accessor: "operatingCashFlowGrowth",
		header: "Operating Cash Flow Growth",
		show: false,
	},
	{
		accessor: "freeCashFlowGrowth",
		header: "Free Cash Flow Growth",
		show: false,
	},
	{
		accessor: "tenYRevenueGrowthPerShare",
		header: "10 Year Revenue Growth Per Share",
		show: false,
	},
	{
		accessor: "fiveYRevenueGrowthPerShare",
		header: "5 Year Revenue Growth Per Share",
		show: false,
	},
	{
		accessor: "threeYRevenueGrowthPerShare",
		header: "3 Year Revenue Growth Per Share",
		show: false,
	},
	{
		accessor: "tenYOperatingCFGrowthPerShare",
		header: "10 Year Operating Cash Flow Growth Per Share",
		show: false,
	},
	{
		accessor: "fiveYOperatingCFGrowthPerShare",
		header: "5 Year Operating Cash Flow Growth Per Share",
		show: false,
	},
	{
		accessor: "threeYOperatingCFGrowthPerShare",
		header: "3 Year Operating Cash Flow Growth Per Share",
		show: false,
	},
	{
		accessor: "tenYNetIncomeGrowthPerShare",
		header: "10 Year Net Income Growth Per Share",
		show: false,
	},
	{
		accessor: "fiveYNetIncomeGrowthPerShare",
		header: "5 Year Net Income Growth Per Share",
		show: false,
	},
	{
		accessor: "threeYNetIncomeGrowthPerShare",
		header: "3 Year Net Income Growth Per Share",
		show: false,
	},
	{
		accessor: "tenYShareholdersEquityGrowthPerShare",
		header: "10 Year Shareholders Equity Growth Per Share",
		show: false,
	},
	{
		accessor: "fiveYShareholdersEquityGrowthPerShare",
		header: "5 Year Shareholders Equity Growth Per Share",
		show: false,
	},
	{
		accessor: "threeYShareholdersEquityGrowthPerShare",
		header: "3 Year Shareholders Equity Growth Per Share",
		show: false,
	},
	{
		accessor: "fiveYDividendperShareGrowthPerShare",
		header: "5 Year Dividend Per Share Growth Per Share",
		show: false,
	},
	{
		accessor: "threeYDividendperShareGrowthPerShare",
		header: "3 Year Dividend Per Share Growth Per Share",
		show: false,
	},
	{
		accessor: "receivablesGrowth",
		header: "Receivables Growth",
		show: false,
	},
	{
		accessor: "inventoryGrowth",
		header: "Inventory Growth",
		show: false,
	},
	{
		accessor: "assetGrowth",
		header: "Asset Growth",
		show: false,
	},
	{
		accessor: "bookValueperShareGrowth",
		header: "Book Value Per Share Growth",
		show: false,
	},
	{
		accessor: "debtGrowth",
		header: "Debt Growth",
		show: false,
	},
	{
		accessor: "rdexpenseGrowth",
		header: "Research and Development Expense Growth",
		show: false,
	},
	{
		accessor: "sgaexpensesGrowth",
		header: "Selling, general and administrative Expenses Growth",
		show: false,
	},
	{
		accessor: "revenuePerShare",
		header: "Revenue Per Share",
		show: false,
	},
	{
		accessor: "netIncomePerShare",
		header: "Net Income Per Share",
		show: false,
	},
	{
		accessor: "operatingCashFlowPerShare",
		header: "Operating Cash Flow Per Share",
		show: false,
	},
	{
		accessor: "freeCashFlowPerShare",
		header: "Free Cash Flow Per Share",
		show: false,
	},
	{
		accessor: "cashPerShare",
		header: "Cash Per Share",
		show: false,
	},
	{
		accessor: "tangibleBookValuePerShare",
		header: "Tangible Book Value Per Share",
		show: false,
	},
	{
		accessor: "priceToSalesRatio",
		header: "Price To Sales Ratio",
		show: false,
	},
	{
		accessor: "enterpriseValueOverEBITDA",
		header: "Enterprise Value Over EBITDA",
		show: false,
	},
	{
		accessor: "evToOperatingCashFlow",
		header: "Enterprise Value To Operating Cash Flow",
		show: false,
	},
	{
		accessor: "evToFreeCashFlow",
		header: "Enterprise Value To Free Cash Flow",
		show: false,
	},
	{
		accessor: "earningsYield",
		header: "Earnings Yield",
		show: false,
	},
	{
		accessor: "freeCashFlowYield",
		header: "Free Cash Flow Yield",
		show: false,
	},
	{
		accessor: "debtToEquity",
		header: "Debt To Equity",
		show: false,
	},
	{
		accessor: "debtToAssets",
		header: "Debt To Assets",
		show: false,
	},
	{
		accessor: "netDebtToEBITDA",
		header: "Net Debt To EBITDA",
		show: false,
	},
	{
		accessor: "currentRatio",
		header: "Current Ratio",
		show: false,
	},
	{
		accessor: "interestCoverage",
		header: "Interest Coverage",
		show: false,
	},
	{
		accessor: "dividendYield",
		header: "Dividend Yield",
		show: false,
	},
	{
		accessor: "payoutRatio",
		header: "Payout Ratio",
		show: false,
	},
	{
		accessor: "salesGeneralAndAdministrativeToRevenue",
		header: "Sales General And Administrative To Revenue",
		show: false,
	},
	{
		accessor: "researchAndDdevelopementToRevenue",
		header: "Research And Developement To Revenue",
		show: false,
	},
	{
		accessor: "intangiblesToTotalAssets",
		header: "Intangibles To Total Assets",
		show: false,
	},
	{
		accessor: "capexToOperatingCashFlow",
		header: "Capital Expenditure To Operating Cash Flow",
		show: false,
	},
	{
		accessor: "capexToRevenue",
		header: "Capital Expenditure To Revenue",
		show: false,
	},
	{
		accessor: "capexToDepreciation",
		header: "Capital Expenditure To Depreciation",
		show: false,
	},
	{
		accessor: "returnOnTangibleAssets",
		header: "Return On Tangible Assets",
		show: false,
	},
	{
		accessor: "grahamNetNet",
		header: "Graham Net Net",
		show: false,
	},
	{
		accessor: "workingCapital",
		header: "Working Capital",
		show: false,
	},
	{
		accessor: "tangibleAssetValue",
		header: "Tangible Asset Value",
		show: false,
	},
	{
		accessor: "netCurrentAssetValue",
		header: "Net Current Asset Value",
		show: false,
	},
	{
		accessor: "investedCapital",
		header: "Invested Capital",
		show: false,
	},
	{
		accessor: "averageReceivables",
		header: "Average Receivables",
		show: false,
	},
	{
		accessor: "averagePayables",
		header: "Average Payables",
		show: false,
	},
	{
		accessor: "averageInventory",
		header: "Average Inventory",
		show: false,
	},
	{
		accessor: "receivablesTurnover",
		header: "Receivables Turnover",
		show: false,
	},
	{
		accessor: "payablesTurnover",
		header: "Payables Turnover",
		show: false,
	},
	{
		accessor: "inventoryTurnover",
		header: "Inventory Turnover",
		show: false,
	},
	{
		accessor: "roe",
		header: "Return On Equity",
		show: false,
	},
	{
		accessor: "capexPerShare",
		header: "Capital Expenditure Per Share",
		show: false,
	},
	{
		accessor: "price",
		header: "Share Price",
		show: true,
	},
	{
		accessor: "beta",
		header: "Beta",
		show: true,
	},
	{
		accessor: "volAvg",
		header: "Average Volume",
		show: false,
	},
	{
		accessor: "lastDiv",
		header: "Last Dividend",
		show: false,
	},
	{
		accessor: "range",
		header: "Range",
		show: false,
	},
	{
		accessor: "ceo",
		header: "CEO Of Company",
		Filter: ColumnFilter,
		filter: "Text",
		show: false,
	},
	{
		accessor: "sector",
		header: "Sector",
		Filter: ColumnFilter,
		filter: "Text",
		show: false,
	},
	{
		accessor: "country",
		header: "Country",
		Filter: ColumnFilter,
		filter: "Text",
		show: false,
	},
	{
		accessor: "fullTimeEmployees",
		header: "Full Time Employees",

		show: false,
	},
	{
		accessor: "city",
		header: "City",
		Filter: ColumnFilter,
		filter: "Text",
	},
	{
		accessor: "state",
		header: "State",
		Filter: ColumnFilter,
		filter: "Text",
		show: false,
	},
	{
		accessor: "dcfDiff",
		header: "Discounted cash flow Difference",
		show: false,
	},
	{
		accessor: "dcf",
		header: "Discounted cash flow",
		show: false,
	},
	{
		accessor: "ipoDate",
		header: "IPO Date",
		show: false,
	},
	{
		accessor: "isEtf",
		header: "Is an ETF",
		show: false,
	},
	{
		accessor: "isActivelyTrading",
		header: "Is Actively Trading",
		show: false,
	},
	{
		accessor: "cashRatio",
		header: "Cash Ratio",
		show: false,
	},
	{
		accessor: "daysOfSalesOutstanding",
		header: "Days Of Sales Outstanding",
		show: false,
	},
	{
		accessor: "daysOfInventoryOutstanding",
		header: "Days Of Inventory Outstanding",
		show: false,
	},
	{
		accessor: "operatingCycle",
		header: "Operating Cycle",
		show: false,
	},
	{
		accessor: "cashConversionCycle",
		header: "Cash Conversion Cycle",
		show: false,
	},
	{
		accessor: "grossProfitMargin",
		header: "Gross Profi tMargin",
		show: false,
	},
	{
		accessor: "operatingProfitMargin",
		header: "Operating Profit Margin",
		show: false,
	},
	{
		accessor: "pretaxProfitMargin",
		header: "Pretax Profit Margin",
		show: false,
	},
	{
		accessor: "netProfitMargin",
		header: "Net Profit Margin",
		show: false,
	},
	{
		accessor: "effectiveTaxRate",
		header: "Effective Tax Rate",
		show: false,
	},

	{
		accessor: "returnOnAssets",
		header: "Return On Assets",
		show: false,
	},
	{
		accessor: "returnOnEquity",
		header: "Return On Equity",
		show: false,
	},
	{
		accessor: "returnOnCapitalEmployed",
		header: "Return On Capital Employed",
		show: false,
	},
	{
		accessor: "netIncomePerEBT",
		header: "Net Income Per EBT",
		show: false,
	},
	{
		accessor: "ebtPerEbit",
		header: "EBT Per EBIT",
		show: false,
	},
	{
		accessor: "ebitPerRevenue",
		header: "EBIT Per Revenue",
		show: false,
	},
	{
		accessor: "debtRatio",
		header: "Debt Ratio",
		show: false,
	},
	{
		accessor: "debtEquityRatio",
		header: "Debt To Equity Ratio",
		show: false,
	},
	{
		accessor: "longTermDebtToCapitalization",
		header: "Long Term Debt To Capitalization",
		show: false,
	},
	{
		accessor: "totalDebtToCapitalization",
		header: "Total Debt To Market Capitalization",
		show: false,
	},
	{
		accessor: "cashFlowToDebtRatio",
		header: "Cash Flow To Debt Ratio",
		show: false,
	},
	{
		accessor: "companyEquityMultiplier",
		header: "Company Equity Multiplier",
		show: false,
	},
	{
		accessor: "dividendPayoutRatio",
		header: "Dividend Payout Ratio",
		show: false,
	},
	{
		accessor: "priceBookValueRatio",
		header: "Price To Book Value Ratio",
		show: false,
	},
	{
		accessor: "priceToBookRatio",
		header: "Price To Book Ratio",
		show: false,
	},
	{
		accessor: "priceEarningsRatio",
		header: "Price To Earnings Ratio",
		show: false,
	},
	{
		accessor: "priceToFreeCashFlowsRatio",
		header: "Price To Free Cash Flows Ratio",
		show: false,
	},
	{
		accessor: "priceCashFlowRatio",
		header: "Price Cash Flow Ratio",
		show: false,
	},
	{
		accessor: "priceEarningsToGrowthRatio",
		header: "Price Earnings To Growth Ratio",
		show: false,
	},
	{
		accessor: "date",
		header: "Date",
		show: false,
	},
	{
		accessor: "epsgrowth",
		header: "EPS Growth",
		show: false,
	},
	{
		accessor: "mktCap",
		header: "Market Cap",
		show: false,
	},
	{
		accessor: "isin",
		header: "ISIN",
		show: false,
	},
	{
		accessor: "industry",
		header: "Industry",
		show: false,
	},
	{
		accessor: "index",
		header: "Index",
		show: false,
	},
	{
		accessor: "exchangeShortName",
		header: "Exchange Short Name",
		show: false,
	},
	{
		accessor: "currency",
		header: "Currency",
		show: false,
	},
	{
		accessor: "changes",
		header: "Changes",
		show: false,
	},
	{
		accessor: "address",
		header: "Address",
		show: false,
	},
	{
		accessor: "stockBasedCompensationToRevenue",
		header: "Stock Based Compensation To Revenue",
		show: false,
	},
	{
		accessor: "shareholdersEquityPerShare",
		header: "Shareholders Equity Per Share",
		show: false,
	},
	{
		accessor: "interestDebtPerShare",
		header: "Interest Debt Per Share",
		show: false,
	},
	{
		accessor: "incomeQuality",
		header: "Income Quality",
		show: false,
	},
	{
		accessor: "priceSalesRatio",
		header: "Price To Sales Ratio",
		show: false,
	},
	{
		accessor: "priceToOperatingCashFlowsRatio",
		header: "Price To Operating Cash Flows Ratio",
		show: false,
	},
	{
		accessor: "assetTurnover",
		header: "Asset Turnover",
		show: false,
	},
	{
		accessor: "fixedAssetTurnover",
		header: "Fixed Asset Turnover",
		show: false,
	},
	{
		accessor: "period",
		header: "Period",
		show: false,
	},
];
