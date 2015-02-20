//to hold the objs
var objs = new Array();

//img initialization
var imageObj = new Image();
imageObj.src = "head.png";
var chompOpenImg = new Image();
chompOpenImg.src = "chompopen.png";
var chompCloseImg = new Image()
chompCloseImg.src = "chompclose.png";
var chompArray = [chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg, chompOpenImg,chompOpenImg, chompOpenImg,chompOpenImg, chompOpenImg,chompOpenImg,chompOpenImg,chompOpenImg, chompOpenImg,chompOpenImg, chompOpenImg,chompOpenImg];
var beerImg = new Image();
beerImg.src = "beer.png";

var canvas;
var ctx;

function Bouncer(startX, startY, startRad) {
    this.cx = startX;
    this.cy = startY;
    this.dx = Math.floor(Math.random()*3+1);
    this.dy = Math.floor(Math.random()*3+1);
    this.rad = startRad;
	this.update = function() {
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
	this.draw = function() {
	    ctx.drawImage(imageObj, this.cx, this.cy);
	}
}

function Pacman(startX, startY) {     
	this.cx = startX;     
	this.cy = startY
	this.dx = 1;
	this.dy = 0;
	this.chomp = 0; 
	this.deg = 0;
	this.dirCounter = 0;
	this.beers = [];
	this.update = function() {
	    this.chomp++; 
	   
	    if(this.chomp%200 == 0)
	    {
	     	this.dirCounter = Math.floor(Math.random()*3+1);
	     	switch(this.dirCounter % 4){
	     		case 0:
	     			this.dx = 1;
	     			this.dy = 0;
	     			this.deg = 0;
	     			//this.spawnBeer(this.cx + 50, this.cy);
	     		break;
	     		case 1: 
	     			this.dx = 0;
	     			this.dy = 1;
	     			this.deg = 90;
	     			//this.spawnBeer(this.cx, this.cy + 50);
	     		break;
				case 2:
	     			this.dx = -1;
	     			this.dy = 0;
	     			this.deg = 180;
	     			//this.spawnBeer(this.cx - 50, this.cy);
	     		break;
	     		case 3: 
	     			this.dx = 0;
	     			this.dy = -1;
	     			this.deg = 270;
	     			//this.spawnBeer(this.cx, this.cy - 50);
	     		break;
	     	}
	    }

	    if(this.cx < 0){
	    	this.cx = canvas.width;
	    	this.chomp = 0;
	  
	    } else if(this.cx > canvas.width){
	    	this.cx = 0;
	    	this.chomp = 0;
	    }
	    if(this.cy < 0){
	    	this.cy = canvas.height;
	    	this.chomp = 0;
	    	
	    } else if(this.cy > canvas.height){
	    	this.cy = 0;
	    	this.chomp = 0;
	    }

	    this.cx += this.dx;
	    this.cy += this.dy;

	}
	this.draw = function(){
		shouldChomp = this.chomp%24;
	
		ctx.save();
		ctx.translate(this.cx, this.cy);
		ctx.rotate(this.deg * Math.PI/180);
		ctx.drawImage(chompArray[shouldChomp], -chompArray[shouldChomp].width/2, -chompArray[shouldChomp].height/2);
		ctx.restore();
	}
	this.spawnBeer = function(){

	}
}

function Beer(posX, posY) {
	this.cx = posX;
	this.cy = posY;
	this.update = function(){
	}
	this.draw = function() {
		ctx.drawImage(beerImg, this.cx, this.cy);
	}
}

function Spinner(startX, startY) {
    this.cx = startX;
    this.cy = startY;
    this.deg = 0;
    this.update = function() {
    	this.deg += 5;
	}
	this.draw = function() {
		ctx.save();
		ctx.translate(this.cx, this.cy);
		ctx.rotate(this.deg * Math.PI/180);
		ctx.drawImage(imageObj, -imageObj.width/2, -imageObj.height/2);
		ctx.restore();
	}
}

function Walker(startX, startY) {
	this.cx = startX;
	this.cy = startY;
	this.dx = 0;
	this.dy = 1;
	this.update = function(){
	    if(this.cx == 0 && this.cy <= -imageObj.height/2){
	        this.dx = 0;
	        this.dy = 1;          
	    } else if(this.cx == 0 && this.cy >= canvas.height - (imageObj.height/2)) {
	        this.dx = 1;
	        this.dy = 0;    
	    } else if(this.cx == canvas.width - imageObj.width && this.cy >= canvas.height - imageObj.height/2) {
	    	this.dx = 0;
	    	this.dy = -1;  
	    } else if(this.cx == canvas.width - imageObj.width && this.cy <= -imageObj.height/2){
	        this.dx = -1;
	        this.dy = 0;
	    }     
	    this.cx += this.dx;
	    this.cy += this.dy;  
	}
	this.draw = function(){
		ctx.drawImage(imageObj, this.cx, this.cy);
	}
}



window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');

	//load some in
	/*for(var x = canvas.width/10; x < canvas.width; x += canvas.width/10)
	{
		for(var y = canvas.height/10; y < canvas.height; y+= canvas.height/10)
		{
			spinner = new Spinner(x,y);
			objs.push(spinner);
		}

	}
	for(var i = 0; i < 200; i++)
	{
		bouncer = new Bouncer(Math.floor(Math.random()*(canvas.width*.9)), Math.floor(Math.random()*(canvas.height*.9)), Math.floor(Math.random()*20+1));
		objs.push(bouncer);
		//spinner = new Spinner(Math.floor(Math.random()*(canvas.width*.8)+20), Math.floor(Math.random()*(canvas.height*.8)+20));
		//objs.push(spinner);
	}*/

	var chomp = new Pacman(100, 100);
	var walker = new Walker(0,0);

	objs.push(walker);
	objs.push(chomp);


	setInterval(function(){

	for(var i = 0; i < objs.length; i++)
	    objs[i].update();
	    
	ctx.clearRect(0,0,canvas.width, canvas.height);
	//var bkgd = Math.floor(Math.random()*16777215+1).toString(16);
	var bkgd = "999999";
	ctx.fillStyle = bkgd;
	ctx.fillRect(0,0,canvas.width,canvas.height);
	    
	for(var j = 0; j < objs.length; j++)
	    objs[j].draw();

	}, 1000/60);
};

function addBouncer(){
	thing = new Bouncer(50,50,50);
	objs.push(thing);
}



