var socket = io();
var player;
var players = [];

socket.on('playerProfile', function(playerProfile){
	console.log(playerProfile);
	if(player == undefined){
		player = new Player(window.innerWidth * playerProfile.width, window.innerHeight * playerProfile.height, playerProfile.rotation, playerProfile.fill, playerProfile.outline, playerProfile.laserColor, playerProfile.id);
		players.push(player);
		socket.emit('player', Player.toJSON(player));
	}
});

socket.on('profiles', function(profiles){
	for(var i = 0; i < profiles.length; i++){
		var newPlayer = new Player(window.innerWidth * profiles[i].width, window.innerHeight * profiles[i].height, profiles[i].rotation, profiles[i].fill, profiles[i].outline, profiles[i].laserColor, profiles[i].id);
		if(players.length < 4 && newPlayer.id != player.id){
			players.push(newPlayer);
		}
	}
});

socket.on('playerDisconnect', function(id){
	for(var i = 0; i < players.length; i++){
		if(players[i].id == id){
			players.splice(i, 1);
		}
	};
});

var game = function(){


	var canvas = document.getElementById('canvas1');
	var ctx = canvas.getContext('2d');
	ctx.globalAlpha = 1;
	var alpha = 0;

	if(!canvas || !ctx){
		alert("We're sorry, your browser does not support this page, please upgrade to the newest version before continuing");
		return;
	}

	var xMin = 0;
	var xMax = window.innerWidth;
	var yMin = 0;
	var yMax = window.innerHeight;

	var shards = [];

	var render = function(){
		ctx.canvas.width  = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
	}

	var gameFrame = function(){
		socket.emit('playerRound', Player.toJSON(player));
		socket.on('players', function(serverData){
			Player.takeServerData(players, serverData);
		});
		ctx.globalAlpha = 1;
		Player.checkInputs(players);

		Player.updatePlayer(players, xMax, yMax);
		
		if(shards.length > 0){
			for(var i in shards){
				shards[i].x += shards[i].dx;
				shards[i].y += shards[i].dy;
			}
		}

		render();
		NewLaser.updateLasers(players);
		NewLaser.renderLasers(players, ctx);
		
		ctx.globalAlpha = alpha;
		Player.renderPlayer(players, ctx);
		
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
	};

	// socket.on('players', function(playerKeys){
	// 	for(var i = 0; i < players.length; i++){
	// 		for(var j = 0; j < playerKeys.length; j++){
	// 			if(players[i].id == playerKeys[j].id){
	// 				players[i].keyPressList = playerKeys[j].keyPressList;
	// 				console.log("working!");
	// 			}
	// 		}
	// 	}
	// })
}

$(document).ready(function(){
	game();

});





