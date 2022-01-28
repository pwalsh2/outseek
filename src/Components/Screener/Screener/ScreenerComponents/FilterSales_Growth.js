import React, { useState } from "react";

export const FilterSales_Growth = (props) => {
	// props passed in:
	var GlobalUpdateFunct = props.update; // update parent state funtion
	var GlobalDataCopy = props.data; // parent state of data, will be updated in this

	// Keep various states
	// state used to toggle input fields
	const [twoFields, toggleFields] = useState(false);
	// state used to assign values from the inputs
	const [val1, setval1] = useState("");
	const [val2, setval2] = useState("");

	// state for the operater
	const [operator, setOperator] = useState(">");

	// temp values used for the filtered data
	var newestData;
	var value1;
	var value2;

	// Method that fiters the data
	const filterData = (e) => {
		console.log(val1);
		console.log(operator);
		if (twoFields) {
			var tempVal1 = parseInt(val1); // input states are string must parse
			var tempVal2 = parseInt(val2); // input states are string must parse

			// filter data
			newestData = GlobalDataCopy.filter(function (d) {
				return d.Sales_Growth > tempVal1 && d.Sales_Growth < tempVal2;
			});
		} else {
			var tempVal1 = parseInt(val1); // input states are string must parse
			if (operator === ">") {
				// filter data
				newestData = GlobalDataCopy.filter(function (d) {
					return d.Sales_Growth > tempVal1;
				});
			} else {
				newestData = GlobalDataCopy.filter(function (d) {
					return d.Sales_Growth < tempVal1;
				});
			}
		}

		// IMPORTANT !!!!!!!!
		// This is a function that sets the state of the parent
		GlobalUpdateFunct(newestData);
	};

	// Method used to show the twoFields, default
	// is 1 field but when between is selected it toggles to show 2

	const showFields = (e) => {
		setOperator(e.target.value);
		if (e.target.value === "B") {
			toggleFields(true);
		} else {
			toggleFields(false);
		}
	};

	return (
		<div>
			<select onChange={(e) => showFields(e)}>
				<option value='>'>Greater than</option>
				<option value='<'>Less than</option>
				<option value='B'>Between</option>
			</select>
			{twoFields ? (
				<div>
					<input type='text' onChange={(e) => setval1(e.target.value)}></input>
					<input type='text' onChange={(e) => setval2(e.target.value)}></input>
					<input type='submit' onClick={(e) => filterData(e)}></input>
				</div>
			) : (
				<div>
					<input type='text' onChange={(e) => setval1(e.target.value)}></input>
					<input type='submit' onClick={(e) => filterData(e)}></input>
				</div>
			)}
		</div>
	);
};
