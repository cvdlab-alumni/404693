#   Davide Razzino
#   Exercise 2
#   Pseudo 3D model of Bugatti Veyron


from pyplasm import *

def scoccaL()   :
    dom = INTERVALS(1)(24)
#   SOTTO
    curve0 = MAP(BEZIER(S1)([[8.5,0,0],[8.5,3,0],[4.75,3,0],[4.75,0,0]]))(dom)
    p1 = MAP(BEZIER(S1)([[11.5,0,0],[8.5,0,0]]))(dom)
    mg = MAP(BEZIER(S1)([[4.75,0,0],[-6,0,0]]))(dom)
    curve1 = MAP(BEZIER(S1)([[-6,0,0],[-6,3,0],[-10,3,0],[-10,0,0]]))(dom)
#   FRONTALE
    f1 = MAP(BEZIER(S1)([[11.5,0,0],[11.4,-0.3,0],[11.5,2,0],[10.75,2.5,0]]))(dom)
    f2 = MAP(BEZIER(S1)([[10.75,2.5,0], [9.7,3,0], [9,3,0]])) (dom)
    p2 = MAP(BEZIER(S1)([[9,3,0], [8.5,3.6,0],[5,4,0]])) (dom)
    pb = MAP(BEZIER(S1)([[5,4,0], [1.5,5.6,0], [-1,5.6,0]])) (dom)
#   TETTO e RETRO
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
#   LATERALE
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
#   TETTO
    m1 = MAP(BEZIER(S1)([[0,5.6, 2.5],[0,6, 1.6],[0,5.6, 1.5]]))(dom)
    m2 = MAP(BEZIER(S1)([[0,5.6,-2.5],[0,6,-1.6],[0,5.6,-1.5]]))(dom)
    tt = MAP(BEZIER(S1)([[0,5.6, 1.5],[0,5.7, 0],[0,5.6, -1.5]]))(dom)

    scocca = STRUCT([curve, p1, p2, p3, p4, l1, l2, l3, l4, l5, l6, m1, m2, tt])
    return scocca

def scoccaS()   :
    dom = INTERVALS(1)(24)
#   FRONTE
    front = MAP(BEZIER(S1)([[10.5,0,-4.5],[12,0,-1],[12,0,1.5],[10.5,0,4.5]])) (dom)
    p1 = MAP(BEZIER(S1)([[9, 0, -5.5], [10, 0, -5], [10.5,0,-4.5]]))(dom)
    p2 = MAP(BEZIER(S1)([[9,0,5.5],[10,0,5.5],[10.5,0,4.5]]))(dom)
#   LATERALE
    r1 = MAP(BEZIER(S1)([[9,0,-5.5], [9, 0, -4.65], [5,0,-5.5]]))(dom)
    r2 = MAP(BEZIER(S1)([[9,0,5.5], [9, 0, 5.15], [5,0,5.5]]))(dom)
    l1 = MAP(BEZIER(S1)([[5,0,-5.5], [5, 0, -4.65], [-6,0,-5.5]]))(dom)
    l2 = MAP(BEZIER(S1)([[5,0,5.5],[5, 0, 5.15], [-6,0,5.5]]))(dom)
    r3 = MAP(BEZIER(S1)([[-6,0,-5.5], [-6, 0, -4.75], [-10.5,0,-5.5]]))(dom)
    r4 = MAP(BEZIER(S1)([[-6,0,5.5], [-6, 0, 5.25], [-10.5,0,5.5]]))(dom)
#   RETRO
    p3 = MAP(BEZIER(S1)([[-10.5, 0, -5.5], [-11, 0, -5], [-11,0,-3.5],[-11.5,0,-3.5]]))(dom)
    p4 = MAP(BEZIER(S1)([[-10.5,0,5.5],[-11,0,5.5],[-11,0,4],[-11.5,0,3.5]]))(dom)
    bk = MAP(BEZIER(S1)([[-11.5,0,-3.5],[-12,0,0],[-11.5,0,3.5]]))(dom)

    scocca = STRUCT([front, p1, p2, r1, r2, l1, l2, r3, r4, p3, p4, bk])
    return scocca

def pseudo3D()  :
    return STRUCT([T([3])([0.1])(scoccaF()), scoccaL() ,scoccaS()])

VIEW(pseudo3D())