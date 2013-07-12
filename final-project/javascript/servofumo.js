//	Final Project
//	Davide Razzino - 404693
//	Servofumo
//	Achille Castiglioni

function arc (alpha, r, R) {
	var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
	var mapping = function (v) {
		var a = v[0];
		var r = v[1];
		return [r*COS(a), r*SIN(a)];
	}
	var model = MAP(mapping)(domain);
	return model;
}

var domain = PROD1x1([INTERVALS(1)(14),INTERVALS(1)(14)]);

var rotdom = DOMAIN([[0,1],[0,2*PI]])([32,32]);
var lp = 2; 	//larghezza palo
var h = 150; 	//altezza
var hpc = 90;	//altezza posacenere
var nero = [0,0,0];

function punta(lp,h,col){
	var profile = BEZIER(S0)([[lp,0,0],[1,0,1],[3,0,6],[4.5,0,7],[2.5,0,9],[0,0,9]]);
	var mapping = ROTATIONAL_SURFACE(profile);
	var punta = COLOR(col)( T([1])([h])(R([2,1])(PI/2*3)( MAP(mapping)(rotdom) )));
	return punta;
}
function palo(lp,h,col){
	var profile = BEZIER(S0)([[lp,0,0],[lp,0,h-20]]);
	var mapping = ROTATIONAL_SURFACE(profile);
	var palo = COLOR(col)( T([1])([20])( R([2,1])(PI/2*3)( MAP(mapping)(rotdom) )));
	return palo;
}
function base(lp,col){
	var profile = BEZIER(S0)([[lp,0,20],[9,0,21],[10,0,18],[11,0,16],[11,0,16],[18,0,0]]);
	var mapping = ROTATIONAL_SURFACE(profile);
	var base1 = COLOR(col)( R([2,1])(PI/2*3)( MAP(mapping)(rotdom) ));
	var base2 = COLOR(col)( R([2,1])(PI/2*3)( DISK(18)(64) ));
	var base = STRUCT([ base1,base2 ]);
	return base;
}
function posacenere(lp,hpc,col){
	var profile = BEZIER(S0)([[lp,0,20],[9,0,21],[18,0,18],[15,0,16],[15,0,16],[18,0,-30],
								[40,0,-10],[32,0,10],[38,0,30],[40,0,30],[40,0,30],[32,0,0]]);
	var mapping = ROTATIONAL_SURFACE(profile);
	var base1 = MAP(mapping)(rotdom);
	var base2 = arc(2*PI,lp,32);
	var profile = BEZIER(S0)([[38,0,25],[45,0,25],[38,0,21]]); //bordino
	var mapping = ROTATIONAL_SURFACE(profile);
	var base3 = MAP(mapping)(rotdom);
	var base = COLOR(col)( R([2,1])(PI/2*3)( STRUCT([ base1,base2,base3 ])));
	return T([1])([hpc])(S([0,1,2])([0.6,0.6,0.6])(base));
}
function servofumo(lp,h,hpc,col){
	var servofumo = STRUCT([	punta(lp,h,col), palo(lp,h,col), base(lp,col), posacenere(lp,hpc,col)	]);
	return servofumo;
}

//DRAW(servofumo(lp,h,hpc,[1,1,1]));
DRAW(posacenere(lp,hpc,[1,1,1]))