//Load HTTP module
var http = require("http");

//Create HTTP server and listen on port 8000 for requests
http.createServer(function (request, response) {

   // Set the response HTTP header with HTTP status and Content type
   response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
   
   
   // Send the response body "Hello World"
   response.end(JSON.stringify(
    [
      {"id":1,"text":"a","completed":false},
      {"id":2,"text":"b","completed":false},
      {"id":3,"text":"c","completed":false}
    ]
));
}).listen(8000);

// Print URL for accessing server
console.log('Server running at http://127.0.0.1:8000/')