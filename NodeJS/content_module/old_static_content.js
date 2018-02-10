var fs = require('fs');
var path = require('path');
var images = './images'
var css = './stylesheets'
var templates = './views'


response.writeHead(200, {'Content-type': 'text/html'});
console.log('Request', request.url);
if(request.url === '/'){
fs.readFile('views/index.html', 'utf8', function (errors, contents) {
  response.write(contents); 
  response.end();
  return;

} else if(request.url === '/dojo.html'){
fs.readFile('views/dojo.html', 'utf8', function (errors, contents) {
  response.write(contents);
  response.end();
  return;

});
} else if(request.url === '/stylesheet/skeleton.css'){
fs.readFile('stylesheets/skeleton.css', 'utf8', function (errors, contents) {
  response.write(contents);
  response.end();
});
} else {
  response.end('File not found!!!');
}