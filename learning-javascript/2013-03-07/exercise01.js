function identity (n)	{
	var matrix = "\n";
	for (var i = 0; i < n; i++)
	{
		for (var j = 0; j < n; j++)
			(i===j) ? matrix += ("1" + "\t") : matrix += ("0" + "\t");
		matrix += "\n";
	};
return matrix;
}
