var game = function(){

	var canvas = document.getElementById('canvas1');
	var ctx = canvas.getContext('2d');

	if(!canvas || !ctx){
		alert("We're sorry, your browser does not support this page, please upgrade to the newest version before continuing");
		return;
	}

	var player = new Player(window.innerWidth/2, window.innerHeight*5/6, -90, '#8ED6FF','blue', "#67C8FF");

	var xMin = 0;
	var xMax = window.innerWidth;
	var yMin = 0;
	var yMax = window.innerHeight;

	var players = [];
	var particles = [];

	var render = function(){
		ctx.canvas.width  = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
	}

	var gameFrame = function(){

		Player.checkInputs(player);

		Player.updatePlayer(player, xMax, yMax);
		
		render();
		NewLaser.updateLasers(player);
		NewLaser.renderLasers(player, ctx);

		var radians = player.rotation * Math.PI/180;
		ctx.save();
		ctx.setTransform(1,0,0,1,0,0);

		ctx.translate(player.x+player.halfW,player.y+player.halfH);
		ctx.rotate(radians);

		player.ship(ctx);
		player.thrusters(ctx);

		ctx.restore();
		player.sinceLastLaser++;
	}

	const FRAME_RATE = 30;
	var intervalLength = 1000/FRAME_RATE;

	setInterval(gameFrame, intervalLength);

	document.onkeydown = function(e){
		e = e ? e : window.event;
		player.keyPressList[e.keyCode] = true;
	};

	document.onkeyup = function(e){
		e = e ? e : window.event;
		player.keyPressList[e.keyCode] = false;
	}

}

$(document).ready(function(){

	game();

});





