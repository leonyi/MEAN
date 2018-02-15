// Require all the necessary modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var path = require("path");
var port = process.env.PORT || 8020

// Instantiate an express app
var app = express();

/*--------- bodyParser ---------*/
// support json encoded bodies
app.use(bodyParser.json()); 

/*--------- Static Folder ---------*/
app.use(express.static(path.join(__dirname, './static')));

/*--------- Routes ---------*/
// Root Request // 
// Read
app.get('/', function(req, res) {
	Jonser.find({}, function(err, jonsers) {
		if (err){
			console.log("Error retrieving records from the DB: ", err);
			res.json({message: "ERROR", error: err});
		}else {
			console.log("Successfully retrieved all records from the DB: ", jonsers);
			res.json(jonsers);
		}
	});
	
});

// Other Requests
// Create
app.post('/new/:name', function(req, res) {
	console.log("Request to add new user: ", req.params.name);
	let jonser = new Jonser({name: req.params.name});
	jonser.save(function(err) {
		if(err) {
			console.log("Something went wrong while saving the new entries: ", err);
			res.json({message: "ERROR", error: err});
		} else {
			console.log("Successfully added the new entry: ", jonser);
			res.json({message: "Success", data: jonser});
		}
	});
})

// Delete
app.delete('/remove/:name', function(req, res) {
	console.log("Processing request to remove: ", req.params.name);
	Jonser.remove({name: req.params.name}, function(err, jonser) {
		if(err) {
			console.log("Something went wrong removing requested entry: ", req.params.name);
			res.json({message: "ERROR", error: err });	
		} else {
			console.log("Successfully removed entry: ", req.params.name);
			res.json({message: "Successfully removed entry!"});
		}
	});

})

app.get('/:name', function(req, res) {
	console.log("Retrieving information for user: ", req.params.name);
	Jonser.find({ name: req.params.name }, function(err, jonser) {
		if(err){
			console.log("Error retrieving requested user from DB: ", jonser)
			res.json({message: "ERROR", error: err});
		} else {
			console.log("Successfully retrieved the requested user: ", jonser)
			res.json(jonser);
		}
	});

})


/*--------- Port listening ---------*/
var server = app.listen(port, function() {
	console.log("Server started! Listening at http://localhost:" + port)
});

/*--------- Connecting to the DB ---------*/
mongoose.connect('mongodb://localhost/jonesers');

// Creating the Mongoose Schea //
//
// Schema object constructor //
var JonserSchema = new mongoose.Schema( {
	  name: {type: String, required: true,  minlength: 6},
	},
	{ timestamps: true }
)

// Creates the blueprint object and, in turn, creates the necessary database collection
// out of the model.
mongoose.model('Joneser', JonserSchema);   // Setting this Schema in our Models as 'Jonser'
var Jonser = mongoose.model('Joneser')     // Retrieving this Schema from our Models, named 'Jonser'
