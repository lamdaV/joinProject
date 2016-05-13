var express = require("express");
var favicon = require("serve-favicon");
var path = require("path");
var app = express();

var destination = ["css", "js", "fonts"];
destination.map(function(folder) {
  app.use("/" + folder, express.static(path.join(__dirname, "/public", folder)));
  return null;
});

app.use(favicon(path.join(__dirname, "/public/favicon.ico")));

app.all("/*", function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.get("/", function(request, response) {
  response.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(3330, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Webserver listening at localhost:3330");
  }
});
