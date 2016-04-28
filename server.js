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
  user: "JoinCSSE",
  password: "joinMe",
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

/*
  Authenticate the user by evaluating the sent JWT.
*/
app.post("/authenticate", function(request, response) {
  console.log("POST authenticate request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("Error: connection failed");
      return;
    }
    console.log("connection established");

    // Get JWT in JSON format.
    /*
      jwtJSON = {
        userID: <id>,
        jwt: <encrypted data>
      }
    */
    var jwtJSON = request.body;
    console.log("jwt server: " + JSON.stringify(jwtJSON.jwt));

    // Get encrypted data.
    token = jwtJSON.jwt;

    // Decode the data.
    // Note: decoded does not need to be escaped as jwt can only hold data already escaped when the user initally logged in.
    var decoded = jwt.verify(token, secret);

    console.log("decoded: " + JSON.stringify(decoded));

    // Create login_function query.
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

      // Resign the secret.
      userData = jwt.sign(userData, secret);
      authentication = {
        "userID" : rows[2][0].UserID,
        "jwt" : userData
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

/*
  Sign users in by calling the login_function stored procedure.
  Returns the result of the query in a JSON web token (JWT).
*/
app.post("/signin", function(request, response) {
  console.log("POST signin request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("Error: Failed to Connect");
      return;
    }

    // Get data sent.
    var user = request.body;

    // Escape bad characters.
    email = mysql.escape(user.email);
    password = mysql.escape(user.password);

    // Log to console.
    console.log("email: " + email);
    console.log("password: " + password);

    // Create login_function query.
    var query = "SET @UserID = -1; CALL login_function(" + email +  ", " + password + ", @UserID); SELECT @UserID AS UserID;";

    console.log("QUERY: " + query);

    // Check if user is in User table.
    pool.query(query, function(error, rows, fields) {
      connection.release();
      if(error) {
        console.log("Error: " + error.message);
        return;
      }

      // Use to determine where data is located.
      console.log("rows: " + JSON.stringify(rows));
      console.log("data: " + JSON.stringify(rows[2][0].UserID))

      // Set up data to be encrypted.
      var userData = {
        "email" : email,
        "password" : password
      };

      // Encrypt.
      userData = jwt.sign(userData, secret);
      authentication = {
        "userID" : rows[2][0].UserID,
        "jwt" : userData
      };

      // Send response.
      response.send(authentication);
    });
  });
});

/*
  Creates User by calling the create_user stored procedure.
  Then, calls login_function stored procedure.
*/
app.post("/create", function(request, response) {
  console.log("POST create request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("Error: Failed to Connect");
      return;
    }
    // Get data sent.
    var user = request.body;

    // Escape bad characters.
    user.email = mysql.escape(user.email);
    user.password = mysql.escape(user.password);
    user.timezone = mysql.escape(user.timezone);

    // Create create_user query.
    var query = "CALL create_user(" + user.email + ", " + user.password + ", " + user.timezone + ");";

    console.log("QUERY: " + query);

    // Insert the user.
    pool.query(query, function(error, rows, fields) {
      if (error) {
        console.log("Error: " + error.message);
        return;
      }
      console.log("RESPONSE: " + JSON.stringify(rows));
    });

    // Create login_function query.
    query = "SET @UserID = -1; CALL login_function(" + user.email +  ", " + user.password + ", @UserID); SELECT @UserID AS UserID;";

    console.log("QUERY: " + query);

    // Check if created User is in User table.
    pool.query(query, function(error, rows, fields) {
      // Releases the connection back to the pool.
      connection.release();
      if (error) {
        console.log("Error: " + error.message);
        return;
      }
      console.log("\nRESPONSE: " + JSON.stringify(rows));
      response.send(rows);
    });
  });
});

// ---------TEST REQUEST/Templates------------------------------------
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
// ---------TEST REQUEST/Templates------------------------------------

// Have the server listen on port 3333.
app.listen(3333);
console.log("Server at localhost:3333");
