//	Final Project
//	Davide Razzino - 404693
//	Servonotte
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

function tuboAng(Rag,rag) {
	var c1 = CUBIC_HERMITE(S0)([[Rag,0,0],[0,Rag,0],[0,1.7*Rag,0],[-1.7*Rag,0,0]]);
	var c2 = CUBIC_HERMITE(S0)([[rag,0,0],[0,rag,0],[0,1.7*rag,0],[-1.7*rag,0,0]]);
	var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,Rag],[0,0,-Rag]]);
	var sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-Rag],[0,0,Rag]]);
	var out1 = MAP(sur1)(domain);
	var out2 = MAP(sur2)(domain);
	var out = STRUCT([out1, out2]);
	return out;
}
function tuboAngPar(Rag,rag,larg){
	var c1 = CUBIC_HERMITE(S0)([[Rag,0,0],[0,Rag,0],[0,larg*Rag,0],[-larg*Rag,0,0]]);
	var c2 = CUBIC_HERMITE(S0)([[rag,0,0],[0,rag,0],[0,larg*rag,0],[-larg*rag,0,0]]);
	var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,Rag],[0,0,-Rag]]);
	var sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-Rag],[0,0,Rag]]);
	var out1 = MAP(sur1)(domain);
	var out2 = MAP(sur2)(domain);
	var out = STRUCT([out1, out2]);
	return out;
}
function tubo(Rag,rag,len){
	var c1 = CUBIC_HERMITE(S0)([[len,rag,0],[0,rag,0],[0,0,0],[0,0,0]]);
	var c2 = CUBIC_HERMITE(S0)([[len,Rag,0],[0,Rag,0],[0,0,0],[0,0,0]]);
	var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,Rag],[0,0,-Rag]]);
	var sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-Rag],[0,0,Rag]]);
	var out1 = MAP(sur1)(domain);
	var out2 = MAP(sur2)(domain);
	var out = STRUCT([out1, out2]);
	return out;
}
function closetube(Rag,rag){
	var c1 = CUBIC_HERMITE(S0)([[Rag,0,0],[rag,0,0],[0,0,Rag],[0,0,-Rag]]);
	var ci = CUBIC_HERMITE(S0)([[Rag,0,0],[rag,0,0],[0,-Rag/4*3,0],[0,Rag/4*3,0]]);
	var c2 = CUBIC_HERMITE(S0)([[Rag,0,0],[rag,0,0],[0,0,-Rag],[0,0,Rag]]);
	var sur1 = CUBIC_HERMITE(S1)([c1,ci,[0,-rag/2,0],[0,0,-rag/2]]);
	var sur2 = CUBIC_HERMITE(S1)([c2,ci,[0,-rag/2,0],[0,0,rag/2]]);
	var out1 = MAP(sur1)(domain);
	var out2 = MAP(sur2)(domain);
	var out = STRUCT([out1, out2]);
	return out;
}
function tuboAnglat(Rag,rag,len,lar) {		//len e' la distanza tra ingresso ed uscita, lar è la profondita' della curva 
	var c1 = CUBIC_HERMITE(S0)([[Rag+len/2,0,0],[-Rag-len/2,0,0],[0,4*(Rag+lar),0],[0,-4*(Rag+lar),0]]);
	var c2 = CUBIC_HERMITE(S0)([[rag+len/2,0,0],[-rag-len/2,0,0],[0,4*(rag+lar),0],[0,-4*(rag+lar),0]]);
	var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,Rag],[0,0,-Rag]]);
	var sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-Rag],[0,0,Rag]]);
	var out1 = MAP(sur1)(domain);
	var out2 = MAP(sur2)(domain);
	var out = STRUCT([out1, out2]);
	return out;
}

