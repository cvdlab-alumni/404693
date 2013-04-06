//plasm.js Utility function for convert
T = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });

  return function (values) {
    return function (object) {
     return object.clone().translate(dims, values);
    };
  };
};
  
R = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });
   
  return function (angle) {
    return function (object) {
      return object.clone().rotate(dims, angle);
    };
  };
};
  
S = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });

  return function (values) {
    return function (object) {
      return object.clone().scale(dims, values);
    };
  };
};

S3 = S2;
S2 = S1;
S1 = S0;

GRID = SIMPLEX_GRID;

NN = REPLICA;

VIEW = DRAW;


// Variables
var pillar_length = 2.5;
var round_pillarRad = pillar_length/2.0;
var pillar_height = 23;

//Foundation
var foundations = GRID([[120],[67],[-1,5]]);

//Pillars floor0
var round_pillar = EXTRUDE([pillar_height])(DISK(round_pillarRad)([60, 2]));

var square_pillars0 = GRID([[-18.75, pillar_length, -11.25, pillar_length, -25, pillar_length, -25, pillar_length, -32.5], [-47.5, pillar_length, -15], [-7, pillar_height]]);
var round_pillars0_firstRow = STRUCT(NN(5)([(T([1, 2, 3])([5 + round_pillarRad, 5 + round_pillarRad, 7])(round_pillar)), T([1])([pillar_length + 25])]));
var round_pillars0_secondRow = STRUCT(NN(2)([(T([1, 2, 3])([5 + round_pillarRad, 47.5 + round_pillarRad, 7])(round_pillar)), T([1])([pillar_length + 107.5])]));
var round_pillars0 = STRUCT([round_pillars0_firstRow, round_pillars0_secondRow]);
var pillars0 = STRUCT([square_pillars0, round_pillars0]);

// Pillars floor1
var square_pillars1 = GRID([[-5, pillar_length, -25, pillar_length, -25, pillar_length, -50 - pillar_length, pillar_length, -5], [-5, pillar_length, -40, pillar_length, -15], [-7 - pillar_height - 1, pillar_height]]);
var square_pillar = GRID([[-87.5, pillar_length, -32.5], [-5, pillar_length, -40 - pillar_length - 5], [-7 - pillar_height - 1, pillar_height]]);
var round_pillars1 = T([1, 2, 3])([87.5 + round_pillarRad, 47.5 + round_pillarRad, 7 + pillar_height + 1])(round_pillar);
var pillars1 = STRUCT([square_pillars1, square_pillar, round_pillars1]);

// Pillars floor2
var pillars2_firstRow = GRID([[-5, pillar_length, -25, pillar_length, -80, pillar_length, -5], [-5, pillar_length, -40 - pillar_length - 5], [-7 - 2*pillar_height - 2, pillar_height]]);
var pillars2_secondRow = GRID([[-5, pillar_length, -25, pillar_length, -25, pillar_length, -25, pillar_length, -25, pillar_length, -5], [-47.5, pillar_length, - 15], [-7 - 2*pillar_height - 2, pillar_height]]);
var pillars2 = STRUCT([pillars2_firstRow, pillars2_secondRow]);

// Pillars floor3
var pillars3_firstRow = GRID([[-60, pillar_length, -52.5, pillar_length, -5], [-5, pillar_length, -40 - pillar_length - 5], [-7 - 3*pillar_height - 3, pillar_height]]);
var pillars3_secondRow = GRID([[-5, pillar_length, -25, pillar_length, -25, pillar_length, -25, pillar_length, -25, pillar_length, -5], [-47.5, pillar_length, - 5], [-7 - 3*pillar_height - 3, pillar_height]]);
var pillars3 = STRUCT([pillars3_firstRow, pillars3_secondRow]);

// View
var building = STRUCT([foundations, pillars0, pillars1, pillars2, pillars3]);
VIEW(building);
