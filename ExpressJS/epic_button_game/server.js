// Import all the necessary modules
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser")
var util = require("util");
var port = process.env.PORT || 8010;
var button_press_count = 0;

// Create the express app
var app = express();

/*--------- bodyParser ---------*/
// support json encoded bodies
app.use(bodyParser.json()); 
// support encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

// Define the static folder.
app.use(express.static(path.join(__dirname, './static')));

// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

/*--------- Root Route ---------*/
app.get('/', function(req, res) {
	res.render('index');
});

/*--------- Port listening ---------*/
var server = app.listen(port, function() {
	console.log("Server started! Listening at http://localhost:" + port);
});

/*--------- Socket.io ---------*/
// Create the IO object we will use to control our sockets.
var io = require('socket.io').listen(server);

// Setting up the connection event with the io.socket.on() callback.
io.sockets.on('connection', function(socket) {
	console.log("Client/Socket is connected!");
	console.log("Client/Socket ID is: ", socket.id);

	// Listening for client event "epic_button_clicked"
	socket.on('epic_button_clicked', function(data) {
		console.log("A client clicked the button! Reason: " + data.reason);
		button_press_count += 1;
		console.log("The count is now: ", button_press_count)
		// Respond to the epic_button_clicked event
		socket.emit("server_response_to_epic", {update: button_press_count});
	});

	socket.on('reset_button_clicked', function(data) {
		console.log("A client clicked the button! Reason: " + data.reason);
		button_press_count = 0;
		console.log("The count is now: ", button_press_count)
		// Respond to the epic_button_clicked event
		socket.emit("server_response_to_reset", {reset: button_press_count});
	});

}) 