var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host      : "127.0.0.1",
  user      : "root",
  port      : "3306",
  password  : "eu4ahJu4",
  database  : "JoinSchema",
});

var app = express();

connection.connect(function(error) {
  if (error) {
    console.log("connection failed");
    console.log("Error: " + error.message);
    return;
  }
  console.log("connection established");
});

app.all("/*", function(request, response, next) {
  // TODO: figure this out.
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post("/signin", function(request, response) {
  console.log("POST signin request...");
  var user = request.body;

  // TODO: replace with database call functions.
  var query = "SELECT * FROM User WHERE User.email = '" + user.email + "' and User.password = '" + user.password + "'";

  console.log("query: " + query);

  connection.query(query, function(error, rows, fields) {
    if (error) {
      console.log("Error: " + error.message);
      return;
    }
    console.log("response: " + JSON.stringify(rows));
    response.send(rows);
  });
});

app.get("/test", function(request, response) {
  console.log("GET test page");
  connection.query("SELECT * FROM User", function(error, rows, fields) {
    if (error) {
      console.log("Error: " + error.message);
      return;
    }
    console.log("response: " + JSON.stringify(rows));
    response.send(rows);
  });
});

app.post("/test", function(request, response) {
  var test = testData.body;
  console.log(testData.body);
  testData.push(test);
  response.status(200).send("POST success");
});

app.listen(3333);
console.log("Server at localhost:3333");
