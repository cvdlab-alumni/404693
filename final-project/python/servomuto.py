#	Final Project
#	Davide Razzino - 404693
#	Servomuto
#	Achille Castiglioni

from pyplasm import *
import scipy
from scipy import *

#---------------------------------------------------------
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

rotdom = S([2])(2*PI)(MAP([S2,S1])(GRID([20,20])))
lp = 2 #larghezza palo
h = 120 #altezza
ht = h*65/100 #altezza del piano
bianco = [1,1,1]
nero = [0,0,0]

def punta(lp,h,col):
	profile = BEZIER(S1)([[lp,0,0],[1,0,1],[3,0,6],[4.5,0,7],[2.5,0,9],[0,0,9]])
	mapping = ROTATIONALSURFACE(profile)
	punta = COLOR(col)( T([2])([h])(R([3,2])(PI/2)( MAP(mapping)(rotdom) )))
	return punta

def palo(lp,h,col):
	profile = BEZIER(S1)([[lp,0,0],[lp,0,h-20]])
	mapping = ROTATIONALSURFACE(profile)
	palo = COLOR(col)( T([2])([20])( R([3,2])(PI/2)( MAP(mapping)(rotdom) )))
	return palo

def base(lp,col):
	profile = BEZIER(S1)([[lp,0,20],[9,0,21],[10,0,18],[11,0,16],[11,0,16],[18,0,0]])
	mapping = ROTATIONALSURFACE(profile)
	base1 = COLOR(col)( R([3,2])(PI/2)( MAP(mapping)(S([2])(2*PI)(GRID([18,20])))))
	base2 = COLOR(col)( R([3,2])(PI/2)( arc(2*PI, 0, 18) ))
	base = STRUCT([ base1,base2 ])
	return base

def tavolo(lp,ht):
	up = T([2])([-0.1])( COLOR(bianco)( R([3,2])(PI/2*3)( arc(2*PI, lp, 34.5))) )
	dw = T([2])([2.2])( COLOR(bianco)( R([3,2])(PI/2)( arc(2*PI, lp, 34.5))) )
	centro = R([3,2])(PI/2)(  COLOR( nero )( PROD([arc(2*PI, lp, 35),Q(2)]) ))
	tavolo = T([2])([ht])( STRUCT([ up,dw, centro ]) )
	return tavolo

def servomuto(lp,h,ht,col):
    servomuto = STRUCT([    punta(lp,h,col), palo(lp,h,col), base(lp,col), tavolo(lp,ht)    ])
    return servomuto

def coppia(lp,h,ht):
    coppia = STRUCT([   T([1])([-40])(servomuto(lp,h,ht,nero)), 
                            T([1])([40])(servomuto(lp,h,ht,bianco)) ])
    return coppia


VIEW(coppia(lp,h,ht))