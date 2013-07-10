#	Final Project
#	Davide Razzino - 404693
#	Servopluvio
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

def tuboAng(Rag,rag) :
    c1 = CUBICHERMITE(S1)([[Rag,0,0],[0,Rag,0],[0,1.7*Rag,0],[-1.7*Rag,0,0]])
    c2 = CUBICHERMITE(S1)([[rag,0,0],[0,rag,0],[0,1.7*rag,0],[-1.7*rag,0,0]])
    sur1 = CUBICHERMITE(S2)([c1,c2,[0,0,Rag],[0,0,-Rag]])
    sur2 = CUBICHERMITE(S2)([c1,c2,[0,0,-Rag],[0,0,Rag]])
    out1 = MAP(sur1)(domainR)
    out2 = MAP(sur2)(domain)
    out = STRUCT([out1, out2])
    return out

def tuboAngPar(Rag,rag,larg):
    c1 = CUBICHERMITE(S1)([[Rag,0,0],[0,Rag,0],[0,larg*Rag,0],[-larg*Rag,0,0]])
    c2 = CUBICHERMITE(S1)([[rag,0,0],[0,rag,0],[0,larg*rag,0],[-larg*rag,0,0]])
    sur1 = CUBICHERMITE(S2)([c1,c2,[0,0,Rag],[0,0,-Rag]])
    sur2 = CUBICHERMITE(S2)([c1,c2,[0,0,-Rag],[0,0,Rag]])
    out1 = MAP(sur1)(domainR)
    out2 = MAP(sur2)(domain)
    out = STRUCT([out1, out2])
    return out

def tubo(Rag,rag,leng):
    c1 = CUBICHERMITE(S1)([[leng,rag,0],[0,rag,0],[0,0,0],[0,0,0]])
    c2 = CUBICHERMITE(S1)([[leng,Rag,0],[0,Rag,0],[0,0,0],[0,0,0]])
    sur1 = CUBICHERMITE(S2)([c1,c2,[0,0,Rag],[0,0,-Rag]])
    sur2 = CUBICHERMITE(S2)([c1,c2,[0,0,-Rag],[0,0,Rag]])
    out1 = MAP(sur1)(domain)
    out2 = MAP(sur2)(domainR)
    out = STRUCT([out1, out2])
    return out

def closetube(Rag,rag):
    c1 = CUBICHERMITE(S1)([[Rag,0,0],[rag,0,0],[0,0,Rag],[0,0,-Rag]])
    ci = CUBICHERMITE(S1)([[Rag,0,0],[rag,0,0],[0,-Rag/4.0*3.0,0],[0,Rag/4.0*3.0,0]])
    c2 = CUBICHERMITE(S1)([[Rag,0,0],[rag,0,0],[0,0,-Rag],[0,0,Rag]])
    sur1 = CUBICHERMITE(S2)([c1,ci,[0,-rag/2,0],[0,0,-rag/2]])
    sur2 = CUBICHERMITE(S2)([c2,ci,[0,-rag/2,0],[0,0,rag/2]])
    out1 = MAP(sur1)(domainR)
    out2 = MAP(sur2)(domain)
    out = STRUCT([out1, out2])
    return out

def tuboAnglat(Rag,rag,leng,lar) :      
    c1 = CUBICHERMITE(S1)([[Rag+leng/2,0,0],[-Rag-leng/2,0,0],[0,4*(Rag+lar),0],[0,-4*(Rag+lar),0]])
    c2 = CUBICHERMITE(S1)([[rag+leng/2,0,0],[-rag-leng/2,0,0],[0,4*(rag+lar),0],[0,-4*(rag+lar),0]])
    sur1 = CUBICHERMITE(S2)([c1,c2,[0,0,Rag],[0,0,-Rag]])
    sur2 = CUBICHERMITE(S2)([c1,c2,[0,0,-Rag],[0,0,Rag]])
    out1 = MAP(sur1)(domainR)
    out2 = MAP(sur2)(domain)
    out = STRUCT([out1, out2])
    return out

