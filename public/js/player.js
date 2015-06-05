function Player(x, y, rotation, fill, outline, laserColor, id) {
	this.id = id;
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
	this.shardColor = outline;
	this.laserColor = laserColor;
	this.health = 3;
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

Player.toJSON = function(player){
	return {
		id: player.id,
		thrust: player.thrust,
		sinceLastLaser: player.sinceLastLaser,
		x: player.x,
		y: player.y,
		lasers: player.lasers,
		rotation: player.rotation,
		facingX: player.facingX,
		facingY: player.facingY,
		movingX: player.movingX,
		movingY: player.movingY,
		health: player.health,
		keyPressList: player.keyPressList
	}
}

Player.takeServerData = function(players, serverData){
	for(var i = 0; i < players.length; i++){
		for(var j = 0; j < serverData.length; j++){
			if(players[i].id = serverData[j].id){
				players[i].thrust = serverData[j].thrust;
				players[i].sinceLastLaser = serverData[j].sinceLastLaser;
				players[i].x = serverData[j].x;
				players[i].y = serverData[j].y;
				players[i].lasers = serverData[j].lasers;
				players[i].rotation = serverData[j].rotation;
				players[i].facingX = serverData[j].facingX;
				players[i].facingY = serverData[j].facingY;
				players[i].movingX = serverData[j].movingX;
				players[i].movingY = serverData[j].movingY;
				players[i].health = serverData[j].health;
				players[i].keyPressList = serverData[j].keyPressList;
			}
		}
	}
}

Player.checkInputs = function(players){
	for(var i = 0; i < players.length; i++){	
		if(players[i].keyPressList[38] == true){
			var radians = (players[i].rotation) * Math.PI/180;
			players[i].facingX = Math.cos(radians);
			players[i].facingY = Math.sin(radians);

			players[i].movingX += players[i].acceleration * players[i].facingX;
			players[i].movingY += players[i].acceleration * players[i].facingY;

			players[i].thrust = 1;
		} else {
			players[i].thrust = 0;
		}

		if(players[i].keyPressList[37] == true){
			players[i].rotation -= players[i].rotationalVelocity;
		}

		if(players[i].keyPressList[39] == true){
			players[i].rotation += players[i].rotationalVelocity;
		}

		if(players[i].keyPressList[32] == true){
			if(players[i].sinceLastLaser >= players[i].laserDelay){
				NewLaser.fireLasers(players[i]);
			}
		}
	}
};

Player.updatePlayer = function(players, xMax, yMax){
	for(var i = 0; i < players.length; i++){
		players[i].x += players[i].movingX;
		players[i].y += players[i].movingY;

		if(players[i].x > xMax){
			players[i].x = -players[i].width;
		} else if(players[i].x < -players[i].width) {
			players[i].x = xMax;
		}

		if(players[i].y > yMax){
			players[i].y = -players[i].height;
		} else if(players[i].y < -players[i].height) {
			players[i].y = yMax;
		}
	}
};

Player.renderPlayer = function(players, ctx){
	for(var i = 0; i < players.length; i++){
		var radians = players[i].rotation * Math.PI/180;
		ctx.save();
		ctx.setTransform(1,0,0,1,0,0);

		ctx.translate(players[i].x+players[i].halfW,players[i].y+players[i].halfH);
		ctx.rotate(radians);

		players[i].ship(ctx);
		players[i].thrusters(ctx);

		ctx.restore();
		players[i].sinceLastLaser++;
	}
}


