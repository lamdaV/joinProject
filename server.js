var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var jwt = require("jsonwebtoken");
var format = require("string-format");

// TODO: Generate Secret randomly for each user.
var secret = "SupremeOverlord";

// TODO: Update this with limited user.
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
  Get Game given a gameID.
*/
app.post("/getGame", function(request, response) {
  console.log("POST getGame request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("Error: Failed to Connect");
      return;
    }
    console.log("connection established");

    var gameIDJSON = request.body;
    var gameID = gameIDJSON.gameID;

    console.log("GameID Received: " + gameID);

    gameID = mysql.escape(gameID);

    // TODO: Insert CAll procedure.
    var query = format("CALL get_game_by_id({0})", gameID);

    pool.query(query, function(error, rows, fields) {
      if (error) {
        console.log("Error: " + error.message);
        return;
      }
      console.log("RESPONSE: " + JSON.stringify(rows));
      console.log("ROW 0: " + JSON.stringify(rows[0][0]));
      console.log("ROW 1: " + JSON.stringify(rows[1]));
      response.send(rows);
    });
    connection.release();
  });
});

/*
  Search the Game table for all games similar to the search text.
*/
app.post("/searchGame", function(request, response) {
  console.log("POST search game request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("Error: Failed to Connect");
      return;
    }
    console.log("connection established");

    // Get data sent.
    var searchQueryJSON = request.body;
    var searchQuery = searchQueryJSON.query;

    // Escape the searchQuery.
    searchQuery = mysql.escape(searchQuery);

    console.log("search: " + searchQuery);

    var query = format("CALL get_game_by_title({0});", searchQuery);

    console.log("QUERY: " + query);
    pool.query(query, function(error, rows, fields) {
      if (error) {
        console.log("Error: " + error.message);
        return;
      }

      console.log("RESPONSE: " + JSON.stringify(rows));
      console.log("ROW 0: " + JSON.stringify(rows[0]));
      response.send(rows[0]);
    });

    // Release connection.
    connection.release();
  });
});

app.post("/authentication", function(request, response) {
  console.log("POST !authentication! request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("Error: Failed to Connect");
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
    console.log("JWT server: " + JSON.stringify(jwtJSON.jwt));

    // Get encrypted data.
    var userID = jwtJSON.UserID;
    var token = jwtJSON.jwt;

    // Pessimistic Assumption: User is not authorized.
    var authStatus = {
      status: false
    };

    // Decode the data.
    // Note: decoded does not need to be escaped as jwt can only hold data already escaped when the user initally logged in.
    try {
      var decoded = jwt.verify(token, secret)
    } catch(err) {
      // Send the authStatus on failure to decrypt.
      console.log("error: " + err.message);
      response.send(authStatus);
      return;
    }

    console.log("DECODED: " + JSON.stringify(decoded));

    // Create login_function query.
    var query = format("SET @status = -1; CALL login_function({0}, {1}, @status); SELECT @status AS status;", decoded.email, decoded.password);

    console.log("QUERY: " + query);

    pool.query(query, function(error, rows, fields) {
      if (error) {
        console.log("Error: " + error.message);
        response.send(false);
        return;
      }
      console.log("RESPONSE: " + JSON.stringify(rows));

      if (userID == rows[1][0].UserID) {
        authStatus.status = true;
      }

      response.send(authStatus);
    });

    // Release connection.
    connection.release();
  });
});


/*
  Authenticate the user by evaluating the sent JWT.
*/
app.post("/authenticate", function(request, response) {
  console.log("POST authenticate request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("Error: Failed to Connect");
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
    console.log("JWT server: " + JSON.stringify(jwtJSON.jwt));

    // Get encrypted data.
    token = jwtJSON.jwt;

    var authentication = {
      "jwt" : "",
      "UserID" : ""
    };

    // Decode the data.
    // Note: decoded does not need to be escaped as jwt can only hold data already escaped when the user initally logged in.
    try {
      var decoded = jwt.verify(token, secret)
    } catch(err) {
      console.log("error: " + err.message);
      authentication.error = -1;
      response.send(authentication);
      return;
    }

    console.log("DECODED: " + JSON.stringify(decoded));

    // Resign jwt.
    var userData = {
      "email" : decoded.email,
      "password" : decoded.password
    };

    authentication.jwt = jwt.sign(userData, secret, {expiresIn: "10h"});


    // Create login_function query.
    var query = format("SET @UserID = -1; CALL login_function({0}, {1}, @UserID); SELECT @UserID AS UserID;", decoded.email, decoded.password);

    console.log("QUERY: " + query);

    pool.query(query, function(error, rows, fields) {
      if (error) {
        console.log("Error: " + error.message);
        response.send(false);
        return;
      }
      console.log("RESPONSE: " + JSON.stringify(rows));

      authentication.UserID = rows[1][0].UserID;

      console.log("authentication data: " + JSON.stringify(authentication));
      response.send(authentication);
    });

    // Release connection.
    connection.release();
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
    var query = format("SET @Status = -1; CALL login_function({0}, {1}, @Status); SELECT @Status AS Status", email, password);

    console.log("QUERY: " + query);

    // Check if user is in User table.
    pool.query(query, function(error, rows, fields) {
      if(error) {
        console.log("Error: " + error.message);
        return;
      }

      // Use to determine where data is located.
      console.log("ROWS: " + JSON.stringify(rows));
      console.log("ROW 1: " + JSON.stringify(rows[1][0]));
      console.log("ROW 3: " + JSON.stringify(rows[3][0]));

      // Set up data to be encrypted.
      var userData = {
        "email" : email,
        "password" : password
      };

      if (rows[3][0].Status !== 0) {
        var userID = rows[3][0].Status;
      } else {
        var userID = rows[1][0].UserID;
      }
      // Encrypt.
      userData = jwt.sign(userData, secret, {expiresIn: "10h"});
      authentication = {
        "UserID" : userID,
        "jwt" : userData
      };

      // Send response.
      response.send(authentication);
    });

    // Release connection.
    connection.release();
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
    email = mysql.escape(user.email);
    password = mysql.escape(user.password);
    timezone = mysql.escape(user.timezone);

    // Create create_user query.
    var query = format("SET @status = -1; CALL create_user({0}, {1}, {2}, @status); SELECT @status AS status;", email, password, timezone);

    console.log("QUERY: " + query);

    // Insert the user.
    pool.query(query, function(error, rows, fields) {
      if (error) {
        console.log("ERROR: " + error.message);
        return;
      }

      console.log("RESPONSE: " + JSON.stringify(rows));
      var status = rows[3][0].status

      var userData = {
        "email" : email,
        "password" : password
      };

      userData = jwt.sign(userData, secret, {expiresIn: "10h"});

      var authentication = {
        "status" : status,
        "UserID" : -1,
        "jwt" : userData
      }

      // Encrypt.
      if (status === 0) {
        authentication.UserID = rows[1][0].UserID
      }

      response.send(authentication);
    });

    // Release connection.
    connection.release();
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
