// Import exprss and path modules.
var express = require("express");
var path = require("path");
var port = process.env.PORT || 7010

// Create the express app.
var app = express();

// Define the static folder.
app.use(express.static(path.join(__dirname, './static')));

// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Root route to render the index.ejs views.
app.get('/', function(req, res) {
	res.render("index");
});

// Start the Node server listening on port 8000
// app.listen(port, function() {
// 	console.log("Server started! Listening at http://localhost:' + port)")
// })

// Now listening with sockets
var server = app.listen(port, function() {
	console.log("Server started! Listening at At http://localhost:" + port);
});

// Create io object we will use to control our sockets.
var io = require('socket.io').listen(server);

// Setting up the connection event with the io.socket.on() callback.
io.sockets.on('connection', function(socket) {
	console.log("Client/socket is connected!");
	console.log("Client/socket id is: ", socket.id);

	// All other server socket code goes here:
	socket.on( "button_clicked", function (data){
	    console.log( 'Someone clicked a button!  Reason: '  + data.reason);
	    socket.emit( 'server_response', {response:  "sockets are the best!"});
	});

	// Examples of the three types of emits:
	// // EMIT:
	// socket.emit('my_emit_event');
	// // BROADCAST:
	// socket.broadcast.emit('my_broadcast_event');
	// // FULL BROADCAST:
	// io.emit("my_full_broadcast_event");
})


