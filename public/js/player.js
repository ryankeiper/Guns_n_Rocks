function Player(x, y, rotation, fill, outline, laserColor) {
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
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	this.facingX = 0;
	this.facingY = 0;
	this.movingX = 0;
	this.movingY = 0;
	this.laserColor = laserColor;
	this.lives = 3;
	this.score = 0;
	this.allTimeScore = 0;
	this.keyPressList = [];
	
	this.ship = function(ctx){
		// Ship
		ctx.beginPath();
		ctx.moveTo(-10,-10);
		ctx.lineTo(10,0);
		ctx.lineTo(10,1);
		ctx.lineTo(-10,10);
		ctx.lineTo(1,1);
		ctx.lineTo(1,0);
		ctx.lineTo(-10,-10);
		ctx.closePath();
	    ctx.lineWidth = 1;
	    ctx.fillStyle = fill;
	    ctx.fill();
	    ctx.strokeStyle = outline;
	    ctx.stroke();
	};
	
	this.thrusters = function(ctx){
	    // Exhaust
	    if(this.thrust == 1){
		    var my_gradient = ctx.createLinearGradient(-4,-2,-19,-2);
			my_gradient.addColorStop(0,"black");
			my_gradient.addColorStop(0.2,"red");
			my_gradient.addColorStop(1,"white");
			ctx.beginPath();
			ctx.strokeStyle = my_gradient;
			ctx.moveTo(-4, -2);
			ctx.lineTo(-11, -2);
			ctx.moveTo(-4, -1);
			ctx.lineTo(-15, -1);
			ctx.moveTo(-4, 0);
			ctx.lineTo(-19, 0);
			ctx.moveTo(-4, 1);
			ctx.lineTo(-19, 1);
			ctx.moveTo(-4, 2);
			ctx.lineTo(-15, 2);
			ctx.moveTo(-4, 3);
			ctx.lineTo(-11, 3);
			ctx.stroke();
			ctx.closePath();
		}
	};
};

Player.checkInputs = function(player){
	if(player.keyPressList[38] == true){
		var radians = (player.rotation) * Math.PI/180;
		player.facingX = Math.cos(radians);
		player.facingY = Math.sin(radians);

		player.movingX += player.acceleration * player.facingX;
		player.movingY += player.acceleration * player.facingY;

		player.thrust = 1;
	} else {
		player.thrust = 0;
	}

	if(player.keyPressList[37] == true){
		player.rotation -= player.rotationalVelocity;
	}

	if(player.keyPressList[39] == true){
		player.rotation += player.rotationalVelocity;
	}

	if(player.keyPressList[32] == true){
		if(player.sinceLastLaser >= player.laserDelay){
			NewLaser.fireLasers(player);
		}
	}
};

Player.updatePlayer = function(player, xMax, yMax){
	player.x += player.movingX;
	player.y += player.movingY;

	if(player.x > xMax){
		player.x = -player.width;
	} else if(player.x < -player.width) {
		player.x = xMax;
	}

	if(player.y > yMax){
		player.y = -player.height;
	} else if(player.y < -player.height) {
		player.y = yMax;
	}
};