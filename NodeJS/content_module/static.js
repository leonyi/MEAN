/************
//
// Static.js
//
*************/

var fs = require('fs');
var path = require('path');
var images_dir = "./images";
var css_dir= "./stylesheets";
var templates_dir = "./views"

module.exports = function(request, response) {
  var requestpath = path.parse(request.url);
  var ext = requestpath.ext;
  var lastChar = request.url.slice(-1);

  console.log("request.url: " + request.url)
  // Directory access
  if(lastChar === '/' ) {
    // Try to find default index.html
    fs.readFile(templates_dir + request.url + 'cars.html', 'utf8', function (errors, contents){
        if(errors) return errorpage(response, 401, "ERROR 401: Directory is not accessiable.");
        responsecontent(response, 200, "text/html", null, contents);
    });
  }
  // File access
  else {
    
    // Check extension of files!
    switch (ext) {
      case '.html':
          fs.readFile(templates_dir + request.url, 'utf8', function (errors, contents){
              if(errors) return errorpage(response);
              responsecontent(response, 200, "text/html", null, contents);
          });
          break;
      case '.css' :
          fs.readFile(css_dir + request.url, 'utf8', function (errors, contents){
              if(errors) return errorpage(response);
              responsecontent(response, 200, "text/css", null, contents);
          });
          break;
      case '.jpeg':
      case '.jpg':
      case '.png':
      case '.gif':
      case '.bmp':
          fs.readFile(images_dir + request.url, function (errors, contents){
              if(errors) return errorpage(response);
              responsecontent(response, 200, "image/" + ext.slice(1,5), null, contents);
          });
          break;

      // Non-support file type
      default:
          fs.readFile('.' + request.url, function (errors, contents){
              if(errors) return errorpage(response);
              responsecontent(response, 200, null, null, contents);
          });
    }
  }
};

function errorpage(response, status, msg) {
  msg = msg || "ERROR 404: Request Not Found.";
  status = status || 404;
  responsecontent(response, status, "text/html", msg);
  return null;
};

function responsecontent(response, status, content_type, msg, content) {
  response.writeHead(status, {'Content-Type': content_type});
  if(content) response.write(content);
  response.end(msg);
}