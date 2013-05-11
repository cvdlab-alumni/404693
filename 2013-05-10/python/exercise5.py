#   Davide Razzino
#   Exercise 5
#   Create at least two interesting car surfaces and add them to the mock-up
#   I choose the bonnet, the windscreen and the doors

from pyplasm import *
import scipy
from scipy import *

def VERTEXTRUDE((V,coords)):
    """
        Utility function to generate the output model vertices in a 
        multiple extrusion of a LAR model.
        V is a list of d-vertices (each given as a list of d coordinates).
        coords is a list of absolute translation parameters to be applied to 
        V in order to generate the output vertices.
        
        Return a new list of (d+1)-vertices.
    """
    return CAT(AA(COMP([AA(AR),DISTR]))(DISTL([V,coords])))

def cumsum(iterable):
    # cumulative addition: list(cumsum(range(4))) => [0, 1, 3, 6]
    iterable = iter(iterable)
    s = iterable.next()
    yield s
    for c in iterable:
        s = s + c
        yield s

def larExtrude(model,pattern):
    V,FV = model
    d = len(FV[0])
    offset = len(V)
    m = len(pattern)
    outcells = []
    for cell in FV:
        # create the indices of vertices in the cell "tube"
        tube = [v + k*offset for k in range(m+1) for v in cell]
        # take groups of d+1 elements, via shifting by one
        rangelimit = len(tube)-d
        cellTube = [tube[k:k+d+1] for k in range(rangelimit)]
        outcells += [scipy.reshape(cellTube,newshape=(m,d,d+1)).tolist()]
    outcells = AA(CAT)(TRANS(outcells))
    outcells = [group for k,group in enumerate(outcells) if pattern[k]>0 ]
    coords = list(cumsum([0]+(AA(ABS)(pattern))))
    outVerts = VERTEXTRUDE((V,coords))
    newModel = outVerts, CAT(outcells)
    return newModel

def GRID(args):
    model = ([[]],[[0]])
    for k,steps in enumerate(args):
        model = larExtrude(model,steps*[1])
    V,cells = model
    verts = AA(list)(scipy.array(V) / AA(float)(args))
    return MKPOL([verts, AA(AA(lambda h:h+1))(cells), None])

def arc (alpha, r, R) : 
	dom2D = PROD([INTERVALS(alpha)(36), DIFFERENCE([INTERVALS(R)(1),INTERVALS(r)(1)])])
	def mapping (v) : 
		a = v[0]
		r = v[1]
		return [r*COS(a), r*SIN(a)]		
	model = MAP(mapping)(dom2D)
	return model

domain = MAP([S2,S1])(GRID([20,20]))
dim = 6.0

def scoccaL()   :
    dom = INTERVALS(1)(24)

    curve0 = MAP(BEZIER(S1)([[8.5,0,0],[8.5,3,0],[4.75,3,0],[4.75,0,0]]))(dom)
    p1 = MAP(BEZIER(S1)([[11.5,0,0],[8.5,0,0]]))(dom)
    mg = MAP(BEZIER(S1)([[4.75,0,0],[-6,0,0]]))(dom)
    curve1 = MAP(BEZIER(S1)([[-6,0,0],[-6,3,0],[-10,3,0],[-10,0,0]]))(dom)

    f1 = MAP(BEZIER(S1)([[11.5,0,0],[11.4,-0.3,0],[11.5,2,0],[10.75,2.5,0]]))(dom)
    f2 = MAP(BEZIER(S1)([[10.75,2.5,0], [9.7,3,0], [9,3,0]])) (dom)
    p2 = MAP(BEZIER(S1)([[9,3,0], [8.5,3.6,0],[5,4,0]])) (dom)
    pb = MAP(BEZIER(S1)([[5,4,0], [1.5,5.6,0], [-1,5.6,0]])) (dom)

    te = MAP(BEZIER(S1)([[-1,5.6,0], [-2,5.5,0], [-3.75,5.2,0]])) (dom)
    mo1 = MAP(BEZIER(S1)([[-3.75,5.2,0], [-3.75,5.75,0]])) (dom)
    mo2 = MAP(BEZIER(S1)([[-3.75,5.75,0],[-6, 5.75, 0], [-8,4.75,0]])) (dom)
    r1 = MAP(BEZIER(S1)([[-8,4.75,0], [-10.75,4.5,0], [-11.5, 4, 0], [-12,3,0], [-12,2,0]])) (dom)
    r2 = MAP(BEZIER(S1)([[-12,2,0], [-12,1,0], [-11.5, -0.5, 0], [-10,0,0]])) (dom)

    scocca = STRUCT([curve0, p1, mg, curve1, f1, f2, p2, pb, te, mo1, mo2, r1, r2 ])
    return scocca

