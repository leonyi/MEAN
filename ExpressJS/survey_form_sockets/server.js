// Import express and path modules.
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var port = process.env.PORT || 7010
var util = require("util");

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
app.set('view engine', 'ejs');

/*--------- Root Route ---------*/
app.get('/', function(req, res) {
	res.render('index');
});

/*--------- Helper Functions ---------*/
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

/*--------- Port listening ---------*/
var server = app.listen(port, function() {
	console.log("Server started! Listening at http://localhost:" + port)
});

/*--------- Socket.io ---------*/

// Create the IO object we will user to control our sockets.
var io = require('socket.io').listen(server);

// Setting up the connection event with the io.socket.on() callback.
io.sockets.on('connection', function(socket) {
	console.log("Client/Socket is connected!");
	console.log("Client/Socket ID is: ", socket.id );

	// Listening for client event "posting_form".
	socket.on('posting_form', function(data) {
		console.log('The client emitted the following information to the server: ' + util.inspect(data, {showHidden: false, depth: null}))

		// Responding to the posting_form event with "updated_message"
		socket.emit('updated_message', data)
	});

	// Random Number Emission
	socket.on('random_number', function(data) {
		console.log('The client requested a random number generation! Reason: ' + data.reason)
		var lucky_number = getRandomInt(1, 1001)
		console.log("Server generated random number: ", lucky_number)
	 	socket.emit('random_number', {response: lucky_number});
	});


})