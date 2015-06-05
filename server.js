var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3000;
var connectionCount = 0;
var player1 = { width: 1/6, height: 1/6, rotation: 45, fill: '#8ED6FF', outline: 'blue', laserColor: "#67C8FF"};
var player2 = { width: 5/6, height: 1/6, rotation: 135, fill: '#FF6666', outline: '#800000', laserColor: "#FF2400"};
var player3 = { width: 1/6, height: 5/6, rotation: -45, fill: '#FFCC11', outline: '#FF8600', laserColor: "#FFE303"};
var player4 = { width: 5/6, height: 5/6, rotation: -135, fill: '#7CFC00', outline: '#458B00', laserColor: "#7FFF00"};
var players = [];
var playerProfiles = [player1, player2, player3, player4];
var profilesInUse = [];
app.use(express.static(__dirname + '/public'));

var contains = function(array, obj) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
}

io.on('connection', function(socket){
	
	for(var i = 0; i < playerProfiles.length; i++){
		if(!contains(profilesInUse, playerProfiles[i])){
			var playerProfile = playerProfiles[i];
			playerProfile.id = socket.id;
			profilesInUse.push(playerProfiles[i]);
			break;
		}
	}

	if(playerProfile != undefined){
		console.log(playerProfile);
		io.to(socket.id).emit('playerProfile', playerProfile);
		socket.emit('profiles', profilesInUse);
	}
	
	socket.on('player', function(newPlayer){
		console.log(newPlayer);
		players.push(newPlayer);
	})

	socket.on('playerRound', function(playerData){
		for(var i = 0; i < players.length; i++){
			if(players[i].id == playerData.id){
				players[i] = playerData;
			}
		}
	});

	console.log('a user connected');
	
	socket.on('disconnect', function(){
	
		for(var i = 0; i < players.length; i++){
			if(players[i].id == socket.id){
				socket.emit('playerDisconnect', players[i].id);
				players.splice(i, 1);
			}
		}
		for(var i = 0; i < profilesInUse.length; i++){
			if(profilesInUse[i].id == socket.id){
				profilesInUse.splice(i, 1);
			}
		}

	    console.log('user disconnected');
	});
	
	socket.on('keydown', function(code){
		for(var i = 0; i < players.length; i++){
			if(players[i].id == socket.id){
				players[i].keyPressList[code] = true;
			}
		}
		socket.emit('players', players);
		console.log(players);
	});
	
	socket.on('keyup', function(code){
		for(var i = 0; i < players.length; i++){
			if(players[i].id == socket.id){
				players[i].keyPressList[code] = false;
			}
		}
		socket.emit('players', players);
	});
});

http.listen(process.env.PORT || port, function(){
	console.log("Listening on port", port);
});