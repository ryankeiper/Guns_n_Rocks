var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3000

app.use(express.static(__dirname + '/public'));

// app.get('/', function(req, res){
// 	res.send('<h1>Hello world</h1>');
// });

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
	    console.log('user disconnected');
	});
	socket.on('keydown', function(code){
		io.emit('keydown', code);
	});
	socket.on('keyup', function(code){
		io.emit('keyup', code);
	});
});

http.listen(process.env.PORT || port, function(){
	console.log("Listening on port", port);
});