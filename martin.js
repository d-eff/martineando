//to hold the objs
var objs = new Array();

//img initialization
var imageObj = new Image();
imageObj.src = "Spin.png";
var spinImg = new Image();
spinImg.src = "Head3.png";
var chompOpenImg = new Image();
chompOpenImg.src = "MChompOpen.png";
var chompCloseImg = new Image()
chompCloseImg.src = "MChompClosed.png";
var chompArray = [chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg,chompCloseImg, chompOpenImg,chompOpenImg, chompOpenImg,chompOpenImg, chompOpenImg,chompOpenImg,chompOpenImg,chompOpenImg, chompOpenImg,chompOpenImg, chompOpenImg,chompOpenImg];
var beerImg = new Image();
beerImg.src = "beer.png";
var popImg = new Image();
popImg.src = "popup.png";

var canvas;
var ctx;
var interval = 1000/60;
var strobeSpeed = 19;
var strobeCount = 1;

var beers = new Array();

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


function Popup(){
	this.cx = canvas.width - popImg.width;
	this.cy = canvas.height;
	this.dy = -1;

	var update = false;
	var pauseCount = 1;

	this.update = function() {

		if(pauseCount % 190 == 0)
		{
			update = true;
			pauseCount++;
		}

		if(update)
			this.cy += this.dy;
		else
			pauseCount++;
		
		if(update && (this.cy == canvas.height - popImg.height || this.cy == canvas.height))
		{
			update = false;
			this.dy*=-1;
		} 

		
	}
	this.draw = function() {
		ctx.drawImage(popImg, this.cx, this.cy);
	}
}

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


	this.beerCount = -50;
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
	     		
	     		break;
	     		case 1: 
	     			this.dx = 0;
	     			this.dy = 1;
	     			this.deg = 90;
	     	
	     		break;
				case 2:
	     			this.dx = -1;
	     			this.dy = 0;
	     			this.deg = 180;
	 
	     		break;
	     		case 3: 
	     			this.dx = 0;
	     			this.dy = -1;
	     			this.deg = 270;
	     			
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
		var shouldChomp = this.chomp%24;
	
		ctx.save();
		ctx.translate(this.cx, this.cy);
		ctx.rotate(this.deg * Math.PI/180);
		ctx.drawImage(chompArray[shouldChomp], -chompArray[shouldChomp].width/2, -chompArray[shouldChomp].height/2);
		ctx.restore();
	}

	this.spawnBeer = function(x, y){
		var beer = new Beer(x,y);
		//console.log("spawning beer at: " + x + "," + y);
		beers.push(beer);

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
		ctx.drawImage(spinImg, -spinImg.width/2, -spinImg.height/2);
		ctx.restore();
	}
}

function Walker(startX, startY) {
	this.cx = startX;
	this.cy = startY;
	this.dx = 0;
	this.dy = 1;
	this.update = function(){
	    if(this.cx == 0 && this.cy <= (-imageObj.height/2)+5){
	        this.dx = 0;
	        this.dy = 1;          
	    } else if(this.cx == 0 && this.cy >= canvas.height - (imageObj.height/2)-5) {
	        this.dx = 1;
	        this.dy = 0;    
	    } else if(this.cx == canvas.width - imageObj.width && this.cy >= canvas.height - (imageObj.height/2)-5) {
	    	this.dx = 0;
	    	this.dy = -1;  
	    } else if(this.cx == canvas.width - imageObj.width && this.cy <= (-imageObj.height/2)+5){
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

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	//load some in
	for(var x = canvas.width/8; x < canvas.width; x += canvas.width/8)
	{
		for(var y = canvas.height/8; y < canvas.height; y+= canvas.height/8)
		{
			spinner = new Spinner(x,y);
			objs.push(spinner);
		}
	}
	for(var i = 0; i < 200; i++)
	{
		bouncer = new Bouncer(Math.floor(Math.random()*(canvas.width*.9)), Math.floor(Math.random()*(canvas.height*.9)), Math.floor(Math.random()*20+1));
		objs.push(bouncer);
	}

	var chomp = new Pacman(100, 100);
	var walker = new Walker(0,0);
	var pop = new Popup();

	var walk2 = new Walker(canvas.width - imageObj.width, (-imageObj.height/2)+5);
	var walk3 = new Walker(0, canvas.height - (imageObj.height/2)-5);
	var walk4 = new Walker(canvas.width - imageObj.width, canvas.height - (imageObj.height/2)-5);

	objs.push(walker);
	objs.push(walk2);
	objs.push(walk3);
	objs.push(walk4);
	objs.push(chomp);
	objs.push(pop);

	draw();

};

document.onkeydown = function(e) {
	console.log(e.keyCode);


}

function addBouncer(){
	thing = new Bouncer(50,50,50);
	objs.push(thing);
}

function slowDown() {
	strobeSpeed += 10;
}
function speedUp() {
	if(strobeSpeed >= 10)
		strobeSpeed-=10;
}


function draw() {
	requestAnimationFrame(draw);
	for(var i = 0; i < objs.length; i++)
		objs[i].update();
	    
	ctx.clearRect(0,0,canvas.width, canvas.height);
	if(strobeCount % strobeSpeed == 0) {
		var bkgd = '#' + Math.floor(Math.random()*16777215+1).toString(16);
		document.body.style.background = bkgd;
	}	  
	ctx.strokeStyle = "FFFFFF";  
	ctx.font = "Impact";

	for(var j = 0; j < objs.length; j++)
	    objs[j].draw();
	strobeCount++;
}

