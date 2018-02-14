// Require all the necessary modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require("path");
var port = process.env.PORT || 8000

// Instantiate an express app
var app = express();

/*--------- bodyParser ---------*/
// support json encoded bodies
app.use(bodyParser.json()); 
// support encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

/*--------- Static Folder ---------*/
app.use(express.static(path.join(__dirname, './static')));

// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*--------- Routes ---------*/
// Root Request // 
app.get('/', function(req, res) {
	res.render('index');
});

// Other Requests
app.post('/quotes', function(req, res) {
	let quote = new Quote({quote: req.body.quote, poster: req.body.name});

	console.log("FULL POST DATA: Quote Submitted!", req.body);
	console.log("DATA ADDED to DB: ", quote)
	// Create a new quote with the name of the poster and corresponding quote content.

	// Try to save the new quote to the database (this is the method that inserts into the db).
	// It also runs a callback function with an error (if any) from the operation.
	quote.save(function(err) {
		// If there is san error let's spit it out on the terminal.
		if(err) {
			console.log("Something went wrong while saving the new entries: ", err)
		} else {
			console.log("Successfully added the new entry: ", quote);
				res.redirect('/get_quotes')
		}
	})
})

app.get('/get_quotes', function(req, res) {
	console.log("GET DATA: Show all the quotes!", req.body);
	// Code to retrieve data from the DB.  createdAt

	// Quote.find({}, function(err, quotes) {
	Quote.find({}).sort('-createdAt').exec(function(err, quotes) {
		if(err) {
			console.log("Something went wrong while retrieving data from the database: ", err);
		} else{
			console.log("Successfully retrieved all quotes: ", quotes)
			res.render('quotes', {data: quotes})
		}
	})
});

/*--------- Port listening ---------*/
var server = app.listen(port, function() {
	console.log("Server started! Listening at http://localhost:" + port)
});

/*--------- Connecting to the DB ---------*/
mongoose.connect('mongodb://localhost/qoutes');

// Creating the Mongoose Schea //
// Schema object constructor //
var QuoteSchema = new mongoose.Schema( {
		poster: String,
		quote: String
	},
	{ timestamps: true }
)

// Creates the blueprint object and, in turn, creates the necessary database collection
// out of the model.
mongoose.model('Quote', QuoteSchema);   // Setting this Schema in our Models as 'Quote'
var Quote = mongoose.model('Quote')     // Retrieving this Schema from our Models, named 'Quote'