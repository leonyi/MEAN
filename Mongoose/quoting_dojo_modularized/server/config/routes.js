// Require all the necessary modules
const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      Quote = mongoose.model('Quote') 

module.exports = function(app){
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
}