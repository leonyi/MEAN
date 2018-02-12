// Import all the necessary modules.
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");

var util = require("util");
var path = require("path");

var port = process.env.PORT || 8010;

// Data Storage
var userData = {};


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

/*--------- Port listening ---------*/
var server = app.listen(port, function() {
	console.log("Server started! Listening at http://localhost:" + port)
});


/*--------- Socket.io ---------*/
var io = require('socket.io').listen(server);

// 

io.sockets.on('connection', function(socket) {
	console.log("Client/Socket is connected!");
	console.log("Client/Socket ID is: ", socket.id);

	// Listening for new user emission
	socket.on('new_user', function(data) {
	 	console.log("The client sent us a new user: " + util.inspect(data, {showHidden: false, depth: null}));
	 	io.emit("new_user_response", {response: data.user})
	 })
	// app.io.route('new_user', fun(req)) {
	// 	console.log("The client sent us a new user: " + util.inspect(data, {showHidden: false, depth: null}));
	// }

})


