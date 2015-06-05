function NewLaser(player){
	this.dx = 10*Math.cos(Math.PI*(player.rotation)/180);
	this.dy = 10*Math.sin(Math.PI*(player.rotation)/180);
	this.x = player.x+player.halfW-2;
	this.y = player.y+player.halfH-2;
	this.life = 30;
	this.width = 4;
	this.height = 4;
}

NewLaser.fireLasers = function(player){
	var newLaser = new NewLaser(player);
	player.lasers.push(newLaser);
	player.sinceLastLaser = 0;
}

NewLaser.updateLasers = function(players){
	for(var i in players){	
		for(var j in players[i].lasers){
			var laser = players[i].lasers[j];
			laser.life--;
			if(laser.x > window.innerWidth + laser.width || laser.x < -laser.width || laser.y > window.innerHeight + laser.height || laser.y < -laser.height || laser.life <= 0){
				players[i].lasers.splice(i, 1);
			} else {
				laser.x += laser.dx;
				laser.y += laser.dy;
			}
		}
	}
}

NewLaser.renderLasers = function(players, ctx){
	for(var i in players){
		for(var j in players[i].lasers){
			var laser = players[i].lasers[j];
			ctx.fillStyle = players[i].laserColor;
			ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
		}
	}
}




