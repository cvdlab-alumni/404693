#	Final Project
#	Davide Razzino - 404693
#	Servofumo
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

domain = MAP([S2,S1])(GRID([20,20]))
domainR = GRID([20,20])



rotdom = S([2])(2*PI)(MAP([S2,S1])(GRID([20,20])))
rotdomR = S([2])(2*PI)(GRID([20,20]))
lp = 2     #larghezza palo
h = 150    #altezza
hpc = 90  #altezza posacenere

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

def posacenere(lp,hpc,col):
    profile = BEZIER(S1)([[lp,0,20],[9,0,21],[18,0,18],[15,0,16],[15,0,16],[18,0,-30],
                                [40,0,-10],[32,0,10],[37,0,30],[40,0,30],[40,0,30],[32,0,0]])
    mapping = ROTATIONALSURFACE(profile)
    base1 = MAP(mapping)(rotdomR)
    base2 = COLOR(col)( R([3,2])(PI)( arc(2*PI, lp, 32) ))
    profile = BEZIER(S1)([[37,0,22],[45,0,25],[37,0,18]]) #bordino
    mapping = ROTATIONALSURFACE(profile)
    base3 = MAP(mapping)(rotdomR)
    base = COLOR(col)( R([3,2])(PI/2)( STRUCT([ base1,base2,base3 ])))
    return T([2])([hpc])(S([1,2,3])([0.6,0.6,0.6])(base))

def servofumo(lp,h,hpo,col):
    servofumo = STRUCT([  punta(lp,h,col), palo(lp,h,col), base(lp,col), posacenere(lp,hpo,col)   ])
    return servofumo



VIEW(servofumo(lp,h,hpc,nero))
#VIEW(STRUCT([posacenere(lp,hpc,[1,1,1]), base(lp,[1,1,1])]))