def scoccaF()   :
    dom = INTERVALS(1)(24)
    curve = MAP(BEZIER(S1)([[0,0,5.5],[0,0,-5.5]]))(dom)

    p1 = MAP(BEZIER(S1)([[0,4,5.5],[0,-0.1,5.2],[0,0,5.5]]))(dom)
    p2 = MAP(BEZIER(S1)([[0,4,-5.5],[0,-0.1,-5.2],[0,0,-5.5]]))(dom)
    p3 = MAP(BEZIER(S1)([[0,4, 5.5],[0,4.4, 5.3], [0,4.4, 4.5]]))(dom)  
    p4 = MAP(BEZIER(S1)([[0,4,-5.5],[0,4.4,-5.3], [0,4.4,-4.5]]))(dom)

    l1 = MAP(BEZIER(S1)([[0,4.4, 4.5],[0,4.8, 4.3],[0,4.4, 3.6],[0,4.8, 3.5]]))(dom)
    l2 = MAP(BEZIER(S1)([[0,4.4,-4.5],[0,4.8,-4.3],[0,4.4,-3.6],[0,4.8,-3.5]]))(dom)
    l3 = MAP(BEZIER(S1)([[0,4.75, 3.5],[0,5.5, 3]]))(dom)
    l4 = MAP(BEZIER(S1)([[0,4.75,-3.5],[0,5.5,-3]]))(dom)
    l5 = MAP(BEZIER(S1)([[0,5.5, 3],[0,5.6, 2.75],[0,5.6, 2.5]]))(dom)
    l6 = MAP(BEZIER(S1)([[0,5.5,-3],[0,5.6,-2.75],[0,5.6,-2.5]]))(dom)

    m1 = MAP(BEZIER(S1)([[0,5.6, 2.5],[0,6, 1.6],[0,5.6, 1.5]]))(dom)
    m2 = MAP(BEZIER(S1)([[0,5.6,-2.5],[0,6,-1.6],[0,5.6,-1.5]]))(dom)
    tt = MAP(BEZIER(S1)([[0,5.6, 1.5],[0,5.7, 0],[0,5.6, -1.5]]))(dom)

    scocca = STRUCT([curve, p1, p2, p3, p4, l1, l2, l3, l4, l5, l6, m1, m2, tt])
    return scocca

def scoccaS()   :
    dom = INTERVALS(1)(24)

    front = MAP(BEZIER(S1)([[10.5,0,-4.5],[12,0,-1],[12,0,1.5],[10.5,0,4.5]])) (dom)
    p1 = MAP(BEZIER(S1)([[9, 0, -5.5], [10, 0, -5], [10.5,0,-4.5]]))(dom)
    p2 = MAP(BEZIER(S1)([[9,0,5.5],[10,0,5.5],[10.5,0,4.5]]))(dom)

    r1 = MAP(BEZIER(S1)([[9,0,-5.5], [9, 0, -4.65], [5,0,-5.5]]))(dom)
    r2 = MAP(BEZIER(S1)([[9,0,5.5], [9, 0, 5.15], [5,0,5.5]]))(dom)
    l1 = MAP(BEZIER(S1)([[5,0,-5.5], [5, 0, -4.65], [-6,0,-5.5]]))(dom)
    l2 = MAP(BEZIER(S1)([[5,0,5.5],[5, 0, 5.15], [-6,0,5.5]]))(dom)
    r3 = MAP(BEZIER(S1)([[-6,0,-5.5], [-6, 0, -4.75], [-10.5,0,-5.5]]))(dom)
    r4 = MAP(BEZIER(S1)([[-6,0,5.5], [-6, 0, 5.25], [-10.5,0,5.5]]))(dom)

    p3 = MAP(BEZIER(S1)([[-10.5, 0, -5.5], [-11, 0, -5], [-11,0,-3.5],[-11.5,0,-3.5]]))(dom)
    p4 = MAP(BEZIER(S1)([[-10.5,0,5.5],[-11,0,5.5],[-11,0,4],[-11.5,0,3.5]]))(dom)
    bk = MAP(BEZIER(S1)([[-11.5,0,-3.5],[-12,0,0],[-11.5,0,3.5]]))(dom)

    scocca = STRUCT([front, p1, p2, r1, r2, l1, l2, r3, r4, p3, p4, bk])
    return scocca

