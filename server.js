var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var jwt = require("jsonwebtoken");

var secret = "SupremeOverlord";

// TODO: Update this with limited user.
// var connection = mysql.createConnection({
//   host                  :   "127.0.0.1",
//   user                  :   "root",
//   port                  :   "3306",
//   password              :   "eu4ahJu4",
//   database              :   "JoinSchema",
//   multipleStatements    :   true
// });

var pool = mysql.createPool({
  connectionLimit: 50,
  host: "127.0.0.1",
  user: "root",
  password: "eu4ahJu4",
  port: "3306",
  database: "JoinSchema",
  multipleStatements: true
});

var app = express();

app.all("/*", function(request, response, next) {
  // TODO: figure this out.
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post("/authenticate", function(request, response) {
  console.log("POST authenticate request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("Error: connection failed");
      return;
    }
    console.log("connection established");

    var jwtJSON = request.body;
    console.log("jwt server: " + JSON.stringify(jwtJSON.jwt));

    token = jwtJSON.jwt;

    var decoded = jwt.verify(token, secret);
    console.log("decoded: " + JSON.stringify(decoded));

    var query = "SET @UserID = -1; CALL login_function(" + decoded.email +  ", " + decoded.password + ", @UserID); SELECT @UserID AS UserID;";
    console.log("query: " + query);

    pool.query(query, function(error, rows, fields) {
      connection.release();
      if (error) {
        console.log("Error: " + error.message);
        response.send(false);
        return;
      }

      console.log("userID: " + JSON.stringify(rows[2][0].UserID));

      var userData = {
        "email" : decoded.email,
        "password" : decoded.password
      };

      userData = jwt.sign(userData, secret);
      authentication = {
        "userID" : rows[2][0].UserID,
        "data" : userData
      };

      // Error if one lined.
      if (rows[2][0].UserID != null) {
        authentication.isValid = true;
      } else {
        authentication.isValid = false;
      }

      response.send(authentication);
    });
  });
});

// Sign users in.
app.post("/signin", function(request, response) {
  console.log("POST signin request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("Error: Failed to Connect");
      return;
    }

    var user = request.body;

    email = mysql.escape(user.email);
    password = mysql.escape(user.password);

    console.log("email: " + email);
    console.log("password: " + password);

    var query = "SET @UserID = -1; CALL login_function(" + email +  ", " + password + ", @UserID); SELECT @UserID AS UserID;";

    console.log();
    console.log("query: " + query);
    console.log();

    pool.query(query, function(error, rows, fields) {
      connection.release();
      if(error) {
        console.log("Error: " + error.message);
        return;
      }

      console.log("rows: " + JSON.stringify(rows));
      console.log("data: " + JSON.stringify(rows[2][0].UserID))

      var userData = {
        "email" : email,
        "password" : password
      };

      userData = jwt.sign(userData, secret);
      authentication = {
        "userID" : rows[2][0].UserID,
        "data" : userData
      };
      response.send(authentication);
    });
  });
});

  // TODO: replace with database call functions.
  // var query = "SELECT * FROM User WHERE User.email = '" + user.email + "' and User.password = '" + user.password + "'";
  //
  // console.log("query: " + query);
  //
  // connection.query(query, function(error, rows, fields) {
  //   if (error) {
  //     console.log("Error: " + error.message);
  //     return;
  //   }
  //   console.log("response: " + JSON.stringify(rows));
    // var token = jwt.sign(rows, secret);
    // var userData = {
    //   "userID": rows[0].UserID,
    //   "token": token
    // };
    // console.log("userData: " + JSON.stringify(userData));
    // response.send(userData);
//   });
// });

// Create User.
app.post("/create", function(request, response) {
  console.log("POST create request...");
  var user = request.body;

  user.email = mysql.escape(user.email);
  user.password = mysql.escape(user.password);
  user.timezone = mysql.escape(user.timezone);

  var query = "CALL create_user(" + user.email + ", " + user.password + ", " + user.timezone + ");";

  console.log("query: " + query);

  connection.query(query, function(error, rows, fields) {
    if (error) {
      console.log("Error: " + error.message);
      return;
    }
    console.log("response: " + JSON.stringify(rows));
  });

  query = "SET @UserID = -1; CALL login_function(" + user.email +  ", " + user.password + ", @UserID); SELECT @UserID AS UserID;";

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
  console.log("GET test request");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("Error: Failed to Connect");
      return;
    }
    console.log("connection established");
    pool.query("SELECT * FROM User", function(error, rows, fields) {
      console.log("query completed");
      connection.release();
      if (error) {
        console.log("Error: " + error.message);
        return;
      }
      response.send(rows);
    });
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
