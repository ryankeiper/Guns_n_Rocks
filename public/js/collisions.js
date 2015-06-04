var collisionCheck = function(object1, object2){
	var ob1Top = object1.y;
	var ob1Left = object1.x;
	var ob1Bottom = object1.y + object1.height;
	var ob1Right = object1.x + object1.width;

	var ob2Top = object2.y;
	var ob2Left = object2.x;
	var ob2Bottom = object2.y + object2.height;
	var ob2Right = object2.x + object2.width;

	if(ob1Top > ob2Bottom || ob2Top > ob1Bottom) return false;
	if(ob1Right < ob2Left || ob2Right < ob1Left) return false;

	return true;
}

var testForCollisions = function(players){
	if(collisionCheck(players[0], players[1])){
		console.log("players collided!");
		for(var i in players){
			players[i].health = 0;
			players[i].lives--;
		}
	}
	for(var i in players[0].lasers){
		if(collisionCheck(players[0].lasers[i], players[1])){
			console.log("Player 1 shot Player 2!");
			players[0].lasers.splice(i, 1);
			players[1].health--;
		}
	}
	for(var i in players[1].lasers){
		if(collisionCheck(players[1].lasers[i], players[0])){
			console.log("Player 2 shot Player 1!");
			players[1].lasers.splice(i, 1);
			players[0].health--;
		}
	}
}

