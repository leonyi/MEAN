// Load the necessary modules
var express = require("express");
var bodyParser = require("body-parser");
var port = process.env.PORT || 7010

// Instantiate an express app
var app = express();

//<< ****** Using bodyParser ******>>//
// support json encoded bodies
app.use(bodyParser.json()); 
// support encoded bodies
app.use(bodyParser.urlencoded({extended: true}));


// Using static folder for all images, css, etc.
app.use(express.static(__dirname + "/static"));
console.log("__dirname is: ", __dirname)

// Sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');

// Sets the view engine so that express knows that we are using ejs as the templating Engine
app.set('view engine', 'ejs');

//<<****** ROUTES ******>>//
app.get('/', function(request, response) {
	response.render('index');
});

app.post('/result', function(request, response) {
	var data = {
		"dojo_location": request.body.geo_location,
		"favorite_lang": request.body.prog_language,
		"comment": request.body.commentinput
	}
	response.render('results', data);
});



//<<****** SettingUp the Port to Listen On ******>>//
app.listen(port, function() {
	console.log('Server started! At http://localhost:' + port)
});
