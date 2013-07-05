//	Final Project
//	Davide Razzino - 404693
//	Basello
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

var h = 45*1.5;			//altezza
var larg = 65*1.5;		//larghezza
var prof = 30*1.5;		//profondita'
var sp = 3*1.5;			//spessore
var nero = [0,0,0];
var darkgrey = [0.2,0.2,0.2];
var bianco = [1.5,1.5,1.5];
var rot = PI/3;

function basello(col,rot){
	var pianosup = T([2])([h-sp])(CUBOID([larg,prof,sp]));
	var pianosuplat = T([0])([larg-sp])(CUBOID([sp,prof,h]));
	var basup = COLOR(col)(T([0,1])([-larg/5,-prof/2])(STRUCT([pianosup, pianosuplat])));

	var cilindro = COLOR(nero)(T([2])([h/2-0.1-sp])(EXTRUDE([h/2+0.2+sp])(arc(2*PI,0,sp))));

	var pianoinf = T([2])([h/2-sp])(CUBOID([larg-2*sp,prof,sp]));
	var pil1 = T([0])([larg-3*sp])(CUBOID([sp,prof,h/2]));
	var pil2 = CUBOID([sp,prof,h/2]);
	var basdw = COLOR(col)(T([0,1])([-larg/5,-prof/2])(STRUCT([pianoinf,pil1,pil2])));

	var basello = R([1,2])(-PI/2)( STRUCT([basup,R([0,1])(-rot)(basdw),cilindro]));
	return basello;
}

DRAW(basello(darkgrey,rot));