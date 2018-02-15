// Require all the necessary modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var path = require("path");
var port = process.env.PORT || 8030

// Instantiate an express app
var app = express();

/*--------- bodyParser ---------*/
// support json encoded bodies
app.use(bodyParser.json()); 
// support encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

/*--------- Static Folder ---------*/
app.use(express.static(path.join(__dirname, './static')));


/*--------- Routes ---------*/
var router = express.Router(); // Get an instance of the express Router

// Route middleware that will happen on every request
router.use(function(req, res, next) {
	// Log each request to the console
	console.log(req.method, req.url, req.parms);

	// Go to the route
	next();
});


// Root Request //
router.get('/', function(req, res) {
	res.json( {message: "Welcome to this awesome API!"} );
});

// On routes that end with /tasks
router.route('/tasks')
	// Create a new task (accessed at POST http://localhost:8030/api/tasks)
	.post(function(req, res) {
		console.log("Adding new task to the DB: ", req.params )
		let task = new Task({title: req.body.title, description: req.body.description, completed: req.body.completed});
		task.save(function(err) {
			if(err) {
				console.log("Something went wrong saving the new entry: ", err);
				res.json({message: "ERROR", error: err});
			} else {
				console.log("Successfully added the new entry: ", task);
				res.json({message: "Success", data: task});
			}

		})
	})

	// Get all the tasks (accessed at GET http://localhost:8030/api/tasks)
	.get(function(req, res) {
		Task.find({}, function(err, tasks) {
			if (err) {
				console.log("Error retrieving tasks from DB: ", err);
				res.json({message: "Error retrieving your tasks.", error: err});
			} else {
				console.log("Successfully retrieved all the tasks: ", tasks);
				res.json(tasks);
			}
		});

	});

router.route('/tasks/:task_id')
	// Get the task with ath ID (accessed at GET http://localhost:8030/api/tasks/:task_id)
	.get(function(req, res) {
		// Task.findById(req.params.task_id, function(err, task) {
		Task.find({ _id: req.params.task_id }, function(err, task) {
			if (err) {
				console.log("Error retrieving requested task: ", err)
				res.json({message: "Error retrieving requested task!"})
			} else {
				console.log("Successfully retrieved requested task: ", task )
				res.json(task);
			}
		})
	})

	// Update the taks with this id (accessed at PUT http://localhost:8030/api/taks/:task_id)
	.put(function(req, res) {
		Task.findById({ _id: req.params.task_id }, function(err, task) {

				if(err){
					console.log("Error retrieving record from db: ", err)
					res.send ( {message: "Error attempting to retrieve the requested task id.", error: err} )
				} else {
					console.log("This is the task we are updating: ", task)
					// Update the task with your changes
					task.title = req.body.title;
					task.description = req.body.description;
					task.completed = req.body.completed;

					console.log("This is the task after the update: ", task)
					task.save(function(err) {
						if(err){
							console.log("Error attempting to save changes to record!")
							res.json({ message: "Errors attempting to update record!"})
						} else {
							console.log("Task updated Successfully!", task)
							res.json({ message: "Task updated!"});	
						}
					});
				}			
		});

	})

	// Delete the task with this id (accessed at DELETE http://localhost:8030/api/tasks/:task_id)
	.delete(function(req, res) {

		Task.remove( { _id: req.params.task_id }, function(err, task) {
			if (err) {
				console.log("Error attempting to remove requested task id: ", req.params.task_id )
				res.send(err);
			} else {
				console.log("Successfully removed record: ", req.params.task_id);
				res.json({message: 'Successfully deleted.'})
			}
		});
	})


/*--------- Register The Routes ---------*/
// All routes will be prefixed with /api
app.use('/api', router);


/*--------- Port listening ---------*/
var server = app.listen(port, function() {
	console.log("Server started! Listening at http://localhost:" + port)
});

/*--------- Connecting to the DB ---------*/
// Setup this block with the new app info.
mongoose.connect('mongodb://localhost/tasks');

// Creating the Mongoose Schea //
// Schema object constructor //
var TaskSchema = new mongoose.Schema( {
	  title: String,
	  description: String,
	  completed: { type: Boolean, default: false }
	},
	{ timestamps: true }
);

// Creates the blueprint object and, in turn, creates the necessary database collection
// out of the model.
mongoose.model('Task', TaskSchema);   // Setting this Schema in our Models as 'Task'
var Task = mongoose.model('Task')     // Retrieving this Schema from our Models, named 'Task'
