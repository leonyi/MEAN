// Require all the necessary modules
const mongoose = require('mongoose'),
      path = require('path'),
      fs = require('fs')

/*--------- Connecting to the DB ---------*/
mongoose.connect('mongodb://localhost/qoutes');
 
// Reference to models folder
var models_path = path.join(__dirname, '../models');

// Read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file) {
	if(file.indexOf('.js') >= 0){
		// Require the file (this runs the model file which registers the schema)
		require(models_path + '/' + file);
	}
})



