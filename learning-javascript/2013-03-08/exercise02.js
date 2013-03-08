function pusharray (n)	{
	var array = [];
	for (var i=1; i<=n; i++)
		array.push(Math.ceil(Math.random()*100));
	return array;
}
array
	.filter (function (element){
		return element %2 === 1;	})
	.sort (function (value1, value2) {
		 return value1 - value2;	});
