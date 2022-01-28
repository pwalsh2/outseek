import axios from "axios";

export async function getBalanceSheet(key) {
	return axios({
		method: "get",
		url:
			"https://financialmodelingprep.com/api/v3/balance-sheet-statement/" +
			key +
			"?period=quarter&limit=400&apikey=6f583125e791bceb5e95b3307b84bd13",
		responseType: "json",
	});
}

export async function getIncomeStatement(key) {
	return axios({
		method: "get",
		url:
			"https://financialmodelingprep.com/api/v3/income-statement/" +
			key +
			"?period=quarter&limit=400&apikey=6f583125e791bceb5e95b3307b84bd13",
		responseType: "json",
	});
}

export async function getCashFlow(key) {
	return axios({
		method: "get",
		url:
			"https://financialmodelingprep.com/api/v3/cash-flow-statement/" +
			key +
			"?period=quarter&limit=400&apikey=6f583125e791bceb5e95b3307b84bd13",
		responseType: "json",
	});
}

export function TransformData(dataIN) {
	let data = [];

	let keys = Object.keys(dataIN[0]);
	console.log(Object.keys(dataIN[0]));
	for (let j = 0; j < keys.length - 2; j++) {
		//integer
		if (dataIN[0][keys[j]] > 100 && !typeof dataIN[0][keys[j]] === "string") {
			let entry = {
				key: keys[j],
				Q1: dataIN[0][keys[j]] / 1000,
				Q2: dataIN[1][keys[j]] / 1000,
				Q3: dataIN[2][keys[j]] / 1000,
				Q4: dataIN[3][keys[j]] / 1000,
				Q5: dataIN[4][keys[j]] / 1000,
				Q6: dataIN[5][keys[j]] / 1000,
				Q7: dataIN[6][keys[j]] / 1000,
				Q8: dataIN[7][keys[j]] / 1000,
				Q9: dataIN[8][keys[j]] / 1000,
			};

			data.push(entry);
		} else if (typeof dataIN[0][keys[j]] === "string") {
			let entry = {
				key: keys[j],
				Q1: dataIN[0][keys[j]],
				Q2: dataIN[1][keys[j]],
				Q3: dataIN[2][keys[j]],
				Q4: dataIN[3][keys[j]],
				Q5: dataIN[4][keys[j]],
				Q6: dataIN[5][keys[j]],
				Q7: dataIN[6][keys[j]],
				Q8: dataIN[7][keys[j]],
				Q9: dataIN[8][keys[j]],
			};

			data.push(entry);
		} else {
			// floating point
			try {
				let entry = {
					key: keys[j],
					Q1: dataIN[0][keys[j]].toFixed(2),
					Q2: dataIN[1][keys[j]].toFixed(2),
					Q3: dataIN[2][keys[j]].toFixed(2),
					Q4: dataIN[3][keys[j]].toFixed(2),
					Q5: dataIN[4][keys[j]].toFixed(2),
					Q6: dataIN[5][keys[j]].toFixed(2),
					Q7: dataIN[6][keys[j]].toFixed(2),
					Q8: dataIN[7][keys[j]].toFixed(2),
					Q9: dataIN[8][keys[j]].toFixed(2),
				};

				data.push(entry);
			} catch (err) {
				let entry = {
					key: keys[j],
					Q1: dataIN[0][keys[j]],
					Q2: dataIN[1][keys[j]],
					Q3: dataIN[2][keys[j]],
					Q4: dataIN[3][keys[j]],
					Q5: dataIN[4][keys[j]],
					Q6: dataIN[5][keys[j]],
					Q7: dataIN[6][keys[j]],
					Q8: dataIN[7][keys[j]],
					Q9: dataIN[8][keys[j]],
				};

				data.push(entry);
			}
		}
	}

	return data;
}
