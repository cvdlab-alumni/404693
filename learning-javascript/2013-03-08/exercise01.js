var array = [1,2,3,4,5,6,7,8,9,10];

array
	.filter (function (element){
		return element %2 === 0;	})
	.map (function (element) {
		return element * 2;	})
	.filter (function (element) {
		return element %4 === 0; });
	
