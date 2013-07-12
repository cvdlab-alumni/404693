//	Final Project
//	Davide Razzino - 404693
//	Ingresso linea Zanotta
//	Achille Castiglioni

// Basello

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

var hb = 45*1.5;		//altezza
var larg = 65*1.5;		//larghezza
var prof = 30*1.5;		//profondita'
var sp = 3*1.5;			//spessore
var nero = [0,0,0];
var darkgrey = [0.2,0.2,0.2];
var bianco = [1.5,1.5,1.5];
var rot = PI/3;

function basello(col,rot){
	var pianosup = T([2])([hb-sp])(CUBOID([larg,prof,sp]));
	var pianosuplat = T([0])([larg-sp])(CUBOID([sp,prof,hb]));
	var basup = COLOR(col)(T([0,1])([-larg/5,-prof/2])(STRUCT([pianosup, pianosuplat])));

	var cilindro = COLOR(nero)(T([2])([hb/2-0.1])(EXTRUDE([hb/2+0.2])(arc(2*PI,0,sp))));

	var pianoinf = T([2])([hb/2])(CUBOID([larg-2*sp,prof,sp]));
	var pil1 = T([0])([larg-3*sp])(CUBOID([sp,prof,hb/2]));
	var pil2 = CUBOID([sp,prof,hb/2]);
	var basdw = COLOR(col)(T([0,1])([-larg/5,-prof/2])(STRUCT([pianoinf,pil1,pil2])));

	var basello = R([1,2])(-PI/2)( STRUCT([basup,R([0,1])(-rot)(basdw),cilindro]));
	return basello;
}

//	DRAW(basello(darkgrey,rot));

// Servopluvio

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
var h = 130; 	//altezza
var hpo = 77;	//altezza portaombrello
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
function basesp(lp,col){
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
	var servopluvio = STRUCT([	punta(lp,h,col), palo(lp,h,col), basesp(lp,col), portaombrelli(hpo,col)	]);
	return servopluvio;
}

// DRAW(servopluvio(lp,h,hpo,nero));

// Servonotte

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

//	DRAW(servonotte(lp,h,hpp,hs,nero));

// Servomuto

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
	var centro = R([2,1])(PI/2*3)(  COLOR( nero )( EXTRUDE([2])(	arc(2*PI,lp,35)	)));
	var tavolo = T([1])([ht])( STRUCT([ up,dw, centro ]) );
	return tavolo;
}
function servomuto(lp,h,ht,col){
	var servomuto = STRUCT([	punta(lp,h,col), palo(lp,h,col), base(lp,col), tavolo(lp,ht)	]);
	return servomuto;
}
function coppia(lp,h,ht){
	var coppia = STRUCT([	T([0])([-150])(servomuto(lp,h,ht,nero)), 
							T([0])([150])(servomuto(lp,h,ht,bianco))	]);
	return coppia;
}
//	DRAW(coppia(lp,h,ht));

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
var hpc = 60;	//altezza posacenere
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

function zanotta(){
	return STRUCT([	T([2])([-50])(coppia(lp,120,ht)), T([0,2])([-150,350])(servonotte(lp,200,hpp,hs,nero)),
					T([0,2])([150,350])(servopluvio(lp,130,hpo,nero)), 
					T([0,2])([150,175])(R([0,2])(PI/2)(basello(darkgrey,PI))),
					T([0,2])([-150,175])(R([0,2])(PI/2)(basello(bianco,PI))),
					T([0,2])([150,30])(servofumo(lp,110,hpc,nero)),
					T([0,2])([-150,35])(servofumo(lp,110,hpc,nero))	]);
}

DRAW(zanotta())