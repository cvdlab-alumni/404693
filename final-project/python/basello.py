#	Final Project
#	Davide Razzino - 404693
#	Basello
#	Achille Castiglioni

from pyplasm import *

def arc (alpha, r, R) : 
	dom2D = PROD([INTERVALS(alpha)(36), DIFFERENCE([INTERVALS(R)(1),INTERVALS(r)(1)])])
	def mapping (v) : 
		a = v[0]
		r = v[1]
		return [r*COS(a), r*SIN(a)]		
	model = MAP(mapping)(dom2D)
	return model

h = 45*1.5			#altezza
larg = 65*1.5		#larghezza
prof = 30*1.5		#profondita'
sp = 3*1.5			#spessore
nero = [0,0,0]
darkgrey = [0.2,0.2,0.2]
bianco = [1,1,1]
rot = PI/3

def basello(col,rot):
	pianosup = T([3])([h-sp])(CUBOID([larg,prof,sp]))
	pianosuplat = T([1])([larg-sp])(CUBOID([sp,prof,h]))
	basup = COLOR(col)(T([1,2])([-larg/5,-prof/2])(STRUCT([pianosup, pianosuplat])))

	cilindro = COLOR(nero)(T([3])([h/2-0.1])( PROD([arc(2*PI, 0, sp),Q(h/2+0.2)]) ))

	pianoinf = T([3])([h/2])(CUBOID([larg-2*sp,prof,sp]))
	pil1 = T([1])([larg-3*sp])(CUBOID([sp,prof,h/2]))
	pil2 = CUBOID([sp,prof,h/2])
	basdw = COLOR(col)(T([1,2])([-larg/5,-prof/2])(STRUCT([pianoinf,pil1,pil2])))

	basello = STRUCT([basup,R([1,2])(rot)(basdw),cilindro])
	return basello



VIEW(basello(darkgrey,rot))