function capitalize (stringa) {
	return stringa.charAt(0).toUpperCase().concat(stringa.slice(1,stringa.length).toLowerCase());
}
function capitalizeText (string){
	return string.split(" ")
		.map(function(item, index, array){
   			return capitalizeFirstLetter (item)
		})
		.join(" ");
}

function capitalize_whole (text) {
	return text.split(' ').map(capitalize).join(' ');
}

var text = capitalize_whole("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
);

console.log(text);
