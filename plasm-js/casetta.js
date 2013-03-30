// muri
// davanti
var points = [[0,0],[2,0],[2,4],[4,4],[4,0],[6,0],[6,8],[0,8]];
var cells = [[0,1,2,7],[2,3,6,7],[3,4,5,6]]
var davanti = SIMPLICIAL_COMPLEX(points)(cells);

// laterali
var points = [[0,0],[10,0],[10,8],[0,8],[2,4],[4,4],[4,6],[2,6],[6,4],[8,4],[8,6],[6,6]];
var cells = [[0,1,4,9],[1,2,9,10],[2,3,7,10],[0,3,4,7],[5,6,8,11]]
var laterale = SIMPLICIAL_COMPLEX(points)(cells);

var laterale_sx = R([0,2])(PI/2)(laterale);
var laterale_dx = T([0])([6])(laterale_sx);

// dietro
var points = [[0,0],[6,0],[6,8],[0,8]];
var cells = [[0,1,2,3]]
var dietro = T([2])([-10])(SIMPLICIAL_COMPLEX(points)(cells));

var muri = COLOR([1,0,0])(STRUCT([davanti, laterale_sx, laterale_dx, dietro]));

// tetto
var points = [[0,0],[6,0],[3,3]];
var cells = [[0,1,2]]
var tetto2D = SIMPLICIAL_COMPLEX(points)(cells);
var tetto = EXTRUDE([10])(tetto2D);
tetto = COLOR([0.7,0.4,0])(T([1,2])([8,-10])(tetto));

var casa_template = STRUCT([muri, tetto]);

// porta
var points = [[2,4],[4,4],[2,0],[4,0]];
var cells = [[0,1,2,3]]
var porta = COLOR([0.7,0.4,0])(SIMPLICIAL_COMPLEX(points)(cells));

// finestre
var points = [[2,4],[4,4],[4,6],[2,6]];
var cells = [[0,1,2,3]]
var finestra = COLOR([0,0.7,1])(SIMPLICIAL_COMPLEX(points)(cells));

var finestra1_sx = R([0,2])(PI/2)(finestra);
var finestra1_dx = T([0])([6])(finestra1_sx);
var finestra2_sx = T([1,2])([0,-4])(finestra1_sx);
var finestra2_dx = T([0])([6])(finestra2_sx);

var casa = STRUCT([casa_template, porta, finestra1_sx, finestra1_dx, finestra2_sx, finestra2_dx]);

// prato
var prato = COLOR([0,1,0])(CUBOID([40,0,40]));
prato = T([0,2])([-16,-25])(prato)

DRAW(STRUCT([casa, prato]));
