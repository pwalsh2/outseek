import React, { useEffect, useMemo, useState } from "react";
import {
	useTable,
	useFilters,
	useSortBy,
	usePagination,
	useRowSelect,
	controlledPageCount
} from "react-table";
import { COLUMNS } from "./columns";
import "./Table.css";
import { CheckBox } from "./CheckBox";
import { Dropdown, ButtonGroup, Button, Overlay, Table, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ColumnFilter } from "./ColumnFilter";
import { NumberRangeColumnFilter } from "./NumberRangeColumnFilter";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FetchAll } from '../Rest/fetch_Screen'
import { postScreen } from '../Rest/saveScreen'
import {addToWatch} from '../Rest/addtoWatch'



export const FilteringTable = (props) => {
	const columns = COLUMNS;
	const [columnState, setColumnState] = useState(COLUMNS)
	const [, updateState] = useState();
	const [showModalSaveScreen, setShowModalSaveScreen] = useState(false)
	const handleClose = () => setShowModalSaveScreen(false);
	const handleShow = () => setShowModalSaveScreen(true);
	const [data, setData] = useState(props.data); // use MEMO ??????
	const [pageCountCurr, setPageCount] = React.useState(1)
	const [pageIndexManual, setPageIndex] = useState(1)
	
	
	const defaultColumn = useMemo(
		() => ({
			// Let's set up our default Filter UI
			Filter: NumberRangeColumnFilter,
			filter: "between",
		}),
		[]
	);
	// Deconstructing useTable instance
	const {
		getTableProps,
		getTableBodyProps,
		
		headerGroups,
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageOptions,
		pageCount,
		state: {  filters, pageIndex, pageSize, hiddenColumns, visibleColumns },
		prepareRow,
		selectedFlatRows,
		allColumns,
		getToggleHideAllColumnsProps,
		setHiddenColumns,
		setPageSize,
		
		
	} = useTable(
		{
			columns,
			data,
			initialState: {
				hiddenColumns: columns.map((column) => {
					if (column.show === false) return column.accessor || column.id;
				}),
				

			},
			manualPagination: true,
			pageCount: controlledPageCount,
			defaultColumn,
		},
		useFilters,
		useSortBy,
		usePagination,
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => {
				return [
					{
						id: "selection",
						header: ({ getToggleAllRowsSelectedProps }) => (
							<div></div>
						),
						Cell: ({ row }) => (
							<CheckBox {...row.getToggleRowSelectedProps()} />
						),
					},
					...columns,
				];
			});
		}
		);
	
	function saveScreen() {

		const visColumns = columns.map((column) => {
			if (column.show === true) return column.accessor || column.id;
		})

		postScreen(filters, visColumns)


	
	}
	 
	function addToWatchlist() {
		console.log(selectedFlatRows.map((row) => row.original))
		const watchList = selectedFlatRows.map((row) => row.original)
		addToWatch(watchList)
	// 	headerGroups.map((headerGroup) => {
	// 		headerGroup.headers.push({ accessor: 'testPush', header: 'Quick Ratio', show: true })
	//    })
	// 	console.log(headerGroups.map((headerGroup) => {
	// 		 return headerGroup.headers
	// 	}))
	// 	setColumnState(...columns)
	// 	console.log(page)
	// 	// console.log(columnState) 
	// 	// console.log(columns)
	}

	function previousManualPage() {
		if (pageIndexManual !== 1) {
			setPageIndex(pageIndexManual - 1)
			setPageCount(pageCountCurr - 1)
		}
		
 
	}
	function nextManualPage() {
		if (pageIndexManual !== pageOptions.length) {
			setPageIndex(pageIndexManual+1)
			setPageCount(pageCountCurr + 1)
		}
		 
	}
	useEffect(() => {
		(async () => {
			const startrow = pageSize * pageCountCurr
			const endRow = pageSize+ startrow
			let res = await FetchAll(startrow,endRow)
			res = JSON.parse(res)
			console.log(14833/pageSize)
			console.log(res)
			pageOptions.length = parseInt(14833/pageSize);
			console.log(pageOptions.length)
			setData(res)
		   // setPrimaryData(...PrimaryData)
		})()
	}, [pageCountCurr, pageSize])
	
	const [hideColumns, setHideColumns] = useState(false);
	
	const hideShowColumns = () => {
		if (hideColumns) {
			return (
				<div style={{ float: "left" }}>
					<Button size="sm"
						variant='outline-primary'
						onClick={(e) => setHideColumns(false)}>
						Close
					</Button>
					<div className='hideColumnsDiv'>
						<CheckBox {...getToggleHideAllColumnsProps()} />
						Hide All{" "}
						{allColumns.map((column) => (
							<div key={column.id}>
								<input type='checkbox' {...column.getToggleHiddenProps()} />
								{column.header}
							</div>
						))}
					</div>{" "}
				</div>
			);
		} else {
			return (
				<div style={{ float: "left" }}>
					<Button size="sm"
						variant='outline-primary'
						onClick={(e) => setHideColumns(true)}>
						Hide/Show Columns
					</Button>
				</div>
			);
		}
	};
	const OverviewGroup = [
		"symbol",
		"Exchange",
		"Market_Cap",
		"Sector",
		"price",
		"volAvg",
		"lastDiv",
		"range",
		"changes",
		"companyName",
		"companyName",
		"industry",
		"description",
		"sector",
		"country",
	];

	const showOverview = () => {
		const showColumnList = OverviewGroup;
		let hiddenList = columns.filter((column) => {
			if (showColumnList.includes(column.accessor)) {
			} else {
				return column.accessor;
			}
		});
		const headerList = [];
		for (var i in hiddenList) {
			headerList.push(hiddenList[i].accessor);
		}
		console.log(headerList);
		setHiddenColumns(headerList);
	};
	const GrowthGroupAccessor = [
		"symbol",
		"EPS_Growth",
		"Sales_Growth",
		"PEG",
		"FiveYrEPSGrowth",
		"revenueGrowth",
		"grossProfitGrowth",
		"ebitgrowth",
		"operatingIncomeGrowth",
		"netIncomeGrowth",
		"freeCashFlowGrowth",
		"fiveYRevenueGrowthPerShare",
		"fiveYNetIncomeGrowthPerShare",
		"fiveYShareholdersEquityGrowthPerShare",
		"assetGrowth",
		"bookValueperShareGrowth",
		"debtGrowth",
	];

	const showGrowth = () => {
		const showColumnList = GrowthGroupAccessor;
		let hiddenList = columns.filter((column) => {
			if (showColumnList.includes(column.accessor)) {
			} else {
				return column.accessor;
			}
		});
		const headerList = [];
		for (var i in hiddenList) {
			headerList.push(hiddenList[i].accessor);
		}
		console.log(headerList);
		setHiddenColumns(headerList);
	};

	const RatiosGroup = [
		"symbol",
		"Current_Ratio",
		"Quick_Ratio",
		"peRatio",
		"priceToSalesRatio",
		"pocfratio",
		"pfcfRatio",
		"pbRatio",
		"ptbRatio",
		"evToSales",
		"currentRatio",
		"payoutRatio",
		"quickRatio",
		"cashRatio",
		"debtRatio",
		"debtEquityRatio",
		"cashFlowToDebtRatio",
		"operatingCashFlowSalesRatio",
		"freeCashFlowOperatingCashFlowRatio",
		"cashFlowCoverageRatios",
		"shortTermCoverageRatios",
		"capitalExpenditureCoverageRatio",
		"dividendPaidAndCapexCoverageRatio",
		"dividendPayoutRatio",
		"priceBookValueRatio",
		"priceToBookRatio",
		"priceToSalesRatio",
		"priceEarningsRatio",
		"priceToFreeCashFlowsRatio",
		"priceCashFlowRatio",
		"priceEarningsToGrowthRatio",
		"priceSalesRatio",
		"grossProfitRatio",
		"ebitdaratio",
		"operatingIncomeRatio",
		"incomeBeforeTaxRatio",
		"netIncomeRatio",
		"Debt_to_E",
		"P_E",
		"PEG",
		"P_S",
		"P_B",
		"P_FCF",
		"evToOperatingCashFlow",
		"evToFreeCashFlow",
		"debtToEquity",
		"debtToAssets",
		"netDebtToEBITDA",
		"salesGeneralAndAdministrativeToRevenue",
		"researchAndDdevelopementToRevenue",
		"intangiblesToTotalAssets",
		"capexToOperatingCashFlow",
		"capexToRevenue",
		"capexToDepreciation",
		"stockBasedCompensationToRevenue",
		"longTermDebtToCapitalization",
		"totalDebtToCapitalization",
	];

	const showRatios = () => {
		const showColumnList = RatiosGroup;
		let hiddenList = columns.filter((column) => {
			if (showColumnList.includes(column.accessor)) {
			} else {
				return column.accessor;
			}
		});
		const headerList = [];
		for (var i in hiddenList) {
			headerList.push(hiddenList[i].accessor);
		}
		console.log(headerList);
		setHiddenColumns(headerList);
	};
	const ValuationGroup = [
		"symbol",
		"priceCashFlowRatio",
		"priceToBookRatio",
		"priceEarningsRatio",
		"priceToFreeCashFlowsRatio",
		"priceEarningsToGrowthRatio",
		"debtToEquity",
		"revenueGrowth",
		"fiveYShareholdersEquityGrowthPerShare",
	]; 

	const showValuation = () => {
		const showColumnList = ValuationGroup;

		let hiddenList = columns.filter((column) => { 
			if (showColumnList.includes(column.accessor)) {
			} else {
				return column.accessor;
			}
		});
		const headerList = [];
		for (var i in hiddenList) {
			headerList.push(hiddenList[i].accessor);
		}
		
		setHiddenColumns(headerList);
	};
	const QuickFinancials = [
		"totalCurrentAssets",
		"totalNonCurrentAssets",
		"totalCurrentLiabilities",
		"totalNonCurrentLiabilities",
		"totalLiabilities",
		"totalStockholdersEquity",
		"revenue",
		"grossProfitMargin",
		"ebitda",
		"netIncome",
		"netCashProvidedByOperatingActivities",
		"netCashUsedForInvestingActivites",
		"netCashUsedProvidedByFinancingActivities",
		"freeCashFlow",
		"workingCapital"
	];
	const showQuickFinancials = () => {
		const showColumnList = QuickFinancials;
		let hiddenList = columns.filter((column) => {
			if (showColumnList.includes(column.accessor)) {
			} else {
				return column.accessor;
			}
		});
		const headerList = [];
		for (var i in hiddenList) {
			headerList.push(hiddenList[i].accessor);
		}
		console.log(headerList);
		setHiddenColumns(headerList);
	};


	const deleteRows = (selectedFlatRows) => {
		console.log(selectedFlatRows.map((row) => row.id))
		const IDlist =  selectedFlatRows.map((row) => row.id)
		const DataCopy = [...data]

		DataCopy.splice(IDlist[0], IDlist.length)
		setData(DataCopy)
		
	}

	return (
		<>
			 <Modal
				
					show={showModalSaveScreen}
				
	  
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
       			Save Screen
        </Modal.Title>
      </Modal.Header>
				<Modal.Body>
					<div className = "saveScreenModalDiv">
					<h4>Name Screen: </h4>
					<input></input>
					<h4>Description: </h4>
					<textarea ></textarea>
						</div>
					
        
      </Modal.Body>
				<Modal.Footer>
				<Button onClick={() => saveScreen()}>Save</Button>
        		<Button onClick={() => setShowModalSaveScreen(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
			<div className="table-container">
				<div className='divPresets'>
					<div className='columnSelectDivStyle'>
						<ButtonGroup size="sm" >
							<Button   variant='outline-primary' onClick={(e) => showOverview()}>
								Overview
							</Button>
							<Button size="sm" 
								variant='outline-primary'
								onClick={(e) => showValuation()}>
								Valuation
							</Button>
							<Button  variant='outline-primary' onClick={(e) => showRatios()}>
								Ratios
							</Button>
							<Button  variant='outline-primary' onClick={(e) => showGrowth()}>
								Growth
							</Button>
							{/* <Button 
								variant='outline-primary'
								onClick={(e) => }>
								Update
							</Button> */}
							<Button   variant='outline-primary' onClick = { ()=> addToWatchlist()}>
								Add To Watch
							</Button>
								{hideShowColumns()}
							<Button size="sm" variant='outline-primary' onClick={() => handleShow()}>
								Save Screen</Button>
								<Button size="sm" 
								variant='outline-primary'
							>
								Presets
							</Button>
								<ReactHTMLTableToExcel
									className='btn'
									table='Master-Table'
									filename='Export 1'
									sheet='sheet 1'
									buttonText='EXPORT'
								/>
								<Button size="sm" variant='outline-primary'></Button>
						</ButtonGroup >
					</div>
				</div>
				<div>
					<div>

					</div>
				<div {...getTableProps}>
					{headerGroups.map((headerGroup) => ( 
								<div   className = "gallery" {...headerGroup.getHeaderGroupProps()}> 
									{headerGroup.headers.map((column, index) => (
										
										<>
										{(() => {
											if (index%6 === 0) {
											  return
											} else {
											  return <div {...column.getHeaderProps()} > {column.render("header")}
											  <span style={{textAlign: "center"}}>
											  {column.canFilter ? column.render("Filter") : null}
												  {column.isSorted
													  ? column.isSortedDesc
														  ? "🔽"
														  : "🔼"
													  : ""}
											  </span> </div>;
									  
											}
										  })()}
											
											
										  	</>
											
										
									))}
								</div>
							))}
					</div>
				</div>
					
				
						
				<div>
					<Table id='Master-Table' {...getTableProps}>
						
					
						<thead> 
							{headerGroups.map((headerGroup) => ( 
								<tr {...headerGroup.getHeaderGroupProps()}> 
									{headerGroup.headers.map((column) => (
										<th
											{...column.getHeaderProps(column.getSortByToggleProps())}>
											{column.render("header")}
											{/* <span>
											{column.canFilter ? column.render("Filter") : null}
												{column.isSorted
													? column.isSortedDesc
														? "🔽"
														: "🔼"
													: ""}
											</span>
									 */}

											
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{page.map((row, i) => {
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
					</Table>

					
							<pre>
								<code>
									{JSON.stringify(
										{
											selectedFlatRows: selectedFlatRows.map((row) => row.original),
										},
										null,
										2
									)}  
								</code>
							</pre>
					<div>
						<span>
							Page{" "}
							<strong>
								{pageIndex + pageIndexManual} of {pageOptions.length}
							</strong>
						</span>
						<button onClick={() => previousManualPage()} >
							Previous
						</button>
						<button onClick={() => nextManualPage()} >
							{" "}
							Next
						</button>
						<select
							value={pageSize}
							onChange={e => {
								setPageSize(Number(e.target.value))
							}}
							>
							{[5, 10, 20, 30, 40, 50, 100, 1000, 100000, 160000].map(pageSize => (
								<option key={pageSize} value={pageSize}>
								Show {pageSize}
								</option>
							))}
						</select> 
						<Button size="sm" onClick = {(e) => deleteRows(selectedFlatRows) }>Delete Rows</Button>
					</div>
				</div>
			</div>
		</>
	);
};
