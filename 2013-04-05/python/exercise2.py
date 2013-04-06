dom2D = PROD([INTERVALS(2*PI)(24), INTERVALS(1)(1)]);

def arc(dom):
    a,r=dom
    return [r*COS(a),r*SIN(a)]

c = MAP(arc)(dom2D);

#Floor0
access = GRID([[-5,16.75],[-47.5,12.5],[-6,1]]);
living_room = GRID([[-21.75,(50+11.5+10)],[-22.5,37.5],[-6,1]]);

room0 = GRID([[-21.75,10],[-15,7.5],[-6,1]]);
curve = R([1,2])(3*PI)((PROD([c(5),Q(1)])));
room_curve = T([1,2,3])([21.75+5, 15, 6])(curve);
room = STRUCT([room0, room_curve]);

bathroom0 = GRID([[-(21.75+50+11.5+10), 10],[-40,20],[-6,1]]);
curve1 =  R([1,2])(3.0/2.0*PI)(PROD([c(10),Q(1)]));
bathroom_curve = T([1,2,3])([93.25+10, 50, 6])(curve1);
bathroom = STRUCT([bathroom0, bathroom_curve]);

floor0 = STRUCT([access,living_room, room, bathroom]);
VIEW(floor0)

#Floor1

room0 = GRID([[-5, 16.75, -60, 37],[-5, 45+12.5],[-height-7, 1]]);
room1 = GRID([[-21.75, 60],[-5,20,-15, 10 ,-10,2.5],[-height-7, 1]]);
room2 = GRID([[-21.75, 45],[-25,15],[-height-7, 1]]);
room3 = GRID([[-74, 10],[-35,6],[-height-7, 1]]);
room = STRUCT([room0, room1,room2,room3]);

balcony = GRID([[5],[-47.5, 12.5, -7],[-height-7, 1]]);
floor1 = STRUCT([balcony, room]);
VIEW(floor1)

#Floor2
room0 = GRID([[-5, 16.75, -60, 37],[-5, 45+12.5],[-2*height-8, 1]]);
room1 = GRID([[-21.75, 60],[-5,45,-10,2.5],[-2*height-8, 1]]);
floor2 = STRUCT([room0, room1]);
VIEW(floor2)

#Floor3
room0 = GRID([[-5, 2.5, -51.87, 2.5, -30, 26.88],[-5, 42.5+12.5],[-3*height-9, 1]]);
room1 = GRID([[-61.87, 30],[-5,45,-10,2.5],[-3*height-9, 1]]);
room2 = GRID([[-5, 113.75],[-5,2.5,-52.5,2.5],[-3*height-9, 1]]);
floor3 = STRUCT([room0, room1, room2]);
VIEW(floor3)
