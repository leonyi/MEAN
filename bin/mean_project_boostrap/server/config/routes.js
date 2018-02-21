// Require all the necessary modules
/*--------- Controllers Config ---------*/
var quotes = require('../controllers/quotes.js');

module.exports = function(app){
	/*--------- Routes ---------*/
	// Root route
	app.get('/', function(req, res) {
		quotes.index(req, res);
	});

	// Routes that end with /quotes
	// Create a new entry (accessed at POST http://localhost:8020/quotes)
	app.post('/quotes', function(req, res) {
		quotes.post(req, res);
	});

	// Get all the entries (accessed at GET http://localhost:8020/quotes)
	app.get('/quotes', function(req, res) {
		quotes.get(req, res);
	});

	// Routes that end with /:quote_id
	// Update the entry with this id (accessed at PUT http://localhost:8020/quotes/:quote_id)
	app.getone('/quotes/:quote_id', function(req, res) {
		quotes.get(req, res);
	});

	// Update the entry with this id (accessed at PUT http://localhost:8020/quotes/:quote_id)
	app.put('/quotes/:quote_id', function(req, res) {
		quotes.put(req, res);
	});

	// Delete the entry with this id (accessed at DELETE http://localhost:8020/quotes/:quote_id)
	app.delete('/quotes/:quote_id', function(req, res) {
		quotes.delete(req, res);
	});

}
