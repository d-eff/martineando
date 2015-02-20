var objs = new Array();
	var imageObj = new Image();
	imageObj.src = "middle-finger.png";
	var canvas;
	var ctx;
	var chompOpenImg = new Image();
	var chompCloseImg = new Image()
	chompOpenImg.src = "middle-fingerL.png";
	chompCloseImg.src = "middle-fingerR.png";
	var chompArray = [chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg, chompOpenImg,chompOpenImg, chompOpenImg,chompOpenImg, chompOpenImg,chompOpenImg,chompOpenImg,chompOpenImg, chompOpenImg,chompOpenImg, chompOpenImg,chompOpenImg];
	var lwImg = new Image();
	lwImg.src = "middle-finger.jpg";

function Bouncer(startX, startY, startRad) {
    this.cx = startX;
    this.cy = startY;
    this.dx = Math.floor(Math.random()*3+1);
    this.dy = Math.floor(Math.random()*3+1);
    this.rad = startRad;
}
Bouncer.prototype.update = function() {
         if(this.cx >= canvas.width - imageObj.width)
             this.dx = Math.floor(Math.random()*-3);
        if(this.cx <= 0) 
            this.dx = Math.floor(Math.random()*3+1);
         if(this.cy >= canvas.height - imageObj.height)
             this.dy = Math.floor(Math.random()*-3);
         if(this.cy <= 0)
             this.dy = Math.floor(Math.random()*3+1);
        this.cx += this.dx;
        this.cy += this.dy;
}
Bouncer.prototype.draw = function() {
        ctx.fillStyle = "000000";
        ctx.beginPath();
        //ctx.arc(this.cx, this.cy, this.rad, 0, 2*Math.PI, false);
        ctx.drawImage(imageObj, this.cx, this.cy);
        ctx.closePath();
        ctx.fill();
}

function Pacman(startX, startY){     
	this.cx = startX;     
	this.cy = startY
	this.chomp = 0; 
} 
Pacman.prototype.update = function() {
     this.chomp++; 

 }
Pacman.prototype.draw = function(){
	var shouldChomp = this.chomp%24;
	// 	console.log(shouldChomp);
	ctx.drawImage(chompArray[(shouldChomp)], this.cx, this.cy); 
}


function Spinner(startX, startY) {
    this.cx = startX;
    this.cy = startY;
    this.deg = 0;
}
Spinner.prototype.update = function() {
        this.deg += 5;
}
Spinner.prototype.draw = function() {
        ctx.save();
        //ctx.fillStyle="000000";
        ctx.translate(this.cx, this.cy);
        ctx.rotate(this.deg * Math.PI/180);
        //ctx.fillRect(-10,-10,20,20);
        ctx.drawImage(imageObj, -imageObj.width/2, -imageObj.height/2);
        ctx.restore();
}

window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');

	var walker = {
	    cx: 0,
	    cy: 0,
	    dx: 0,
	    dy: 1,
	    rad: 10,
	    startDeg: 1.5*Math.PI,
	    endDeg: Math.PI/2,
	    update: function(){
	        if(this.cx == 0 && this.cy <= -imageObj.height/2){
	            this.dx = 0;
	            this.dy = 1;
	            this.startDeg = 1.5*Math.PI;
	            this.endDeg =  Math.PI/2;            
	        } else if(this.cx == 0 && this.cy >= canvas.height - (imageObj.height/2)) {
	             this.dx = 1;
	             this.dy = 0;
	            this.startDeg = Math.PI;
	            this.endDeg = 0;          
	        } else if(this.cx == canvas.width - imageObj.width && this.cy >= canvas.height - imageObj.height/2) {
	              this.dx = 0;
	             this.dy = -1;
	            this.startDeg = Math.PI/2;
	            this.endDeg = 1.5*Math.PI;     
	        } else if(this.cx == canvas.width - imageObj.width && this.cy <= -imageObj.height/2){
	            this.dx = -1;
	             this.dy = 0;
	            this.startDeg = 0;
	            this.endDeg = Math.PI;
	        }     
	        
	        this.cx += this.dx;
	        this.cy += this.dy;  
	        //console.log(this.cx + " " + this.cy);


	    },
	    draw: function(){
	        ctx.fillStyle="000000";
	        ctx.beginPath();
	      //ctx.arc(this.cx,this.cy,this.rad,this.startDeg,this.endDeg,false);
	      ctx.drawImage(imageObj, this.cx, this.cy);
	        ctx.closePath();
	        ctx.fill();    
	    }
	};

	var bouncer = new Bouncer(11,11,10);
	var bouncer2 = new Bouncer(11,289,10);
	var bouncer3 = new Bouncer(289,11,20);
	var bouncer4  = new Bouncer(289,289,15);
	var spinner1 = new Spinner(50,50);
	var spinner3 = new Spinner(200,50);
	var spinner4 = new Spinner(200,200);
	var spinner2 = new Spinner(50,200);
	var chomp = new Pacman(500, 500);

	objs.push(walker);
	objs.push(bouncer);
	objs.push(bouncer2);
	objs.push(bouncer3);
	objs.push(bouncer4);
	objs.push(spinner1);
	objs.push(spinner2);
	objs.push(spinner3);
	objs.push(spinner4);
	objs.push(chomp);

	setInterval(function(){

	for(var i = 0; i < objs.length; i++)
	    objs[i].update();
	    
	ctx.clearRect(0,0,canvas.width, canvas.height);
	var bkgd = Math.floor(Math.random()*16777215+1).toString(16);
	//var bkgd = "282828";
	ctx.fillStyle = bkgd;
	ctx.fillRect(0,0,canvas.width,canvas.height);
	    
	for(var j = 0; j < objs.length; j++)
	    objs[j].draw();

	}, 10);
};

function addBouncer(){
	thing = new Bouncer(50,50,50);
	objs.push(thing);
}



