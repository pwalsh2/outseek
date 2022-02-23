import React from "react";
import styled from "styled-components";
import * as COLUMNS from "./columns";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce
} from "react-table";
// A great library for fuzzy filtering/sorting items
import matchSorter from "match-sorter";
import * as dataMOCK from "./MOCK_DATA_SCREENER.json";
import makeData from "./makeData";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div
      style={{
        display: "flex"
      }}
    >
      <span>
        <input
          value={filterValue || ""}
          onChange={(e) => setFilter(e.target.value)}
        />
      </span>
    </div>
  );
};

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0"
        }}
      />
    </span>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  );
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id }
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: "flex"
      }}
    >
      <input
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1]
          ]);
        }}
        placeholder={`Min (${min})`}
        style={{
          width: "70px",
          marginRight: "0.5rem"
        }}
      />
      to
      <input
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined
          ]);
        }}
        placeholder={`Max (${max})`}
        style={{
          width: "70px",
          marginLeft: "0.5rem"
        }}
      />
    </div>
  );
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Our table component
function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );
  console.log(dataMOCK);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    allColumns,
    preGlobalFilteredRows,
    getToggleHideAllColumnsProps,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: columns.map((column) => {
          if (column.show === false) return column.accessor || column.id;
        })
      },
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10);

  return (
    <>
      <div>
        <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle All
      </div>
        {allColumns.map(column => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.id}
            </label>
          </div>
        ))}
        <br />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left"
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

