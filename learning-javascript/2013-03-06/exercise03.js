var matrix = "" ;
for(var i = 1; i < 11; i++)
	{	
		for (var j = 1; j < 11; j++) 
			(i===j) ? matrix+=("1" + "\t" ) : matrix += ("0" + "\t");		
		matrix += "\n";
	}
console.log(matrix);