def pseudo3D()  :
    return STRUCT([T([3])([0.1])(scoccaF()), scoccaL() ,scoccaS()])

#	VIEW(pseudo3D())

def TuboAng(Rag,rag, z) :
	c1 = CUBICHERMITE(S1)([[Rag,0,0],[0,Rag,0],[0,1.7*Rag,0],[-1.7*Rag,0,0]])
	c2 = CUBICHERMITE(S1)([[rag,0,0],[0,rag,0],[0,1.7*rag,0],[-1.7*rag,0,0]])
	sur3 = CUBICHERMITE(S2)([c2,c1,[0,0,Rag*z],[0,0,-Rag*z]])
	out1 = MAP(sur3)(domain)
	out2 = R([1,2])(PI/2)(R([2,3])(PI)(out1))
	out = STRUCT([out1, out2])
	return out

def pneumatico(dim)	:
	Cir = dim/4.0
	ruota = STRUCT([TuboAng(Cir,Cir*0.7,1.5),R([1,2])(PI/2)(TuboAng(Cir,Cir*0.7,1.5)),
			R([1,2])(PI)(TuboAng(Cir,Cir*0.7,1.5)),R([1,2])(3*PI/2)(TuboAng(Cir,Cir*0.7,1.5))	])
	return COLOR(BLACK)(ruota)

def cerchione(dim)	:
	cir = dim/4.0
	model1 = CYLINDER([cir/5.0,cir/5.0]) (64)
	model2 = T([3])([-cir/10.0*2.6])(PROD([(arc(2*PI,cir*0.63,cir*0.75)), Q(cir/5.0*2.4)]))
#	Raggi
	Su0 = BEZIER(S1)([[-cir/10,cir/5,cir/10],[cir/10,cir/5,0]])
	Su1 = BEZIER(S1)([[-cir/10,cir*0.65,0],[cir/10,cir*0.65,cir/10]])
	S0v = BEZIER(S2)([[-cir/10,cir/5,cir/10],[0,cir*0.65/3.0,0.5],[0,cir*0.65/3.0*2.0,0],[-cir/10,cir*0.65,cir/10]])
	S1v = BEZIER(S2)([[cir/10,cir/5,cir/10],[0,cir*0.65/3.0,0.5],[0,cir*0.65/3.0*2.0,0], [cir/10,cir*0.65,cir/10]])
	raggio = S([1,2,3])([0.33,0.33,0.33])(MAP(COONSPATCH([Su0,Su1,S0v,S1v])) (GRID([20,20])))
	raggi = STRUCT(NN(12)([raggio, R([1,2])(PI/6)]))
	model = STRUCT([model1, model2, T([3])([cir/10])(raggi)])
	return model

def wheel(dim)	:
	return STRUCT([pneumatico(dim), cerchione(dim)])

#	VIEW(wheel(dim))

def wheels(dim)	:
	w = wheel(dim)
	rw = R([1,3])(PI)(w)
	wheels = STRUCT([	T([1,3])([6.7, 5])(w),		T([1,3])([-8, 5])(w),
						T([1,3])([6.7,-5])(rw),		T([1,3])([-8,-5])(rw)	])
	return wheels

# show = STRUCT([	pseudo3D(), wheels(dim)	])
# VIEW(show)

def volante(dim)	:
    Cir = dim/4
    cerchio = COLOR([0.33,0.33,0.33])(STRUCT([TuboAng(Cir,Cir*0.75,0.5),R([1,2])(PI/2)(TuboAng(Cir,Cir*0.75,0.5)),R([1,2])(PI)(TuboAng(Cir,Cir*0.75,0.5)),R([1,2])(3*PI/2)(TuboAng(Cir,Cir*0.75,0.5))	]))
    centro = T([3])([-Cir/10])(CYLINDER([Cir/4.5,Cir/5.0]) (64)	)