function Screener() {
  const columns = React.useMemo(
    () => [
      { accessor: "id", Header: "id", show: false },
      {
        accessor: "symbol",
        Header: "Symbol",
        style: { whiteSpace: "nowrap" },
        Filter: ColumnFilter,
        filter: "Text",
        show: true
      },
      {
        accessor: "companyName",
        Header: "Company Name",
        show: true,
        Filter: ColumnFilter,
        filter: "Text"
      },
      {
        accessor: "exchange",
        Header: "Exchange",
        show: true,
        Filter: ColumnFilter,
        filter: "Text"
      },

      {
        accessor: "quickRatio",
        Header: "Quick Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },

      {
        accessor: "revenueGrowth",
        Header: "Revenue Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "grossProfitGrowth",
        Header: "Gross Profit Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "ebitgrowth",
        Header: "Ebit growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "operatingIncomeGrowth",
        Header: "Operating Income Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "netIncomeGrowth",
        Header: "Net Income Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "epsdilutedGrowth",
        Header: "EPS Diluted Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "weightedAverageSharesGrowth",
        Header: "Weighted Average Shares Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "weightedAverageSharesDilutedGrowth",
        Header: "Weighted Average Shares Diluted Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "dividendsperShareGrowth",
        Header: "Dividends per Share Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "operatingCashFlowGrowth",
        Header: "Operating Cash Flow Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "freeCashFlowGrowth",
        Header: "Free Cash Flow Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "tenYRevenueGrowthPerShare",
        Header: "10 Year Revenue Growth Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "fiveYRevenueGrowthPerShare",
        Header: "5 Year Revenue Growth Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "threeYRevenueGrowthPerShare",
        Header: "3 Year Revenue Growth Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "tenYOperatingCFGrowthPerShare",
        Header: "10 Year Operating Cash Flow Growth Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "fiveYOperatingCFGrowthPerShare",
        Header: "5 Year Operating Cash Flow Growth Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "threeYOperatingCFGrowthPerShare",
        Header: "3 Year Operating Cash Flow Growth Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "tenYNetIncomeGrowthPerShare",
        Header: "10 Year Net Income Growth Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "fiveYNetIncomeGrowthPerShare",
        Header: "5 Year Net Income Growth Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "threeYNetIncomeGrowthPerShare",
        Header: "3 Year Net Income Growth Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "tenYShareholdersEquityGrowthPerShare",
        Header: "10 Year Shareholders Equity Growth Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "fiveYShareholdersEquityGrowthPerShare",
        Header: "5 Year Shareholders Equity Growth Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "threeYShareholdersEquityGrowthPerShare",
        Header: "3 Year Shareholders Equity Growth Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "fiveYDividendperShareGrowthPerShare",
        Header: "5 Year Dividend Per Share Growth Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "threeYDividendperShareGrowthPerShare",
        Header: "3 Year Dividend Per Share Growth Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "receivablesGrowth",
        Header: "Receivables Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "inventoryGrowth",
        Header: "Inventory Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "assetGrowth",
        Header: "Asset Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "bookValueperShareGrowth",
        Header: "Book Value Per Share Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "debtGrowth",
        Header: "Debt Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "rdexpenseGrowth",
        Header: "Research and Development Expense Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "sgaexpensesGrowth",
        Header: "Selling, general and administrative Expenses Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "revenuePerShare",
        Header: "Revenue Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "netIncomePerShare",
        Header: "Net Income Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "operatingCashFlowPerShare",
        Header: "Operating Cash Flow Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "freeCashFlowPerShare",
        Header: "Free Cash Flow Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "cashPerShare",
        Header: "Cash Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "tangibleBookValuePerShare",
        Header: "Tangible Book Value Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "priceToSalesRatio",
        Header: "Price To Sales Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "enterpriseValueOverEBITDA",
        Header: "Enterprise Value Over EBITDA",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "evToOperatingCashFlow",
        Header: "Enterprise Value To Operating Cash Flow",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "evToFreeCashFlow",
        Header: "Enterprise Value To Free Cash Flow",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "earningsYield",
        Header: "Earnings Yield",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "freeCashFlowYield",
        Header: "Free Cash Flow Yield",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "debtToEquity",
        Header: "Debt To Equity",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "debtToAssets",
        Header: "Debt To Assets",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "netDebtToEBITDA",
        Header: "Net Debt To EBITDA",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "currentRatio",
        Header: "Current Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "interestCoverage",
        Header: "Interest Coverage",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "dividendYield",
        Header: "Dividend Yield",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "payoutRatio",
        Header: "Payout Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "salesGeneralAndAdministrativeToRevenue",
        Header: "Sales General And Administrative To Revenue",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "researchAndDdevelopementToRevenue",
        Header: "Research And Developement To Revenue",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "intangiblesToTotalAssets",
        Header: "Intangibles To Total Assets",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "capexToOperatingCashFlow",
        Header: "Capital Expenditure To Operating Cash Flow",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "capexToRevenue",
        Header: "Capital Expenditure To Revenue",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "capexToDepreciation",
        Header: "Capital Expenditure To Depreciation",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "returnOnTangibleAssets",
        Header: "Return On Tangible Assets",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "grahamNetNet",
        Header: "Graham Net Net",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "workingCapital",
        Header: "Working Capital",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "tangibleAssetValue",
        Header: "Tangible Asset Value",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "netCurrentAssetValue",
        Header: "Net Current Asset Value",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "investedCapital",
        Header: "Invested Capital",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "averageReceivables",
        Header: "Average Receivables",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "averagePayables",
        Header: "Average Payables",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "averageInventory",
        Header: "Average Inventory",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "receivablesTurnover",
        Header: "Receivables Turnover",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "payablesTurnover",
        Header: "Payables Turnover",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "inventoryTurnover",
        Header: "Inventory Turnover",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "roe",
        Header: "Return On Equity",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "capexPerShare",
        Header: "Capital Expenditure Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "price",
        Header: "Share Price",
        show: true
      },
      {
        accessor: "beta",
        Header: "Beta",
        show: true
      },
      {
        accessor: "volAvg",
        Header: "Average Volume",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "lastDiv",
        Header: "Last Dividend",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "range",
        Header: "Range",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "ceo",
        Header: "CEO Of Company",
        Filter: ColumnFilter,
        filter: "Text",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "sector",
        Header: "Sector",
        Filter: ColumnFilter,
        filter: "Text",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "country",
        Header: "Country",
        Filter: ColumnFilter,
        filter: "Text",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "fullTimeEmployees",
        Header: "Full Time Employees",

        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "city",
        Header: "City",
        Filter: ColumnFilter,
        filter: "Text"
      },
      {
        accessor: "state",
        Header: "State",
        Filter: ColumnFilter,
        filter: "Text",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "dcfDiff",
        Header: "Discounted cash flow Difference",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "dcf",
        Header: "Discounted cash flow",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "ipoDate",
        Header: "IPO Date",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "isEtf",
        Header: "Is an ETF",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "isActivelyTrading",
        Header: "Is Actively Trading",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "cashRatio",
        Header: "Cash Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "daysOfSalesOutstanding",
        Header: "Days Of Sales Outstanding",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "daysOfInventoryOutstanding",
        Header: "Days Of Inventory Outstanding",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "operatingCycle",
        Header: "Operating Cycle",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "cashConversionCycle",
        Header: "Cash Conversion Cycle",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "grossProfitMargin",
        Header: "Gross Profi tMargin",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "operatingProfitMargin",
        Header: "Operating Profit Margin",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "pretaxProfitMargin",
        Header: "Pretax Profit Margin",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "netProfitMargin",
        Header: "Net Profit Margin",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "effectiveTaxRate",
        Header: "Effective Tax Rate",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },

      {
        accessor: "returnOnAssets",
        Header: "Return On Assets",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "returnOnEquity",
        Header: "Return On Equity",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "returnOnCapitalEmployed",
        Header: "Return On Capital Employed",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "netIncomePerEBT",
        Header: "Net Income Per EBT",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "ebtPerEbit",
        Header: "EBT Per EBIT",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "ebitPerRevenue",
        Header: "EBIT Per Revenue",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "debtRatio",
        Header: "Debt Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "debtEquityRatio",
        Header: "Debt To Equity Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "longTermDebtToCapitalization",
        Header: "Long Term Debt To Capitalization",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "totalDebtToCapitalization",
        Header: "Total Debt To Market Capitalization",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "cashFlowToDebtRatio",
        Header: "Cash Flow To Debt Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "companyEquityMultiplier",
        Header: "Company Equity Multiplier",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "dividendPayoutRatio",
        Header: "Dividend Payout Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "priceBookValueRatio",
        Header: "Price To Book Value Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "priceToBookRatio",
        Header: "Price To Book Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "priceEarningsRatio",
        Header: "Price To Earnings Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "priceToFreeCashFlowsRatio",
        Header: "Price To Free Cash Flows Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "priceCashFlowRatio",
        Header: "Price Cash Flow Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "priceEarningsToGrowthRatio",
        Header: "Price Earnings To Growth Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "date",
        Header: "Date",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "epsgrowth",
        Header: "EPS Growth",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "mktCap",
        Header: "Market Cap",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "isin",
        Header: "ISIN",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "industry",
        Header: "Industry",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "index",
        Header: "Index",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "exchangeShortName",
        Header: "Exchange Short Name",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "currency",
        Header: "Currency",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "changes",
        Header: "Changes",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "address",
        Header: "Address",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "stockBasedCompensationToRevenue",
        Header: "Stock Based Compensation To Revenue",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "shareholdersEquityPerShare",
        Header: "Shareholders Equity Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "interestDebtPerShare",
        Header: "Interest Debt Per Share",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "incomeQuality",
        Header: "Income Quality",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "priceSalesRatio",
        Header: "Price To Sales Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "priceToOperatingCashFlowsRatio",
        Header: "Price To Operating Cash Flows Ratio",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "assetTurnover",
        Header: "Asset Turnover",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "fixedAssetTurnover",
        Header: "Fixed Asset Turnover",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        accessor: "period",
        Header: "Period",
        show: false,
        Filter: NumberRangeColumnFilter,
        filter: "between"
      }
    ],
    []
  );

  const data = React.useMemo(() => makeData(100000), []);

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  );
}

export default Screener;
