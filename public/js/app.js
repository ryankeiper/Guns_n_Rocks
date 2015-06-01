var canvas = document.getElementById('canvas1'),
ctx;


if(canvas.getContext){
	draw();
} else {
	alert("We're sorry, your browser does not support this page, please upgrade to the newest version before continuing");
}

function draw() {
	ctx = canvas.getContext('2d');
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	console.log("drawn!");
}


$(document).ready(function(){
	$(document).trigger("content:loaded");
});

$(document).on("content:loaded", function(){
	
});