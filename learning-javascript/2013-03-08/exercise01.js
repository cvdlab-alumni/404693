function pusharray (n)	{
	var array = [];
	for (var i=1; i<=n; i++)
		array.push(i);
	return array;
}

array
	.filter (function (element){
		return element %2 === 0;	})
	.map (function (element) {
		return element * 2;	})
	.filter (function (element) {
		return element %4 === 0; })
	.reduce (function (a, b) {
		return a + b;	});
