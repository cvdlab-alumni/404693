#	Final Project
#	Davide Razzino - 404693
#	Servonotte
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
lp = 2;     #larghezza palo
h = 200;    #altezza
hpp = 125;  #altezza portapantaloni
hs = 175;   #altezza stampella

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

def pp(hpp,col):
    lar = 44 #larghezza del portapantaloni
    Rag = 2
    rag = 1
    tubi = STRUCT(NN(3)([T([1,2,3])([-lar/2,hpp,-5.5])( tubo(Rag,rag,lar) ), T([3])([8])]))
    ang1 = T([1,2,3])([lar/2,hpp+1.5,6.5])( R([1,3])(PI/2)( R([2,3])(PI/2*3)(tuboAnglat(Rag,rag,5.1,1)))    )
    ang = STRUCT([ ang1, T([3])([5])( R([1,3])(PI)(ang1) ) ])
    e1 = STRUCT([ T([1,2,3])([lar/2+1,hpp+1.5,-4])(R([2,3])(-PI/2)(tuboAng(Rag,rag))), 
                        T([1,2,3])([lar/2+2.5,hpp,-4])( R([1,3])(PI/2)(tubo(Rag,rag,0.5))),
                        T([1,2,3])([lar/2,hpp,-5.5])( R([1,3])(0)(tubo(Rag,rag,1))),
                            T([1,2,3])([lar/2+1,hpp+1.5,-3.5])( R([2,3])(-PI/2)(closetube(Rag,rag))) ])
    e2 = T([3])([5])( R([1,3])(PI)(e1) )
    portapantaloni = COLOR(col)( STRUCT([ tubi, ang, e1, e2 ]) )
    return T([2])([2*hpp])(R([1,2])(PI)(portapantaloni))

def stampella(hs,col):
    lar = 65
    leng = 50
    Rag = 2
    rag = 1
    #  bottom
    c1 = CUBICHERMITE(S1)([[Rag+leng/2,0,0],[-Rag-leng/2,0,0],[-Rag*3,-Rag*3,0],[-Rag*3,Rag*3,0]])
    c2 = CUBICHERMITE(S1)([[Rag+leng/2,-rag,0],[-Rag-leng/2,-rag,0],[-Rag*3,-Rag*3,0],[-Rag*3,Rag*3,0]])
    sur1 = CUBICHERMITE(S2)([c1,c2,[0,0,-Rag],[0,0,Rag]])
    sur2 = CUBICHERMITE(S2)([c1,c2,[0,0,Rag],[0,0,-Rag]])
    bottom1 = MAP(sur1)(domain)
    bottom2 = MAP(sur2)(domainR)
    bottom = STRUCT([bottom1, bottom2, T([1,2])([leng/2+Rag,-Rag])(tubo(Rag,rag,3)),
                                            T([1,2])([-leng/2-Rag-3,-Rag])(tubo(Rag,rag,3))])
    #  lato
    larg = 3
    c1 = CUBICHERMITE(S1)([[Rag*2,0,0],[-2*Rag,0,0],[0,4*(Rag+larg),0],[-2*(Rag+larg),-4*(Rag+larg),0]])
    c2 = CUBICHERMITE(S1)([[rag+Rag,0,0],[-rag-Rag,0,0],[0,4*(rag+larg),0],[-2*(Rag+larg),-4*(rag+larg),0]])
    sur1 = CUBICHERMITE(S2)([c1,c2,[0,0,Rag],[0,0,-Rag]])
    sur2 = CUBICHERMITE(S2)([c1,c2,[0,0,-Rag],[0,0,Rag]])
    out1 = MAP(sur1)(domainR)
    out2 = MAP(sur2)(domain)
    out = STRUCT([out1, out2])
    l = T([1,2])([leng/2+Rag+3, 3*rag])( R([1,2])(-PI/2)(out))
    l4 = STRUCT([ l, R([1,3])(PI)(l) ])
    #  lato superiore destro
    larg = 10
    c1 = CUBICHERMITE(S1)([[Rag+leng/2+3,6+rag,0],[4*Rag,13+rag,5],[-larg,larg,0],[-larg,0,0]])
    c2 = CUBICHERMITE(S1)([[Rag+leng/2+3,6,0],[4*Rag,13,5],[-larg,larg,0],[-larg,0,0]])
    sur1 = CUBICHERMITE(S2)([c1,c2,[0,0,-Rag],[0,0,Rag]])
    sur2 = CUBICHERMITE(S2)([c1,c2,[0,0,Rag],[0,0,-Rag]])
    ls1 = MAP(sur1)(domain)
    ls2 = MAP(sur2)(domainR)
    lsd = STRUCT([ ls1,ls2 ])
    #lato superiore sinistro
    c1 = CUBICHERMITE(S1)([[-(Rag+leng/2+3),6+rag,0],[-(4*Rag),13+rag,5],[larg,larg,0],[larg,0,0]])
    c2 = CUBICHERMITE(S1)([[-(Rag+leng/2+3),6,0],[-(4*Rag),13,5],[larg,larg,0],[larg,0,0]])
    sur1 = CUBICHERMITE(S2)([c1,c2,[0,0,-Rag],[0,0,Rag]])
    sur2 = CUBICHERMITE(S2)([c1,c2,[0,0,Rag],[0,0,-Rag]])
    ls1 = MAP(sur1)(domainR)
    ls2 = MAP(sur2)(domain)
    lss = STRUCT([ ls1,ls2 ])

    ls4 = STRUCT([ lsd, lss ])
    #  parte supereriore 
    larg = 1
    ps4 = STRUCT([ T([1,2,3])([-(4*Rag),15,5])( R([2,3])(PI)(tuboAngPar(Rag,rag,larg))), 
                        T([1,2,3])([4*Rag,15,5])( R([1,2])(PI)(tuboAngPar(Rag,rag,larg))) ])
    punta = T([2,3])([15,5])(tuboAnglat(Rag,rag,5*Rag,1))

    out = COLOR(col)(STRUCT([ bottom,l4,ls4,ps4,punta ])) 
    return T([2,3])([hs,2.5])(out)

def servonotte(lp,h,hpp,hs,col):
    servonotte = STRUCT([   punta(lp,h,col), palo(lp,h,col), base(lp,col), pp(hpp,col), stampella(hs,col) ])
    return servonotte

VIEW(servonotte(lp,h,hpp,hs,nero))