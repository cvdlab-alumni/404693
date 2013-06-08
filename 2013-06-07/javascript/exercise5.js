//	3 Homework
//	Davide Razzino - 404693
//	exercise 5 - roads

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

function lake() {
	h = 4;
	var dom = DOMAIN([[0,1], [0,1], [0,1]])([10, 10, 10]);

	c0 = [[0,15,3],[7,20,2],[9,13,1],[10,18,0],[15,15,-2]];
	c1 = [[0,0,5],[5,-5,5],[13,-8,0],[15,0,-2]];
	c2 = [[0,15,3],[-8,10,5],[2,5,2],[-2,3,5],[0,0,5]];
	c3 = [[15,15,-2],[18,13,-2],[20,3,-2],[15,0,-2]];

	var up = BEZIER(S0)(c0);
	var dw = BEZIER(S0)(c1);
	var lf = BEZIER(S1)(c2);
	var rg = BEZIER(S1)(c3);
	var coonsF = COONS_PATCH([up,dw,lf,rg]);

	var c0_b = c0.map(function (p) {return [p[0],p[1],p[2]-h] });
	var c1_b = c1.map(function (p) {return [p[0],p[1],p[2]-h] });
	var c2_b = c2.map(function (p) {return [p[0],p[1],p[2]-h] });
	var c3_b = c3.map(function (p) {return [p[0],p[1],p[2]-h] });

	var up_b = BEZIER(S0)(c0_b);
	var dw_b = BEZIER(S0)(c1_b);
	var lf_b = BEZIER(S1)(c2_b);
	var rg_b = BEZIER(S1)(c3_b);
	var coonsB = COONS_PATCH([up_b,dw_b,lf_b,rg_b]);

	var lago = COLOR([0,0,1])(MAP( BEZIER(S2)([coonsF,coonsB]) ) (dom));
	return lago;
}

function dtm() {
	var lagom = T([0,1,2])([26,25,4])(lake());
	var dtm = STRUCT([ (COLOR([0,0,1])(lagom)), mappa() ]);
	return dtm;
}

function tree()	{
	var h = Math.random()+1.5;

	var rotdom = DOMAIN([[0,1],[0,2*PI]])([32,32]);
	var profile = BEZIER(S0)([[h/8,0,0],[h/8,0,h/2]]);
	var mapping = ROTATIONAL_SURFACE(profile);
	var tronco = COLOR([0.79,0.25,0]) ( MAP(mapping)(rotdom) );
	
	var profile2 = BEZIER(S0)([[h/3,0,h/3],[0,0,h]]);
	var mapping2 = ROTATIONAL_SURFACE(profile2);
	var foglie = COLOR([0,1,0]) ( MAP(mapping2)(rotdom) );

	var tree = STRUCT([tronco, foglie]);
	return tree;
}
function dtmlt() {
	var forest1 = STRUCT(REPLICA(6)([T([0,1,2])([40,2,6])(tree()), T([0,2])([1.5,-0.8])]));
	var forest2 = STRUCT(REPLICA(6)([T([0,1,2])([40,3.5,6])(tree()), T([0,2])([1.5,-0.8])]));
	var forest3 = STRUCT(REPLICA(6)([T([0,1,2])([40,5,6])(tree()), T([0,2])([1.5,-0.8])]));
	var forest4 = STRUCT(REPLICA(6)([T([0,1,2])([40,6.5,6])(tree()), T([0,2])([1.5,-0.8])]));
	var forest5 = STRUCT(REPLICA(6)([T([0,1,2])([40,8,7])(tree()), T([0,2])([1.5,-0.8])]));
	var forest6 = STRUCT(REPLICA(6)([T([0,1,2])([40,9.5,7])(tree()), T([0,2])([1.5,-0.8])]));

	var forest7 = STRUCT(REPLICA(6)([T([0,1,2])([40,11,6])(tree()), T([0,2])([1.5,-0.8])]));
	var forest8 = STRUCT(REPLICA(6)([T([0,1,2])([40,12.5,6])(tree()), T([0,2])([1.5,-0.8])]));
	var forest9 = STRUCT(REPLICA(6)([T([0,1,2])([40,14,6])(tree()), T([0,2])([1.5,-0.8])]));
	var forest10 = STRUCT(REPLICA(6)([T([0,1,2])([40,15.5,6])(tree()), T([0,2])([1.5,-0.8])]));
	var forest11 = STRUCT(REPLICA(6)([T([0,1,2])([40,17,6])(tree()), T([0,2])([1.5,-0.8])]));
	var forest12 = STRUCT(REPLICA(6)([T([0,1,2])([40,18.5,6])(tree()), T([0,2])([1.5,-0.8])]));

	var nat = STRUCT([ forest1, forest2, forest3, forest4, forest5, forest6, 
						forest7, forest8, forest9, forest10, forest11, forest12, dtm() ]);
	return nat;
}

function simple_house(h,l){
	var points = [[0,0],[h,0],[h/2,h/2]];
	var cells = [[0,1,2]];
	var tetto = COLOR([1,0,0])(EXTRUDE([h])(SIMPLICIAL_COMPLEX(points)(cells)));
	var base = CUBOID([h,h,h]);
	var casa = STRUCT([base, T([1,2])([h,h])(R([1,2])([PI/2])(tetto))]);
	return S([1])([l])(casa);
}

function settlement(c,d,n){
	var houses1 = STRUCT(REPLICA(n)([T([0,1,2])([40-c,40-d,3])(simple_house(Math.random()+0.7, 
		Math.random()+0.5)), T([0,2])([2,-0.5])]));
	var houses2 = STRUCT(REPLICA(n)([T([0,1,2])([40-c,43-d,3])(simple_house(Math.random()+0.7, 
		Math.random()+0.5)), T([0,2])([2,-0.5])]));
	var houses3 = STRUCT(REPLICA(n)([T([0,1,2])([40-c,46-d,3])(simple_house(Math.random()+0.7, 
		Math.random()+0.5)), T([0,2])([2,-0.5])]));

	var paese = STRUCT([houses1, houses2, houses3]);
	return paese;
}
var cartina = STRUCT([ dtmlt(), settlement(0,0,5), settlement(-3,18,3) ]);
//DRAW(cartina);

function road(l,m){
	var road = CUBOID([l,m,2]);
	return COLOR([0,0,0])(road);
}

function roads(c,d,n,l){
	var strada = road(l,0.9);
	var parallela = R([0,1])(PI/2)(road(l*0.95,0.5));
	var roads1 = STRUCT(REPLICA(4)([T([0,1,2])([40-c,39.2-d,0])(strada), T([1])([2.8])]));
	var roads2 = STRUCT(REPLICA(n)([T([0,1,2])([40-c,39-d,0])(parallela), T([0])([2])]));
	var roads = STRUCT([roads1,roads2]);
	return roads;
}
var out = STRUCT([ cartina, roads(0,0,6,10), roads(-3,18,4,10)]);
DRAW(out)