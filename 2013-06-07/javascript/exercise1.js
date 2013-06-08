//	3 Homework
//	Davide Razzino - 404693
//	exercise 1 - DTM Digital Terrain Model

var domain = DOMAIN([[0,50], [0,50], [0,5]])([10, 10, 10]);
var points = new Array();

var mapping = function(point)	{
	var x = point[0];
	var y = point[1];
	var z = point[2];
	var random = Math.random()*3-1;
	points.push([x,y,z+random]);
	return [x, y, z+random];
}

function mappa()	{
	var domain1 = DOMAIN([[0,1], [0,1], [0,1]])([10, 10, 10]);
	var c0 = [[0,50,20],[5,50,25],[15,50,3],[50,50,0]];
	var c1 = [[0,0,0],[5,0,30],[10,0,20],[50,0,0]];
	var c2 = [[0,50,20],[0,45,25],[0,40,3],[0,25,0],[0,25,0],[0,25,0],[0,10,30],[0,5,20],[0,0,0]];
	var c3 = [[50,50,0],[50,0,0]];
	var up = BEZIER(S0)(c0);
	var dw = BEZIER(S0)(c1);
	var lf = BEZIER(S1)(c2);
	var rg = BEZIER(S1)(c3);
	var coonsF = COONS_PATCH([up,dw,lf,rg]);

	var c0b = [[0,50,-1],[50,50,-1]];
	var c1b = [[0,0,-1],[50,0,-1]];
	var c2b = [[0,50,-1],[0,0,-1]];
	var c3b = [[50,50,-1],[50,0,-1]];
	var upb = BEZIER(S0)(c0b);
	var dwb = BEZIER(S0)(c1b);
	var lfb = BEZIER(S1)(c2b);
	var rgb = BEZIER(S1)(c3b);
	var coonsB = COONS_PATCH([upb,dwb,lfb,rgb]);

	var dom = MAP(BEZIER(S2)([coonsF,coonsB]))(domain1);

	var mappa = STRUCT([COLOR([0,1,0])(MAP(mapping)(dom)), 
				T([2])([-3])(COLOR([0.79,0.25,0]) (CUBOID([50,50,3]))) ]);
	return mappa;
}

DRAW(mappa());