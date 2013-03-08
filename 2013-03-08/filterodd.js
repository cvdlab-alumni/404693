function filterodd (array)	{
	return array.filter(function(item,index,array){return ((item %2)===1)});
}
