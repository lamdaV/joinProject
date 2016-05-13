var app = require("express")();
var bodyParser = require("body-parser");

app.all("/*", function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(request, response) {
  // response.sendFile(__dirname + "/public")
  // response.sendFile(__dirname + "/public/css/bootstrap.min.css");
  response.sendFile(__dirname + "/public/index.html");
});

app.get("/css/bootstrap.min.css", function(request, response) {
  response.sendFile(__dirname + "/public/css/bootstrap.min.css");
});

app.get("/css/bootstrap-theme.min.css", function(request, response) {
  response.sendFile(__dirname + "/public/css/bootstrap-theme.min.css");
});

app.get("/js/jquery-1.12.1.min.js", function(request, response) {
  response.sendFile(__dirname + "/public/js/jquery-1.12.1.min.js");
});

app.get("/js/main.js", function(request, response) {
  response.sendFile(__dirname + "/public/js/main.js");
});

app.get("/js/bootstrap.min.js", function(request, response) {
  response.sendFile(__dirname + "/public/js/bootstrap.min.js");
});

app.get("/fonts/glyphicons-halflings-regular.woff", function(request, response) {
  response.sendFile(__dirname + "/public/fonts/glyphicons-halflings-regular.woff");
});

app.get("/fonts/glyphicons-halflings-regular.woff2", function(request, response) {
  response.sendFile(__dirname + "/public/fonts/glyphicons-halflings-regular.woff2");
});

app.get("/fonts/glyphicons-halflings-regular.ttf", function(request, response) {
  response.sendFile(__dirname + "/public/fonts/glyphicons-halflings-regular.ttf");
});

console.log("Webserver listening at localhost:3330");
app.listen(3330);
