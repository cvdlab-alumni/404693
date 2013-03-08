function capitalize (stringa)	{
	return stringa.toUpperCase();
}
function capitalizeFirstLetter (stringa) {
	return stringa.charAt(0).toUpperCase().concat(stringa.slice(1,stringa.length).toLowerCase());
}
function capitalizeTextFL (string){
	return string.split(" ")
		.map(function(item, index, array){
   			return capitalizeFirstLetter (item)
		})
		.join(" ");
}
