function Point2D (x,y)	{
	this.x = x;
	this.y = y;
}	
function Edge (point1, point2){
	this.vertex1 = point1;
	this.vertex2 = point2;
}

Edge.prototype.length = function() {
	return Math.sqrt(Math.pow(this.vertex1.x - this.vertex2.x, 2) + Math.pow(this.vertex1.y - this.vertex2.y, 2));  
}

function Triangle (e1, e2, e3){
	this.edge1 = e1;
	this.edge2 = e2;
	this.edge3 = e3;
}

 
Triangle.prototype.perimeter = function() {
	return ( this.edge1.length() + this.edge2.length() + this.edge3.length() );
}

Triangle.prototype.area = function(){
	return Math.sqrt( (this.perimeter()/2)*(this.perimeter()/2-this.edge1.length())*(this.perimeter()/2-this.edge2.length())*(this.perimeter()/2-this.edge3.length()));
}
