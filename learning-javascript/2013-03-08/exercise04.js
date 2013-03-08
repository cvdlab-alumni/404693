function select(data, key, values){
	result = []
	for (i = 0; i < values.length; i++){
		s = data.filter(function(item, index, array){
 			return (item[key] === values[i]);	//risultati per l'i-esimo valore di values
		});
		result = result.concat(s);
	}
	return result;
}
