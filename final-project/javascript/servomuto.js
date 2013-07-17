//	Final Project
//	Davide Razzino - 404693
//	Servomuto
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

var rotdom = DOMAIN([[0,1],[0,2*PI]])([32,32]);
var lp = 2; 		//larghezza palo
var h = 120; 		//altezza
var ht = h*65/100; 	//altezza del piano
var bianco = [1.5,1.5,1.5];
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
function tavolo(lp,ht){
	var up = T([1])([-0.1])( COLOR(bianco)( R([2,1])(PI/2*3)( arc(2*PI,lp,34.5) )));
	var dw = T([1])([2.2])(up);
	var centro = R([2,1])(PI/2*3)(  COLOR( nero )( EXTRUDE([1.5])(	arc(2*PI,lp,35)	)));
	var tavolo = T([1])([ht])( STRUCT([ up,dw, centro ]) );
	return tavolo;
}
function servomuto(lp,h,ht,col){
	var servomuto = STRUCT([	punta(lp,h,col), palo(lp,h,col), base(lp,col), tavolo(lp,ht)	]);
	return servomuto;
}
function coppia(lp,h,ht){
	var coppia = STRUCT([	T([0])([-40])(servomuto(lp,h,ht,nero)), 
							T([0])([40])(servomuto(lp,h,ht,bianco))	]);
	return coppia;
}


DRAW(coppia(lp,h,ht));