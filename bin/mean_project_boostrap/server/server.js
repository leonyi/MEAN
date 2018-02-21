// Require all the necessary modules
var express 	= require('express');
var bodyParser 	= require('body-parser');
var mongoose 	= require('mongoose');
var path 	= require("path");
var morgan     	= require('morgan');
var port 	= process.env.PORT || 8020; 

// Set debug level
mongoose.set('debug', true);

// Instantiate an express app
var app = express();

/*--------- bodyParser ---------*/
// support json encoded bodies
app.use(bodyParser.json()); 
// support encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

/*--------- Static Folder ---------*/
app.use(express.static(path.join(__dirname, './client/static')));

// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

/*--------- Mongoose Config ---------*/
require('./server/config/mongoose.js');

/*--------- Routes Config ---------*/
require('./server/config/routes.js')(app);

/*--------- Port listening ---------*/
var server = app.listen(port, function() {
	console.log("Server started! Listening at http://localhost:" + port)
});
