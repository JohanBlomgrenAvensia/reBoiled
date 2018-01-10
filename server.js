// //Load HTTP module
// var http = require("http");

// //Create HTTP server and listen on port 8000 for requests
// http.createServer(function (request, response) {

//   // Set the response HTTP header with HTTP status and Content type
//   response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });


//   // Send the response body "Hello World"
//   response.end(JSON.stringify(
//     [
//       { "id": 1, "text": "a", "completed": false },
//       { "id": 2, "text": "b", "completed": false },
//       { "id": 3, "text": "c", "completed": false }
//     ]
//   ));
// }).listen(8000);






var express = require('express');
var cors = require('cors')
var app = express();

app.get('/', function (req, res) {
  var app = express()
  app.use(cors())
  var sql = require("mssql");

  // config for your database
  var config = {
    user: 'Test',
    password: 'Test',
    server: 'localhost',
    database: 'Test'
  };

  // res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  // res.end(JSON.stringify(
  //   [
  //     { "id": 1, "text": "a", "completed": false },
  //     { "id": 2, "text": "b", "completed": false },
  //     { "id": 3, "text": "c", "completed": false }
  //   ]
  // ));
  
  sql.connect(config, function (err) {

      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
      console.log(request);
      // query to the database and get the records
      request.query('select * from Todo', function (err, recordset) {
        console.log(recordset);
          if (err) console.log(err)

          // send records as a response
          res.send(recordset);

      });
  });
});

var server = app.listen(8000, function () {
  console.log('Server is running..');
});