rotdom = S([2])(2*PI)(MAP([S2,S1])(GRID([20,20])))
rotdomR = S([2])(2*PI)(GRID([20,20]))
lp = 2     #larghezza palo
h = 150    #altezza
hpo = 90  #altezza portaombrello

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
    profile = BEZIER(S1)([[lp,0,20],[9,0,21],[18,0,18],[15,0,16],[15,0,16],[18,0,-30],
                                [40,0,-10],[32,0,10],[37,0,30],[40,0,30],[40,0,30],[32,0,0]])
    mapping = ROTATIONALSURFACE(profile)
    base1 = MAP(mapping)(rotdomR)
    base2 = COLOR(col)( R([3,2])(PI)( arc(2*PI, 0, 32) ))
    profile = BEZIER(S1)([[37,0,22],[45,0,25],[37,0,18]]) #bordino
    mapping = ROTATIONALSURFACE(profile)
    base3 = MAP(mapping)(rotdomR)
    base = COLOR(col)( R([3,2])(PI/2)( STRUCT([ base1,base2,base3 ])))
    return S([1,2,3])([0.75,1,0.75])(base)

def portaombrelli(hpo,col):
    Rag = 2
    rag = Rag/2
    leng = 50
    lar = 25
    offset = 10
    #  tubo esterno
    c1 = CUBICHERMITE(S1)([[Rag+leng/2+rag,offset,0],[-Rag-leng/2-rag,offset,0],[-lar,3*lar,0],[-lar,-3*lar,0]])
    c2 = CUBICHERMITE(S1)([[rag+leng/2+rag,offset-0.5,0],[-rag-leng/2-rag,offset-0.5,0],[-lar,2.8*lar,0],[-lar,-2.8*lar,0]])
    sur1 = CUBICHERMITE(S2)([c1,c2,[0,0,Rag],[0,0,-Rag]])
    sur2 = CUBICHERMITE(S2)([c1,c2,[0,0,-Rag],[0,0,Rag]])
    out1 = MAP(sur1)(domainR)
    out2 = MAP(sur2)(domain)
    tube = STRUCT([out1,out2])
    etube = tubo(Rag*1.1,rag*1.1,3)
    ctube = T([1])([3])(R([1,2])(PI/2) ( closetube(Rag*1.1,rag*1.1)))
    endtube = T([1,2])([0.9+leng/2,offset-0.7]) ( R([2,1])(PI/2.5) (STRUCT([etube, ctube])))
    tuboesterno = STRUCT([tube,endtube])
    #  tubo esterno
    c1 = CUBICHERMITE(S1)([[-(Rag+leng/2+rag),offset,0],[0,-rag/2,0],[0,-1.5*lar,0],[2*lar,0,0]])
    c2 = CUBICHERMITE(S1)([[-(rag+leng/2+rag),offset,0],[0,rag/2,0],[0,-1.3*lar,0],[2*lar,0,0]])
    sur1 = CUBICHERMITE(S2)([c1,c2,[0,0,Rag],[0,0,-Rag]])
    sur2 = CUBICHERMITE(S2)([c1,c2,[0,0,-Rag],[0,0,Rag]])
    out1 = MAP(sur1)(domainR)
    out2 = MAP(sur2)(domain)
    tubointerno = STRUCT([out1,out2])
    #  tube R
    tubi = T([2])([0.5])(STRUCT([tubointerno,tuboesterno]))
    portaombrelli = COLOR(col)( T([2])([hpo])( R([2,3])(PI/2)(STRUCT([ tubi, R([1,2])(PI) (tubi) ]))))
    return portaombrelli

def servopluvio(lp,h,hpo,col):
    servopluvio = STRUCT([  punta(lp,h,col), palo(lp,h,col), base(lp,col), portaombrelli(hpo,col)   ])
    return servopluvio

VIEW(servopluvio(lp,h,hpo,nero))