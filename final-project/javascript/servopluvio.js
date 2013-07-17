//	Final Project
//	Davide Razzino - 404693
//	Servopluvio
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
var h = 150; 	//altezza
var hpo = 90;	//altezza portaombrello
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
	var profile = BEZIER(S0)([[lp,0,20],[9,0,21],[18,0,18],[15,0,16],[15,0,16],[18,0,-30],
								[40,0,-10],[32,0,10],[38,0,30],[40,0,30],[40,0,30],[32,0,0]]);
	var mapping = ROTATIONAL_SURFACE(profile);
	var base1 = MAP(mapping)(rotdom);
	var base2 = DISK(32)(64);
	var profile = BEZIER(S0)([[38,0,25],[45,0,25],[38,0,21]]); //bordino
	var mapping = ROTATIONAL_SURFACE(profile);
	var base3 = MAP(mapping)(rotdom);
	var base = COLOR(col)( R([2,1])(PI/2*3)( STRUCT([ base1,base2,base3 ])));
	return S([0,1,2])([0.8,1,0.8])(base);
}
function portaombrelli(hpo,col){
	var Rag = 2;
	var rag = Rag/2;
	var len = 50;
	var lar = 25;
	var offset = 10;
	//	tubo esterno
	var c1 = CUBIC_HERMITE(S0)([[Rag+len/2+rag,offset,0],[-Rag-len/2-rag,offset,0],[-lar,3*lar,0],[-lar,-3*lar,0]]);
	var c2 = CUBIC_HERMITE(S0)([[rag+len/2+rag,offset-0.5,0],[-rag-len/2-rag,offset-0.5,0],[-lar,2.8*lar,0],[-lar,-2.8*lar,0]]);
	var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,Rag],[0,0,-Rag]]);
	var sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-Rag],[0,0,Rag]]);
	var out1 = MAP(sur1)(domain);
	var out2 = MAP(sur2)(domain);
	var tube = R([1,2])(PI/2*3)( STRUCT([out1,out2]));
	var etube = T([0])([Rag+rag+0.2])( R([0,2])(PI/2)( R([1,2])(-PI/2)(tubo(Rag*1.1,rag*1.1,3))));
	var ctube = T([0])([-0.1])( R([1,2])(-PI/2)( closetube(Rag*1.1,rag*1.1)));
	var endtube = T([0,2])([len/2+rag+1.4,3.6-offset])( R([2,0])(PI/7)( STRUCT([etube, ctube])));
	var tuboesterno = STRUCT([tube,endtube]);
	//	tubo esterno
	var c1 = CUBIC_HERMITE(S0)([[-(Rag+len/2+rag),offset,0],[0,-rag/2,0],[0,-1.5*lar,0],[2*lar,0,0]]);
	var c2 = CUBIC_HERMITE(S0)([[-(rag+len/2+rag),offset,0],[0,rag/2,0],[0,-1.3*lar,0],[2*lar,0,0]]);
	var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,Rag],[0,0,-Rag]]);
	var sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-Rag],[0,0,Rag]]);
	var out1 = MAP(sur1)(domain);
	var out2 = MAP(sur2)(domain);
	var tubointerno = R([1,2])(PI/2*3)( STRUCT([out1,out2]));
	//	tube R
	var tubi = STRUCT([tubointerno,tuboesterno]);
	var portaombrelli = COLOR(col)( T([1])([hpo])( R([1,2])(PI)(STRUCT([ tubi, R([0,1])(PI)( R([1,2])(PI)(tubi)) ]))));
	return portaombrelli;
}
function servopluvio(lp,h,hpo,col){
	var servopluvio = STRUCT([	punta(lp,h,col), palo(lp,h,col), base(lp,col), portaombrelli(hpo,col)	]);
	return servopluvio;
}


DRAW(servopluvio(lp,h,hpo,nero));