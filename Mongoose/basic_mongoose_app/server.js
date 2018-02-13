// Require all the necessary modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require("path");
var port = process.env.PORT || 9010

// Instantiate an express app
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

/*--------- Routes ---------*/
// Root Request // 
app.get('/', function(req, res) {
	User.find({}, function(err, users) {
		if(err){
			consoloe.log("Something went wrong retrieving the users from the DB.")
		} else {
			console.log("Successfully retrieved all users:", users);
			res.render('index', { data: users } );
		}
	})
});

// User Request
// Use native promises
mongoose.Promise = global.Promise;

app.post('/users', function(req, res) {
	console.log("POST DATA", req.body);
	// Create a new User with the name and age corresponding to those from the req.body
	var user = new User({name: req.body.name, age: req.body.age});

	// Try to save the new user to the database (this is the method that actually inserts into the db) and run a callback function with an error
	// (if any) from the operation.
	user.save(function(err) {
		// if there is an error console.log that something went wrong
		if(err) {
			console.log("Something went wrong!");
		} else {
			console.log("Susccessfully added the new user!");
			res.redirect("/");
		}
	})
})

/*--------- Port listening ---------*/
var server = app.listen(port, function() {
	console.log("Server started! Listening at http://localhost:" + port)
});

/*--------- Connecting to the DB ---------*/
mongoose.connect('mongodb://localhost/basic_mongoose');

// Creating the Mongoose Schema //
// Schema object constructor.  
// Other schema types at http://mongoosejs.com/docs/schematypes.html.
var UserSchema = new mongoose.Schema( {
	name: String,
	age: Number
})
// Creates the blueprint object and, in turn, creates the necessary database
// collection out of the model.
mongoose.model('User', UserSchema); // Setting this Schema in our Models as 'User'
var User = mongoose.model('User')   // Retrieving this Schema from our Models, named 'User'

