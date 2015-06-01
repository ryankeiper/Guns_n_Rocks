var canvas = require('./models/canvas.js');

$(document).ready(function(){
	$(document).trigger("content:loaded");
});

$(document).on("content:loaded", function(){
	if(canvas.ctx){
		canvas.draw();
	} else {
		alert("We're sorry, your browser does not support this page, please upgrade to the newest version before continuing");
	}
});