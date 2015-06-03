var game = function(){

	var canvas = document.getElementById('canvas1');
	var ctx = canvas.getContext('2d');

	if(!canvas || !ctx){
		alert("We're sorry, your browser does not support this page, please upgrade to the newest version before continuing");
		return;
	}

	const GAME_STATE_TITLE = 0;
	const GAME_STATE_NEW_GAME = 1;
	const GAME_STATE_NEW_LEVEL = 2;
	const GAME_STATE_PLAYER_START = 3;
	const GAME_STATE_PLAY_LEVEL = 4;
	const GAME_STATE_PLAYER_DIE = 5;
	const GAME_STATE_GAME_OVER = 6;

	var currentGameState = 0;
	var currentGameStateFunction = null;

	function Player() {
		this.width = 20;
		this.height = 20;
		this.halfW = 10;
		this.halfH = 10;
		this.rotationalVelocity = 7;
		this.acceleration = .2;
		this.thrust = 0;
		this.laserDelay = 10;
		this.sinceLastLaser = 10;
		this.lasers = [];
		this.x = window.innerWidth/2;
		this.y = window.innerHeight/2;
		this.rotation = 0;
		this.facingX = 0;
		this.facingY = 0;
		this.movingX = 0;
		this.movingY = 0;
	};

	function NewLaser(){
		this.dx = 10*Math.cos(Math.PI*(player1.rotation-90)/180);
		this.dy = 10*Math.sin(Math.PI*(player1.rotation-90)/180);
		this.x = player1.x+player1.halfW-2;
		this.y = player1.y+player1.halfH-2;
		this.life = 30;
		this.width = 4;
		this.height = 4;
	}

	var player1 = new Player();
	
	var keyPressList = [];

	var opening = false;
	var gameOver = false;

	var score = 0;
	var level = 0;
	var playerShips = 3;

	var xMin = 0;
	var xMax = window.innerWidth;
	var yMin = 0;
	var yMax = window.innerHeight;

	var scoreBigRock = 100;
	var scoreMedRock = 150;
	var scoreSmallRock = 200;
	var maxRockSpeedByLevel = 1;

	const BIG_ROCK = 1;
	const MED_ROCK = 2;
	const SMALL_ROCK = 3;

	var players = [];
	var rocks = [];
	var particles = [];

	var render = function(){
		ctx.canvas.width  = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
	}

	var gameFrame = function(){

		if(keyPressList[38] == true){
			var radians = (player1.rotation - 90) * Math.PI/180;
			facingX = Math.cos(radians);
			facingY = Math.sin(radians);

			player1.movingX += player1.acceleration * facingX;
			player1.movingY += player1.acceleration * facingY;

			player1.thrust = 1;
		} else {
			player1.thrust = 0;
		}

		if(keyPressList[37] == true){
			player1.rotation -= player1.rotationalVelocity;
		}

		if(keyPressList[39] == true){
			player1.rotation += player1.rotationalVelocity;
		}

		if(keyPressList[32] == true){
			if(player1.sinceLastLaser >= player1.laserDelay){
				fireLasers();
			}
		}

		player1.x += player1.movingX;
		player1.y += player1.movingY;

		if(player1.x > xMax){
			player1.x = -player1.width;
		} else if(player1.x < -player1.width) {
			player1.x = xMax;
		}

		if(player1.y > yMax){
			player1.y = -player1.height;
		} else if(player1.y < -player1.height) {
			player1.y = yMax;
		}
		
		render();
		updateLasers();
		renderLasers();

		var radians = player1.rotation * Math.PI/180;
		ctx.save();
		ctx.setTransform(1,0,0,1,0,0);

		ctx.translate(player1.x+player1.halfW,player1.y+player1.halfH);
		ctx.rotate(radians);

		ship();
		thrusters();

		ctx.restore();
		player1.sinceLastLaser++;
	}

	var ship = function(){
		// Ship
		ctx.beginPath();
		ctx.moveTo(0,-10);
		ctx.lineTo(9,9);
		ctx.lineTo(0,-1);
		ctx.lineTo(-1,-1);
		ctx.lineTo(-10,9);
		ctx.lineTo(-1,-10);
		ctx.closePath();
	    ctx.lineWidth = 1;
	    ctx.fillStyle = '#8ED6FF';
	    ctx.fill();
	    ctx.strokeStyle = 'blue';
	    ctx.stroke();
	}
	var thrusters = function(){
	    // Exhaust
	    if(player1.thrust == 1){
		    var my_gradient=ctx.createLinearGradient(-2,3,-2,18);
			my_gradient.addColorStop(0,"black");
			my_gradient.addColorStop(0.2,"red");
			my_gradient.addColorStop(1,"white");
			ctx.beginPath();
			ctx.strokeStyle=my_gradient;
			ctx.moveTo(-3, 3);
			ctx.lineTo(-3, 10);
			ctx.moveTo(-2, 3);
			ctx.lineTo(-2, 14);
			ctx.moveTo(-1, 3);
			ctx.lineTo(-1, 18);
			ctx.moveTo(0, 3);
			ctx.lineTo(0, 18);
			ctx.moveTo(1, 3);
			ctx.lineTo(1, 14);
			ctx.moveTo(2, 3);
			ctx.lineTo(2, 10);
			ctx.stroke();
			ctx.closePath();
		}
	}

	var fireLasers = function(){
		var newLaser = new NewLaser();
		player1.lasers.push(newLaser);
		player1.sinceLastLaser = 0;
		console.log(newLaser.x, newLaser.y, player1.x, player1.y);
		console.log(player1.lasers);
	}

	var updateLasers = function(){
		for(var i in player1.lasers){
			var laser = player1.lasers[i];
			laser.life--;
			if(laser.x > window.innerWidth + laser.width || laser.x < -laser.width || laser.y > window.innerHeight + laser.height || laser.y < -laser.height || laser.life <= 0){
				player1.lasers.splice(i, 1);
			} else {
				laser.x += laser.dx;
				laser.y += laser.dy;
			}
		}
	}

	var renderLasers = function(){
		for(var i in player1.lasers){
			var laser = player1.lasers[i];
			ctx.fillStyle = "#67C8FF";
			ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
		}
	}

	const FRAME_RATE = 30;
	var intervalLength = 1000/FRAME_RATE;

	setInterval(gameFrame, intervalLength);

	document.onkeydown = function(e){
		e = e ? e : window.event;
		keyPressList[e.keyCode] = true;
	};

	document.onkeyup = function(e){
		e = e ? e : window.event;
		keyPressList[e.keyCode] = false;
	}

}

$(document).ready(function(){

	game();

});





