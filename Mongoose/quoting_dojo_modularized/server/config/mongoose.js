// Require all the necessary modules
var mongoose = require('mongoose');

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