#   Raggi
    Su0 = BEZIER(S1)([[-Cir/5,0,0],[0,0,Cir/2],[Cir/5,0,0]])
    Su1 = BEZIER(S1)([[-Cir/5,Cir*0.8,0],[0,Cir*0.75, Cir/2],[Cir/5,Cir*0.8,0]])
    S0v = BEZIER(S2)([[-Cir/5,0,0],[-Cir/5,Cir*0.8,0]])
    S1v = BEZIER(S2)([[Cir/5,0,0], [Cir/15,Cir*0.8,0]])
    raggio = S([1,2,3])([0.33,0.33,0.33])(MAP(COONSPATCH([Su0,Su1,S0v,S1v])) (GRID([20,20])))
    raggi = STRUCT([raggio, R([1,2])(PI/2.0*3.0)(raggio), R([1,2])(PI/2)(raggio)])
    volante = STRUCT([cerchio, centro, raggi, R([1,2])(PI*1.04)(R([2,3])(PI)(raggi))])
    return volante

def steeringwheel() :
    return T([1,2,3])([4,3,-1.5])(R([1,3])(PI/2.0)(R([1,2])(PI)(volante(4.0))))

# show = STRUCT([ OFFSET([0.15,0.15,0.15])(pseudo3D()), wheels(dim), steeringwheel() ])
# VIEW(show)
# For a better view I use the OFFSET function :-)

def cofano()    :
    Su0 = BEZIER(S1)([[5,4,-3.5],[6,5,-2],[5,4,0]])
    Su1 = BEZIER(S1)([[11.5,1,-0.5], [10,4.5,-1],[10.5,2.5,0]])
    S0v = BEZIER(S2)([[5,4,-3.5],[9.5, 2.75,-3],[11.5,1,-1.5]])
    S1v = BEZIER(S2)([[5,4,0], [10,3,0]])
    cofano1 = S([1,2,3])([0.33,0.33,0.33])(MAP(COONSPATCH([Su0,Su1,S0v,S1v])) (GRID([20,20])))
    Su0 = BEZIER(S1)([[5,4,3.5],[6,5,2],[5,4,0]])
    Su1 = BEZIER(S1)([[11.5,1,0.5], [10,5,1],[10.5,3.5,0]])
    S0v = BEZIER(S2)([[5,4,3.5],[9.5, 2.75,3],[11.5,1,1.5]])
    S1v = BEZIER(S2)([[5,4,0], [10,2.5,0]])
    cofano2 = S([1,2,3])([0.33,0.33,0.33])(MAP(COONSPATCH([Su0,Su1,S0v,S1v])) (domain))
    cofano = STRUCT([COLOR(BLACK)(cofano1),COLOR(BLACK)(cofano2)])
    return cofano

def parabrezza()    :
    Su0 = BEZIER(S1)([[2,5,-3],[1,7,0],[2,5,3]])
    Su1 = BEZIER(S1)([[5,4,-3.5],[5.5,4.5,0],[5,4,3.5]])
    S0v = BEZIER(S2)([[5,4,-3.5],[3.3, 4.9,-4],[2,5,-3]])
    S1v = BEZIER(S2)([[5,4, 3.5],[3.3, 4.9, 4],[2,5,3]])
    parabrezza = S([1,2,3])([0.33,0.33,0.33])(MAP(COONSPATCH([Su1,Su0,S0v,S1v])) (domain))
    return COLOR([1,0.55,0.4])(parabrezza)

def doors()  :
    Su0 = BEZIER(S1)([[4,4,-4],[-2.5,3.5,-3]])
    Su1 = BEZIER(S1)([[4,0.9,-4],[-1,1.1,-5]])
    S0v = BEZIER(S2)([[4,0.9,-4],[4.2, 3, -4.5],[4,4,-4]])
    S1v = BEZIER(S2)([[-1,1.1,-5], [-2,3,-5], [-2.5,5,-3]])
    door1 = S([1,2,3])([0.33,0.33,0.33])(MAP(COONSPATCH([Su1,Su0,S0v,S1v])) (GRID([20,20])))

    Su0 = BEZIER(S1)([[4,4,4],[-2.5,3.5,3]])
    Su1 = BEZIER(S1)([[4,0.9,4],[-1,1.1,5]])
    S0v = BEZIER(S2)([[4,0.9,4],[4.2, 3,4.5],[4,4,4]])
    S1v = BEZIER(S2)([[-1,1.1,5], [-2,3,5], [-2.5,5,4]])
    door2 = S([1,2,3])([0.33,0.33,0.33])(MAP(COONSPATCH([Su1,Su0,S0v,S1v])) (domain))
    doors = STRUCT([COLOR(BLACK)(door1),COLOR(BLACK)(door2)])
    return doors

show = STRUCT([ pseudo3D(), wheels(dim), steeringwheel(), cofano(), parabrezza(), doors() ])
VIEW(show)