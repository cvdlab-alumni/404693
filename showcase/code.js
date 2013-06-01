//	Modellazione di una spada vichinga

var domain = PROD1x1([INTERVALS(1)(64),INTERVALS(1)(64)]);

function pomo(){
//	Petali del pomo
	var c0 = BEZIER(S0)([[2,0,1],[1.5,2.5,1],[1.5,2.5,-1],[2,0,-1]]);
	var c1 = BEZIER(S0)([[2,0,1],[2,4.3,1],[2,4.3,-1],[2,0,-1]]);
	var c2 = BEZIER(S0)([[3.5,0,1],[3.5,4.3,1],[3.5,4.3,-1],[3.5,0,-1]]);
	var c3 = BEZIER(S0)([[3.5,0,1],[4,2.5,1],[4,2.5,-1],[3.5,0,-1]]);
	var petaloc = MAP(BEZIER(S1)([c0,c1,c2,c3]))(domain);

	var c0 = BEZIER(S0)([[2,0,1],[0,0,1],[0,0,-1],[2,0,-1]]);
	var c1 = BEZIER(S0)([[2,0,1],[-1.3,1.8,1],[-1.3,1.8,-1],[2,0,-1]]);
	var c2 = BEZIER(S0)([[2,0,1],[0,2.8,1],[0,2.8,-1],[2,0,-1]]);
	var c3 = BEZIER(S0)([[2,0,1],[1.5,2.5,1],[1.5,2.5,-1],[2,0,-1]]);
	var petalos = MAP(BEZIER(S1)([c0,c1,c2,c3]))(domain); 

	var c0 = BEZIER(S0)([[3.5,0,1],[5.5,0,1],[5.5,0,-1],[3.5,0,-1]]);
	var c1 = BEZIER(S0)([[3.5,0,1],[6.8,1.8,1],[6.8,1.8,-1],[3.5,0,-1]]);
	var c2 = BEZIER(S0)([[3.5,0,1],[5.5,2.8,1],[5.5,2.8,-1],[3.5,0,-1]]);
	var c3 = BEZIER(S0)([[3.5,0,1],[4,2.5,1],[4,2.5,-1],[3.5,0,-1]]);
	var petalod = MAP(BEZIER(S1)([c0,c1,c2,c3]))(domain);
//	Base del Pomo
	var c0 = BEZIER(S0)([[0,0,1],[2.75,0,1.3],[5.5,0,1]]);
	var c1 = BEZIER(S0)([[0,-1,1],[2.75,-1,1.3],[5.5,-1,1]]);
	var base1 = MAP(BEZIER(S1)([c0,c1]))(domain);
	var base2 = T([0])([5.5])(R([0,2])(PI)(base1));

	var up = BEZIER(S0)([[0,0,1],[2.75,0,1.3],[5.5,0,1]]);
	var dw = BEZIER(S0)([[0,0,-1],[2.75,0,-1.3],[5.5,0,-1]]);
	var lf = BEZIER(S1)([[0,0,1],[-0.4,0,0],[0,0,-1]]);
	var rg = BEZIER(S1)([[5.5,0,1],[5.9,0,0],[5.5,0,-1]]);
	var base3 = MAP(COONS_PATCH([up,dw,lf,rg]))(domain);
	var base4 = T([1])([-1])(base3);

	var c0 = BEZIER(S0)([[0,0,1],[-0.4,0,0],[0,0,-1]]);
	var c1 = BEZIER(S0)([[0,-1,1],[-0.4,-1,0],[0,-1,-1]]);
	var base5 = MAP(BEZIER(S1)([c0,c1]))(domain);
	var base6 = T([0])([5.5])(R([0,2])(PI)(base5));	
	var base = STRUCT([base1, base2, base3, base4, base5, base6]);

	var out = STRUCT([petaloc, petalos, petalod, base]);
	return COLOR([0.82,0.82,0.82])(T([0,1])([-2.75,1.13])(out));
}
function TuboAng(Rag,rag, z) {
	var c1 = CUBIC_HERMITE(S0)([[Rag,0,0],[0,Rag,0],[0,1.7*Rag,0],[-1.7*Rag,0,0]]);
	var c2 = CUBIC_HERMITE(S0)([[rag,0,0],[0,rag,0],[0,1.7*rag,0],[-1.7*rag,0,0]]);
	var sur3 = CUBIC_HERMITE(S1)([c2,c1,[0,0,Rag*z],[0,0,-Rag*z]]);
	var out1 = MAP(sur3)(domain);
	var out2 = R([0,1])(PI/2)(R([1,2])(PI)(out1));
	var out = STRUCT([out1, out2]);
	return R([1,2])(PI/2)(out);
}
function impugnatura(){
	var l1 = STRUCT([ TuboAng(1,0.75,0.5), R([0,2])(PI/2.0)(TuboAng(1,0.75,0.5)),
				R([0,2])(PI)(TuboAng(1,0.75,0.5)), R([0,2])(PI*3.0/2.0)(TuboAng(1,0.75,0.5)) ]);
	var l2 = S([0,1,2])([1.05,1.05,1.05])(T([1])([-0.2])(l1));
	var l3 = T([1])([-10.5])(	STRUCT([ TuboAng(1,0.75,0.5), R([0,2])(PI/2.0)(TuboAng(1,0.75,0.5)),
				R([0,2])(PI)(TuboAng(1,0.75,0.5)), R([0,2])(PI*3.0/2.0)(TuboAng(1,0.75,0.5)) ])	);
	var l4 = S([0,1,2])([1.05,1.05,1.05])(T([1])([0.7])(l3));

	var rotdom = DOMAIN([[0,1],[0,2*PI]])([32,32]);
	var profile = BEZIER(S0)([[1,0,0],[1.5,0,3],[1.5,0,7],[1,0,10]]);
	var mapping = ROTATIONAL_SURFACE(profile);
	var imp = T([1])([-0.3])(R([1,2])(PI/2)(COLOR([0.58,0.29,0]) ( MAP(mapping)(rotdom) )));

	var out = STRUCT([l1,l2,l3,l4, imp]);
	return out;
}
function paramano(){
	var up = BEZIER(S0)([[-4.5,1,1],[0,2,1],[4.5,1,1]]);
	var dw = BEZIER(S0)([[-4,0,1],[0,1,1],[4,0,1]]);
	var lf = BEZIER(S1)([[-4.5,1,1],[-4.5,0.5,1],[-4,0,1]]);
	var rg = BEZIER(S1)([[4.5,1,1],[4.5,0.5,1],[4,0,1]]);
	var base1 = MAP(COONS_PATCH([up,dw,lf,rg]))(domain);
	var base2 = T([2])([-2])(base1);

	var up = BEZIER(S0)([[-4.5,1,-1],[0,2,-1],[4.5,1,-1]]);
	var dw = BEZIER(S0)([[-4.5,1,1],[0,2,1],[4.5,1,1]]);
	var lf = BEZIER(S1)([[-4.5,1,-1],[-4.5,1,0],[-4.5,1,1]]);
	var rg = BEZIER(S1)([[4.5,1,-1],[4.5,1,0],[4.5,1,1]]);
	var base3 = MAP(COONS_PATCH([up,dw,lf,rg]))(domain);
	var up = BEZIER(S0)([[-4,0,-1],[0,1,-1],[4,0,-1]]);
	var dw = BEZIER(S0)([[-4,0,1],[0,1,1],[4,0,1]]);
	var lf = BEZIER(S1)([[-4,0,-1],[-4,0,1]]);
	var rg = BEZIER(S1)([[4,0,-1],[4,0,1]]);
	var base4 = MAP(COONS_PATCH([up,dw,lf,rg]))(domain);

	var up = BEZIER(S0)([[-4.5,1,-1],[-4.5,1,1]]);
	var dw = BEZIER(S0)([[-4,0,-1],[-4,0,1]]);
	var lf = BEZIER(S1)([[-4.5,1,-1],[-4.5,0.5,-1],[-4,0,-1]]);
	var rg = BEZIER(S1)([[-4.5,1,1],[-4.5,0.5,1],[-4,0,1]]);
	var base5 = MAP(COONS_PATCH([up,dw,lf,rg]))(domain);
	var up = BEZIER(S0)([[4.5,1,-1],[4.5,1,1]]);
	var dw = BEZIER(S0)([[4,0,-1],[4,0,1]]);
	var lf = BEZIER(S1)([[4.5,1,-1],[4.5,0.5,-1],[4,0,-1]]);
	var rg = BEZIER(S1)([[4.5,1,1],[4.5,0.5,1],[4,0,1]]);
	var base6 = MAP(COONS_PATCH([up,dw,lf,rg]))(domain);

	var base = STRUCT([base1, base2, base3, base4, base5, base6]);

	var paramano = T([1])([-12.05])(base);
	return paramano;
}
function elsa()	{	
	return STRUCT([pomo(),impugnatura(),paramano()]);
}
function lama()	{
	var h = -65;

	var up = BEZIER(S0)([[-1,2.5,0.2],[0,3,0.2],[1,2.5,0.2]]);
	var dw = BEZIER(S0)([[-1,0,0.2],[-0.3,3,0],[0.3,3,0],[1,0,0.2]]);
	var b1 = MAP(BEZIER(S1)([up,dw]))(domain);
	var b2 = R([0,2])(PI)(b1);

	var up = BEZIER(S0)([[-2.5,2,0],[-2,2.5,0.2],[-1,2.5,0.2]]);
	var dw = BEZIER(S0)([[-2.5,h,0],[-1,h,0.2]]);
	var f1 = MAP(BEZIER(S1)([up,dw]))(domain);
	var f2 = R([0,2])(PI)(f1);
	var up = BEZIER(S0)([[2.5,2,0],[2,2.5,0.2],[1,2.5,0.2]]);
	var dw = BEZIER(S0)([[2.5,h,0],[1,h,0.2]]);
	var f3 = MAP(BEZIER(S1)([up,dw]))(domain);
	var f4 = R([0,2])(PI)(f3);
	var l = STRUCT([ b1,b2,f1,f2,f3,f4 ]);

//	Scalanatura
	var up = BEZIER(S0)([[-1,0,0.2],[-0.3,3,0],[0.3,3,0],[1,0,0.2]]);
	var dw = BEZIER(S0)([[-1,h,0.2],[-0.3,h-3,0],[0.3,h-3,0],[1,h,0.2]]);
	var lf = BEZIER(S1)([[-1,0,0.2],[-1,h,0.2]]);
	var rg = BEZIER(S1)([[1,0,0.2],[1,h,0.2]]);
	var s1 = MAP(COONS_PATCH([up,dw,lf,rg]))(domain);
	var s2 = R([0,2])(PI)(s1);
	var s = STRUCT([s1, s2]);

//	Punta
	var up = BEZIER(S0)([[-2.5,h,0],[-1,h,0.2]]);
	var dw = BEZIER(S0)([[-2.5,h-2,0],[0,h-2,0.2]]);
	var lf = BEZIER(S1)([[-2.5,h,0],[-2.5,h-2,0]]);
	var rg = BEZIER(S1)([[-1,h,0.2],[-1,h-1.1,0.2],[0,h-2,0.2]]);
	var p0 = MAP(COONS_PATCH([up,dw,lf,rg]))(domain);
	var p1 = R([0,2])(PI)(p0);
	
	var up = BEZIER(S0)([[-2.5,h-2,0],[2.5,h-2,0.2],[2.5,h-2,0]]);
	var dw = BEZIER(S0)([[-2.5,h-4,0],[0,h-20,0],[2.5,h-4,0]]);
	var p2 = MAP(BEZIER(S1)([up,dw]))(domain);
	var p3 = R([0,2])(PI)(p2);

	var up = BEZIER(S0)([[2.5,h,0],[1,h,0.2]]);
	var dw = BEZIER(S0)([[2.5,h-2,0],[0,h-2,0.2]]);
	var lf = BEZIER(S1)([[2.5,h,0],[2.5,h-2,0]]);
	var rg = BEZIER(S1)([[1,h,0.2],[1,h-1.1,0.2],[0,h-2,0.2]]);
	var p4 = MAP(COONS_PATCH([up,dw,lf,rg]))(domain);
	var p5 = R([0,2])(PI)(p4);

	var p = STRUCT([p0,p1,p2,p3,p4,p5]);

	var out = T([1])([-14])(STRUCT([s, l, p]) );
	return out;
}

function spada()	{
	return STRUCT([elsa(), lama()]);
}

var model = spada();
DRAW(model)