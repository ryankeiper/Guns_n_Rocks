var game = function(){

	var canvas = document.getElementById('canvas1');
	var ctx = canvas.getContext('2d');

	if(!canvas || !ctx){
		alert("We're sorry, your browser does not support this page, please upgrade to the newest version before continuing");
		return;
	}

	const GAME_STATE_TITLE = 0;
	const GAME_STATE_NEW_LEVEL = 1;
	const GAME_STATE_GAME_OVER = 2;

	var player = {};
	player.width = 20;
	player.height = 20;
	player.halfW = 10;
	player.halfH = 10;
	player.rotationalVelocity = 7;
	player.acceleration = .2;
	player.maxSpeed = 8;
	player.thrust = 0;
	player.laserDelay = 5;
	
	var rotation = 0;
	var x = window.innerWidth/2;
	var y = window.innerHeight/2;

	var facingX = 0;
	var facingY = 0;
	var movingX = 0;
	var movingY = 0;
	
	var keyPressList = [];


	var render = function(){
		ctx.canvas.width  = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
	}

	var gameFrame = function(){

		if(keyPressList[38] == true){
			var radians = (rotation - 90) * Math.PI/180;
			facingX = Math.cos(radians);
			facingY = Math.sin(radians);

			var movingXNew = movingX + player.acceleration * facingX;
			var movingYNew = movingY + player.acceleration * facingY;

			var currentSpeed = Math.sqrt((movingXNew*movingXNew) + (movingYNew*movingYNew));

			if(currentSpeed < player.maxSpeed){
				movingX += player.acceleration * facingX;
				movingY += player.acceleration * facingY;
			}

			player.thrust = 1;
		} else {
			player.thrust = 0;
		}

		if(keyPressList[37] == true){
			rotation -= player.rotationalVelocity;
		}

		if(keyPressList[39] == true){
			rotation += player.rotationalVelocity;
		}

		x += movingX;
		y += movingY;
		
		render();

		var radians = rotation * Math.PI/180;
		ctx.save();
		ctx.setTransform(1,0,0,1,0,0);

		ctx.translate(x+player.halfW,y+player.halfH);
		ctx.rotate(radians);

		ship();
		thrusters();

		ctx.restore();
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
	    if(player.thrust == 1){
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





