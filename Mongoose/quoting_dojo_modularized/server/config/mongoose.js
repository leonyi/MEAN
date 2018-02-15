// Require all the necessary modules
const mongoose = require('mongoose'),
      path = require('path'),
      fs = require('fs')


// Create a variable that points to the models folder
var models_path = path.join(__dirname, '../models');

// Read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file) {
	if(file.indexOf('.js') >= 0){
		// Require the file (this runs the model file which registers the schema)
		require(models_path + '/' + file);
	}
})

/*--------- Connecting to the DB ---------*/
mongoose.connect('mongodb://localhost/qoutes');

// Creating the Mongoose Schea //
// Schema object constructor //
// This can also go under models/quotes.js
var QuoteSchema = new mongoose.Schema( {
	 // quote: {type: String, required: true, minlength:10},
	 // poster: {type: String, required: true},
  	 // }, {timestamps: true })
		poster: String,
		quote: String
	}, { timestamps: true }
)

