var jz = require("jeezy");

var data = [];
var cols = "abcdefghijklmnopqrstuvwxyz".split("");
for (var i = 0; i <= 30; i++) {
	var obj = { index: i };
	cols.forEach((col) => {
		obj[col] = jz.num.randBetween(1, 100);
	});
	data.push(obj);
}
console.log(data);
var corr = jz.arr.correlationMatrix(data, cols);

console.log(corr);
