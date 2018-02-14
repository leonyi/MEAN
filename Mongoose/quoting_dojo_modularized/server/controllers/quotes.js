// Require all the necessary modules
const express = require('express'),
	  router = express.Router()
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      Quote = mongoose.model('Quote'); 

module.exports = {
	// Root Request
	index: function(req, res) {
		res.render('index');
	},

	post: function(req, res) {
		let quote = new Quote({quote: req.body.quote, poster: req.body.name});

		console.log("FULL POST DATA: Quote Submitted!", req.body);
		console.log("DATA ADDED to DB: ", quote)

		quote.save(function(err) {
			if(err) {
				console.log("Something went wrong while saving the new entries: ", err)
			} else {
				console.log("Successfully added the new entry: ", quote);
					res.redirect('/get_quotes')
			}
		})
	}, 

	get: function(req, res) {
		console.log("GET DATA: Show all the quotes!", req.body);

		Quote.find({}).sort('-createdAt').exec(function(err, quotes) {
			if(err) {
				console.log("Something went wrong while retrieving data from the database: ", err);
			} else{
				console.log("Successfully retrieved all quotes: ", quotes)
				res.render('quotes', {data: quotes})
			}
		})
	}
};
