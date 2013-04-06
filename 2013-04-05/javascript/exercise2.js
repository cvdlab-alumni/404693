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

//Variables

var height = 23;


//Utility function
function arc(alpha, R, r) {
	var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
	var mapping = function (v)	{
		var a = v[0];
		var r = v[1];
		return [r*COS(a), r*SIN(a)];
	}
	var model = MAP(mapping)(domain);
	return model;
}

//Floor0
var access = GRID([[-5,16.75],[-47.5,12.5],[-6,1]]);
var living_room = GRID([[-21.75,(50+11.5+10)],[-22.5,37.5],[-6,1]]);

var room0 = GRID([[-21.75,10],[-15,7.5],[-6,1]]);
var curve = R([1,2])(3*PI)(EXTRUDE([1])(arc(PI,5,0)));
var room_curve = T([1,2,3])([21.75+5, 15, 6])(curve);
var room = STRUCT([room0, room_curve]);

var bathroom0 = GRID([[-(21.75+50+11.5+10), 10],[-40,20],[-6,1]]);
var curve1 =  R([1,2])(3.0/2.0*PI)(EXTRUDE([1])(arc(PI,10,0)));
var bathroom_curve = T([1,2,3])([93.25+10, 50, 6])(curve1);
var bathroom = STRUCT([bathroom0, bathroom_curve]);

var floor0 = STRUCT([access,living_room, room, bathroom]);
VIEW(floor0)

//Floor1

var room0 = GRID([[-5, 16.75, -60, 37],[-5, 45+12.5],[-height-7, 1]]);
var room1 = GRID([[-21.75, 60],[-5,20,-15, 10 ,-10,2.5],[-height-7, 1]]);
var room2 = GRID([[-21.75, 45],[-25,15],[-height-7, 1]]);
var room3 = GRID([[-74, 10],[-35,6],[-height-7, 1]]);
var room = STRUCT([room0, room1,room2,room3]);

var balcony = GRID([[5],[-47.5, 12.5, -7],[-height-7, 1]]);
var floor1 = STRUCT([balcony, room]);
VIEW(floor1)

//Floor2
var room0 = GRID([[-5, 16.75, -60, 37],[-5, 45+12.5],[-2*height-8, 1]]);
var room1 = GRID([[-21.75, 60],[-5,45,-10,2.5],[-2*height-8, 1]]);
var floor2 = STRUCT([room0, room1]);
VIEW(floor2)

//Floor3
var room0 = GRID([[-5, 2.5, -51.87, 2.5, -30, 26.88],[-5, 42.5+12.5],[-3*height-9, 1]]);
DRAW(room0);
var room1 = GRID([[-61.87, 30],[-5,45,-10,2.5],[-3*height-9, 1]]);
var room2 = GRID([[-5, 113.75],[-5,2.5,-52.5,2.5],[-3*height-9, 1]]);
var floor3 = STRUCT([room0, room1, room2]);
VIEW(floor3)

//Floor4

// View
//var building = STRUCT([floor0, floor1, floor2, floor3]);
//VIEW(building);
