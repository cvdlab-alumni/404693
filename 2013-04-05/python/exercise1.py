from pyplasm import *

#pyplasm Utility function
GRID = COMP([INSR(PROD),AA(QUOTE)]);

#Variables
pillar_length = 2.7;
round_pillarRad = pillar_length/2.0;
pillar_height = 23;

#Foundation
foundations = GRID([[125],[67],[5]]);

#Pillars floor0
round_pillar = CYLINDER([round_pillarRad, pillar_height])(60);

square_pillars0 = GRID([[-18.75, pillar_length, -11.25, pillar_length, -25, pillar_length, -25, pillar_length, -32.5], [-47.5, pillar_length, -17], [-7, pillar_height]]);
round_pillars0_firstRow = STRUCT(NN(5)([(T([1, 2, 3])([5 + round_pillarRad, 5 + round_pillarRad, 7])(round_pillar)), T([1])([pillar_length + 25])]));
round_pillars0_secondRow = STRUCT(NN(2)([(T([1, 2, 3])([5 + round_pillarRad, 47.5 + round_pillarRad, 7])(round_pillar)), T([1])([pillar_length + 107.5])]));
round_pillars0 = STRUCT([round_pillars0_firstRow, round_pillars0_secondRow]);
pillars0 = STRUCT([square_pillars0, round_pillars0]);

#Pillars floor1
square_pillars1 = GRID([[-5, pillar_length, -25, pillar_length, -25, pillar_length, -50 - pillar_length, pillar_length, -5], [-5, pillar_length, -40, pillar_length, -17], [-7 - pillar_height - 1, pillar_height]]);
square_pillar = GRID([[-87.5, pillar_length, -32.5], [-5, pillar_length, -40 - pillar_length - 17], [-7 - pillar_height - 1, pillar_height]]);
round_pillars1 = T([1, 2, 3])([87.5 + round_pillarRad, 47.5 + round_pillarRad, 7 + pillar_height + 1])(round_pillar);
pillars1 = STRUCT([square_pillars1, square_pillar, round_pillars1]);

#Pillars floor2
pillars2_firstRow = GRID([[-5, pillar_length, -25, pillar_length, -80, pillar_length, -5], [-5, pillar_length, -40 - pillar_length - 17], [-7 - 2*pillar_height - 2, pillar_height]]);
pillars2_secondRow = GRID([[-5, pillar_length, -25, pillar_length, -25, pillar_length, -25, pillar_length, -25, pillar_length, -5], [-47.5, pillar_length, - 17], [-7 - 2*pillar_height - 2, pillar_height]]);
pillars2 = STRUCT([pillars2_firstRow, pillars2_secondRow]);

#Pillars floor3
pillars3_firstRow = GRID([[-60, pillar_length, -52.5, pillar_length, -5], [-5, pillar_length, -40 - pillar_length - 17], [-7 - 3*pillar_height - 3, pillar_height]]);
pillars3_secondRow = GRID([[-5, pillar_length, -25, pillar_length, -25, pillar_length, -25, pillar_length, -25, pillar_length, -5], [-47.5, pillar_length, - 17], [-7 - 3*pillar_height - 3, pillar_height]]);
pillars3 = STRUCT([pillars3_firstRow, pillars3_secondRow]);

#View
building = STRUCT([foundations, pillars0, pillars1, pillars2, pillars3]);
VIEW(building);
