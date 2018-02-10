// Get the http module
var http = require("http")
// FS module allows us to read and write content for responses
var fs = require('fs')
// Creating a server using the http module
var server = http.createServer(function(request, response){
	console.log('client request URL: ', request.url)
	// console.log('Clent whole request object: ', request)
	console.log('Response object: ', response)
	// Routing
	if (request.url === '/' || request.url === '/cars') {
		fs.readFile('views/cars.html', 'utf8', function(errors, contents) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(contents);
			response.end();
		});

	}
  	else if(request.url === '/images/ford_mustang_2015.jpeg'){
	    fs.readFile('images/ford_mustang_2015.jpeg', function(errors, contents){
	        response.writeHead(200, {'Content-type': 'image/jpg'});
	        response.write(contents);
	        response.end();
	     });
	}
	 else if(request.url === '/images/kitty-cat.jpeg'){
	    fs.readFile('images/kitty-cat.jpeg', function(errors, contents){
	        response.writeHead(200, {'Content-type': 'image/jpg'});
	        response.write(contents);
	        response.end();
	     });
	}
	else if (request.url === '/stylesheet/skeleton.css'){
		fs.readFile('stylesheets/skeleton.css', 'utf8', function(errors, contents){
			response.writeHead(200, {'Content-type': 'text/css'})
			response.write(contents);
			response.end();
		});
	}
	else if (request.url === '/cats') {
		fs.readFile('views/cats.html', 'utf8', function(errors, contents) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(contents);
			response.end();
		});
	}
	else if (request.url === '/cars/new') {
		fs.readFile('views/form.html', 'utf8', function(errors, contents) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(contents);
			response.end();
		});
	}
	else {
		response.writeHead(404);
		response.end("File not found!")
	}
});
server.listen(7077)
console.log("Server listening on http://localhost:7077")