// http server
const http = require('http');
const   fs = require('fs');

// static content file
const static_contents = require('./static.js');

//creating a server
server = http.createServer(function (request, response){
  static_contents(request, response);  //this will serve all static files automatically
});
server.listen(8000);
console.log("Running in http://localhost:8000");