var rotdom = DOMAIN([[0,1],[0,2*PI]])([32,32]);
var lp = 2; 	//larghezza palo
var h = 200; 	//altezza
var hpp = 125; 	//altezza portapantaloni
var hs = 175; 	//altezza stampella

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
function pp(hpp,col){
	var lar = 44; //larghezza del portapantaloni
	var Rag = 2;
	var rag = 1;
	var tubi = STRUCT(REPLICA(3)([T([0,1,2])([-lar/2,hpp,-5.5])( tubo(Rag,rag,lar) ), T([2])([8])]));
	var ang1 = T([0,1,2])([lar/2,hpp+1.5,6.5])(	R([0,2])(PI/2)( R([1,2])(PI/2)(tuboAnglat(Rag,rag,5,1)))	);
	var ang = STRUCT([ ang1, T([2])([5])( R([0,2])(PI)(ang1) ) ]);
	var e1 = STRUCT([ T([0,1,2])([lar/2+1,hpp+1.5,-4])(R([1,2])(-PI/2)(tuboAng(Rag,rag))), 
						T([0,1,2])([lar/2+2.5,hpp,-3.5])( R([0,2])(PI/2)(tubo(Rag,rag,0.5))),
						T([0,1,2])([lar/2,hpp,-5.5])( R([0,2])(0)(tubo(Rag,rag,1))),
							T([0,1,2])([lar/2+1,hpp+1.5,-3.5])( R([1,2])(-PI/2)(closetube(Rag,rag))) ]);
	var e2 = T([2])([5])( R([0,2])(PI)(e1) );
	var portapantaloni = COLOR(col)( STRUCT([ tubi, ang, e1, e2 ]) );
	return T([1])([2*hpp])(R([0,1])(PI)(portapantaloni));
}
function stampella(hs,col){
	var lar = 65;	//65
	var len = 50;
	var Rag = 2;
	var rag = 1;
	//	bottom
	var c1 = CUBIC_HERMITE(S0)([[Rag+len/2,0,0],[-Rag-len/2,0,0],[-Rag*3,-Rag*3,0],[-Rag*3,Rag*3,0]]);
	var c2 = CUBIC_HERMITE(S0)([[Rag+len/2,-rag,0],[-Rag-len/2,-rag,0],[-Rag*3,-Rag*3,0],[-Rag*3,Rag*3,0]]);
	var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-Rag],[0,0,Rag]]);
	var sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,Rag],[0,0,-Rag]]);
	var bottom1 = MAP(sur1)(domain);
	var bottom2 = MAP(sur2)(domain);
	var bottom = STRUCT([bottom1, bottom2, T([0,1])([len/2+Rag,-Rag])(tubo(Rag,rag,3)),
											T([0,1])([-len/2-Rag-3,-Rag])(tubo(Rag,rag,3))]);
	//	lato
	var larg = 3;
	var c1 = CUBIC_HERMITE(S0)([[Rag*2,0,0],[-2*Rag,0,0],[0,4*(Rag+larg),0],[-2*(Rag+larg),-4*(Rag+larg),0]]);
	var c2 = CUBIC_HERMITE(S0)([[rag+Rag,0,0],[-rag-Rag,0,0],[0,4*(rag+larg),0],[-2*(Rag+larg),-4*(rag+larg),0]]);
	var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,Rag],[0,0,-Rag]]);
	var sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-Rag],[0,0,Rag]]);
	var out1 = MAP(sur1)(domain);
	var out2 = MAP(sur2)(domain);
	var out = STRUCT([out1, out2]);
	var l = T([0,1])([len/2+Rag+3, 3*rag])( R([0,1])(-PI/2)(out));
	var l4 = STRUCT([ l, R([0,2])(PI)(l) ]);
	//	lato superiore destro
	var larg = 10;
	var c1 = CUBIC_HERMITE(S0)([[Rag+len/2+3,6+rag,0],[4*Rag,13+rag,5],[-larg,larg,0],[-larg,0,0]]);
	var c2 = CUBIC_HERMITE(S0)([[Rag+len/2+3,6,0],[4*Rag,13,5],[-larg,larg,0],[-larg,0,0]]);
	var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-Rag],[0,0,Rag]]);
	var sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,Rag],[0,0,-Rag]]);
	var ls1 = MAP(sur1)(domain);
	var ls2 = MAP(sur2)(domain);
	var lsd = STRUCT([ ls1,ls2 ]);
	//lato superiore sinistro
	var c1 = CUBIC_HERMITE(S0)([[-(Rag+len/2+3),6+rag,0],[-(4*Rag),13+rag,5],[larg,larg,0],[larg,0,0]]);
	var c2 = CUBIC_HERMITE(S0)([[-(Rag+len/2+3),6,0],[-(4*Rag),13,5],[larg,larg,0],[larg,0,0]]);
	var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-Rag],[0,0,Rag]]);
	var sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,Rag],[0,0,-Rag]]);
	var ls1 = MAP(sur1)(domain);
	var ls2 = MAP(sur2)(domain);
	var lss = STRUCT([ ls1,ls2 ]);

	var ls4 = STRUCT([ lsd, lss ]);
	//	parte supereriore 
	var larg = 1;
	var ps4 = STRUCT([ T([0,1,2])([-(4*Rag),15,5])( R([1,2])(PI)(tuboAngPar(Rag,rag,larg))), 
						T([0,1,2])([4*Rag,15,5])( R([0,1])(PI)(tuboAngPar(Rag,rag,larg))) ]);
	var punta = T([1,2])([15,5])(tuboAnglat(Rag,rag,5*Rag,1));

	var out = COLOR(col)(STRUCT([ bottom,l4,ls4,ps4,punta ])); 
	return T([1,2])([hs,2.5])(out);
}
function servonotte(lp,h,hpp,hs,col){
	var servonotte = STRUCT([	punta(lp,h,col), palo(lp,h,col), base(lp,col), pp(hpp,col), stampella(hs,col)	]);
	return servonotte;
}


DRAW(servonotte(lp,h,hpp,hs,nero));