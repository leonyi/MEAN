// Require all the necessary modules
/*--------- Controllers Config ---------*/
var quotes = require('../controllers/quotes.js');

module.exports = function(app){
	/*--------- Routes ---------*/
	// Root Request // 
	app.get('/', function(req, res) {
		quotes.index(req, res);
	});

	// Other Requests
	app.post('/quotes', function(req, res) {
		quotes.post(req, res);
	});

	app.get('/get_quotes', function(req, res) {
		quotes.get(req, res);
	});
}