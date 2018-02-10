// Load the express module
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");

// Var to keep track of how many times '/' has been visited.
var visitor_count ;
var my_session;

// Invoke var express and store the resulting application in a var app
var app = express();

// Setting up the session secret for cookie handling
app.use(session({secret: 'ThisisSuperSecret'}));

// Using body-parser
app.use(bodyParser.urlencoded({extended: true}));

// Using static folder for all images, css, etc.
app.use(express.static(__dirname + "/static"));
console.log("__dirname is: ", __dirname)

// Sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');

// Sets the view engine so that express knows that we are using ejs as the templating Engine
app.set('view engine', 'ejs');

// ***  ROUTES *** //
// lets handle the base route "/" and respond with a "Hello Express"
app.get('/', function(request, response) {
	if ( isNaN(request.session.visitor_count) ) {
		request.session.visitor_count = 0;
	} else { 
		request.session.visitor_count += 1;
	}
	
	console.log("request.session: ", request.session) 
	// This is how we used to say hello, no index.html rendering.
	//response.send("<h1>Hello Express</h1>");
	response.render('index', {visitor_count: request.session.visitor_count});	
});

app.post('/add_two', function(request, response) {
	request.session.visitor_count += 1
	console.log("request.session.visitor_count: ", request.session.visitor_count)
	
	response.redirect('/');
});

app.post('/reset', function(request, response) {
	request.session.visitor_count = 0;
	console.log("request.session.visitor_count: ", request.session.visitor_count)
	
	response.redirect('/');
});

// Serving this route using EJS
app.get('/users', function(request, response){
	// hard-coded user data
	var users_array = [
		{name: "Michael", email: "michael@codingdojo.com"},
		{name: "Jay", email: "jay@codingdojo.com"},
		{name: "Brendan", email: "brendan@codingdojo.com"},
		{name: "Andrew", email: "andrew@codingdojo.com"},
	];
	// Passing the users java script object
	response.render('users', {users: users_array});
});

// To test this out:
// Add a button on the view that sends a request to "/users/1".
app.get("/users/:id", function(req, res){
	console.log("The user requested is: ", req.params.id)
	// just to illustrate that req.params is usable here:
	res.send("You requested the user with id: " + req.params.id);
	// code to get the user from the db goes here, etc.
});

// Route to process new user form data:
app.post('/users', function(req, res){
	console.log("POST DATA\n\n", req.body)
	res.redirect('/')
});

// tell the express app to listen on port 7010
app.listen(7010, function() {
	console.log("listening on port 7010!")
})
