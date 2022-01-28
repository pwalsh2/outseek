import React from "react";
import styled from "styled-components";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../styles.css";
import { useSticky } from "react-table-sticky";
import {
	useTable,
	useFilters,
	useGlobalFilter,
	useAsyncDebounce,
	useSortBy,
	useRowSelect,
	useBlockLayout,
} from "react-table";

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
			placeholder={`Measures...`}
		/>
	);
}
// Our table component
export function Table({ columns: userColumns, data }) {
	const defaultColumn = React.useMemo(
		() => ({
			// Let's set up our default Filter UI
			Filter: DefaultColumnFilter,
		}),
		[]
	);
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
	console.log("53-", userColumns);
	const {
		getTableProps,
		getTableBodyProps,

		headerGroups,

		rows,
		prepareRow,
	} = useTable(
		{
			columns: userColumns,
			data,
			defaultColumn, // Be sure to pass the defaultColumn option
		},
		useFilters
	);

	const firstPageRows = rows.slice(0, 100);

	return (
		<>
			<div className='table-responsive'>
				<table className='table table-dark' {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										style={{
											backgroundColor: "#3c6782",
											position: "sticky",

											top: 0,
										}}
										{...column.getHeaderProps()}>
										<span> {column.render("header")} </span>
										{}
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
