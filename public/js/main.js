var socket = io();

var game = function(){

	var canvas = document.getElementById('canvas1');
	var ctx = canvas.getContext('2d');

	if(!canvas || !ctx){
		alert("We're sorry, your browser does not support this page, please upgrade to the newest version before continuing");
		return;
	}

	var player = new Player(window.innerWidth*1/6, window.innerHeight*1/6, 45, '#8ED6FF','blue', "#67C8FF");
	var player2 = new Player(window.innerWidth*5/6, window.innerHeight*1/6, 135, '#FF6666','#8B0000', "#FF2400");

	var xMin = 0;
	var xMax = window.innerWidth;
	var yMin = 0;
	var yMax = window.innerHeight;
	ctx.globalAlpha = 1;
	alpha = 0;

	var players = [player, player2];
	var shards = [];

	var render = function(){
		ctx.canvas.width  = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
	}

	var gameFrame = function(){
		ctx.globalAlpha = 1;
		Player.checkInputs(player, player2);

		Player.updatePlayer(player, xMax, yMax);
		if(players[1]){ Player.updatePlayer(players[1], xMax, yMax); }
		if(shards.length > 0){
			for(var i in shards){
				shards[i].x += shards[i].dx;
				shards[i].y += shards[i].dy;
			}
		}

		render();
		NewLaser.updateLasers(player);
		NewLaser.renderLasers(player, ctx);
		if(players[1]){
			NewLaser.updateLasers(players[1]);
			NewLaser.renderLasers(players[1], ctx);
		}
		ctx.globalAlpha = alpha;
		Player.renderPlayer(player, ctx);
		if(players[1]){ Player.renderPlayer(players[1], ctx); }
		if(alpha <= 1) alpha += .01;
		testForCollisions(players);
	}

	const FRAME_RATE = 30;
	var intervalLength = 1000/FRAME_RATE;

	setInterval(gameFrame, intervalLength);

	document.onkeydown = function(e){
		e = e ? e : window.event;
		socket.emit('keydown', e.keyCode);
	};

	document.onkeyup = function(e){
		e = e ? e : window.event;
		socket.emit('keyup', e.keyCode);
	}
	socket.on('keydown', function(code){
		player.keyPressList[code] = true;
	});
	socket.on('keyup', function(code){
		player.keyPressList[code] = false;
	});

}

$(document).ready(function(){
	game();

});





