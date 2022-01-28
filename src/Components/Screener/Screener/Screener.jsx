import { useState } from "react";

import React from "react";
import styled from "styled-components";
import { Resizable } from "re-resizable";
import "./Screener.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { COLUMNS } from "./ScreenerComponents/columns";
import {
	useTable,
	useFilters,
	useGlobalFilter,
	useAsyncDebounce,
	useSortBy,
	useRowSelect,
} from "react-table";
import { CheckBox } from "./ScreenerComponents/CheckBox";
import * as MOCKdata from "./ScreenerComponents/MOCK_DATA_SCREENER.json";
// A great library for fuzzy filtering/sorting items
// import matchSorter from "match-sorter";

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

// Define a default UI for filtering
function GlobalFilter({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
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
					border: "0",
				}}
			/>
		</span>
	);
}

// Define a default UI for filtering
function DefaultColumnFilter({
	column: { filterValue, preFilteredRows, setFilter },
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
export function SelectColumnFilter({
	column: { filterValue, setFilter, preFilteredRows, id },
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
			}}>
			<option value=''>All</option>
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
export function SliderColumnFilter({
	column: { filterValue, setFilter, preFilteredRows, id },
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
				type='range'
				min={min}
				max={max}
				value={filterValue || min}
				onChange={(e) => {
					setFilter(parseInt(e.target.value, 10));
				}}
			/>
		</>
	);
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
export function NumberRangeColumnFilter({
	column: { filterValue = [], preFilteredRows, setFilter, id },
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
				display: "flex",
			}}>
			<input
				value={filterValue[0] || ""}
				type='number'
				onChange={(e) => {
					const val = e.target.value;
					setFilter((old = []) => [
						val ? parseInt(val, 10) : undefined,
						old[1],
					]);
				}}
				placeholder={`Min (${min})`}
				style={{
					width: "70px",
					marginRight: "0.5rem",
				}}
			/>
			to
			<input
				value={filterValue[1] || ""}
				type='number'
				onChange={(e) => {
					const val = e.target.value;
					setFilter((old = []) => [
						old[0],
						val ? parseInt(val, 10) : undefined,
					]);
				}}
				placeholder={`Max (${max})`}
				style={{
					width: "70px",
					marginLeft: "0.5rem",
				}}
			/>
		</div>
	);
}

// function fuzzyTextFilterFn(rows, id, filterValue) {
// 	return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
// }

// Let the table remove the filter if the string is empty
// fuzzyTextFilterFn.autoRemove = (val) => !val;

// Our table component
export function Table({ columns, data }) {
	const filterTypes = React.useMemo(
		() => ({
			// Add a new fuzzyTextFilterFn filter type.
			// fuzzyText: fuzzyTextFilterFn,
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
			},
		}),
		[]
	);

	const defaultColumn = React.useMemo(
		() => ({
			// Let's set up our default Filter UI
			Filter: DefaultColumnFilter,
		}),
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,

		headerGroups,
		page,
		nextPage,
		rows,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageOptions,
		pageCount,
		state: { filters, pageIndex, pageSize, hiddenColumns, visibleColumns },
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

			defaultColumn,
		},
		useFilters,
		useSortBy,

		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => {
				return [
					{
						id: "selection",
						header: ({ getToggleAllRowsSelectedProps }) => <div></div>,
						Cell: ({ row }) => (
							<CheckBox {...row.getToggleRowSelectedProps()} />
						),
					},
					...columns,
				];
			});
		}
	);

	// We don't want to render all of the rows for this example, so cap
	// it for this use case
	const firstPageRows = rows.slice(0, 20);

	return (
		<>
			<div className='table-responsive'>
				<table className='table table-dark' {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										style={{ position: "sticky", top: 0 }}
										{...column.getHeaderProps()}>
										{column.render("header")}
										{/* Render the columns filter UI */}
										<div>
											{column.canFilter ? column.render("Filter") : null}
										</div>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody style={{ overflow: "auto" }} {...getTableBodyProps()}>
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
	const data = React.useMemo(() => MOCKdata, []);
	const [width, setWidth] = React.useState(300);
	const [height, setHeight] = React.useState(200);

	const style = {
		display: "flex",
		flexDirection: "column",
		border: "solid 1px #ddd",
		background: "rgba(0, 27, 45, 0.9)",
		margin: "15px",
	};
	return (
		<Resizable
			style={style}
			size={{ width, height }}
			onResizeStop={(e, direction, ref, d) => {
				setWidth(width + d.width);
				setHeight(height + d.height);
			}}>
			<div
				style={{
					display: "flex",
					height: "3rem",
					backgroundColor: "var(--ButtonLight)",
				}}>
				<h6 style={{ padding: "0.5rem", color: "white" }}>
					Outseek Stock Screener
				</h6>
				<input className='form-control' style={{ height: "2rem" }}></input>
				<Button
					style={{
						float: "right",
						backgroundColor: "var(--OutseekPrimaryDark)",
						borderColor: "var(--BorderLightGrey)",
					}}>
					Close
				</Button>
			</div>

			<Table columns={COLUMNS} data={data} />
		</Resizable>
	);
}

export default Screener;
