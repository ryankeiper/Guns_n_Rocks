function Shrapnel(x, y, color) {
	this.dx = Math.random()*3;
	this.dy = Math.random()*3;
	this.color = color;
	this.life = Math.floor(Math.random()*30);
	this.x = x;
	this.y = y;
}

var hit = function(x, y, numShards){

}

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
	if(players.length > 1) {
		for(var i = 0; i < players.length; i++){
			for(var j = 0; j < players.length; j++){
				if(collisionCheck(players[i], players[j]) && j != i){
					console.log("Players collided!")
					players[i].health = 0;
					players[j].health = 0;
				}
			};
		};
	}
	if(players.length > 1){
		for(var i = 0; i < players.length; i++){
			for(var j = 0; j < players.length; j++){
				for(var k = 0; k < players[i].lasers.length; k++){
					if(collisionCheck(players[i].lasers[k], players[j]) && j != i){
						console.log("Player", i+1, "shot Player", j+1, "!");
						players[i].lasers.splice(i, 1);
						players[j].health--;
					}					
				}
			}
		}
	}
}

