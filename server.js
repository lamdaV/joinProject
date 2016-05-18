var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var jwt = require("jsonwebtoken");
var format = require("string-format");
var favicon = require("serve-favicon");
var path = require("path");
var bcrypt = require("bcrypt");
const saltRounds = 10;

// TODO: Generate Secret randomly for each user.
var secret = "SupremeOverlord";

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
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));

app.all("/*", function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*
  Delete a friend from a user's friends list.
*/
app.post("/deleteFriend", function(request, response) {
  console.log("POST deleteFriend request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("ERROR: Failed to Connect");
      return;
    }
    console.log("connection established");

    var userData = request.body;
    var userID = userData.userID;
    var friendID = userData.friendID;

    userID = mysql.escape(userID);
    friendID = mysql.escape(friendID);

    var query = format("CALL delete_friend({0}, {1});", userID, friendID);
    console.log("QUERY: " + query);

    // No response.
    pool.query(query, function(error) {
      if (error) {
        console.log("ERROR: " + error.message);
        return;
      }
      console.log("DELETE friend sucess");
      response.send(true);
    });
    connection.release();
  });
});

/*
  Delete a specified game from a user's library.
*/
app.post("/deleteGameFromLibrary", function(request, response) {
  console.log("POST deleteGameFromLibrary request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("ERROR: Failed to Connect");
      return;
    }
    console.log("connection established");

    var userData = request.body;
    var userID = userData.userID;
    var gameID = userData.gameID;

    userID = mysql.escape(userID);
    gameID = mysql.escape(gameID);

    var query = format("CALL delete_game_from_library({0}, {1});", userID, gameID);
    console.log("QUERY: " + query);

    // No response.
    pool.query(query, function(error) {
      if (error) {
        console.log("ERROR: " + error.message);
        return;
      }
      console.log("DELETE game sucess");
      response.send(true);
    });
    connection.release();
  });
});

/*
  Get a user's library
*/
app.post("/getLibrary", function(request, response) {
  console.log("POST getLibrary request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("ERROR: Failed to Connect");
      return;
    }
    console.log("connection established");

    var userData = request.body;
    var userID = userData.userID;

    userID = mysql.escape(userID);

    var query = format("CALL get_user_library({0});", userID);
    console.log("QUERY: " + query);

    pool.query(query, function(error, rows) {
      if (error) {
        console.log("ERROR: " + error.message);
        return;
      }

      console.log("RESPONSE: " + JSON.stringify(rows));

      response.send(rows);
    });
    connection.release();
  });
});

/*
  Check if a user already has a game in their library.
*/
app.post("/isInLibrary", function(request, response) {
  console.log("POST isInLibrary request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("ERROR: Failed to Connect");
      return;
    }
    console.log("connection established");

    var userData = request.body;
    var userID = userData.userID;
    var gameID = userData.gameID;

    console.log("addToLibrary userID: " + userID);
    console.log("addToLibrary gameID: " + gameID);

    userID = mysql.escape(userID);
    gameID = mysql.escape(gameID);

    var query = format("CALL is_Game_In_Library({0}, {1});", userID, gameID);
    console.log("QUERY: " + query);

    pool.query(query, function(error, rows) {
      if (error) {
        console.log("ERROR: " + error.message);
        return;
      }

      console.log("RESPONSE: " + JSON.stringify(rows));
      response.send(rows);
    });
    connection.release();
  });
});

/*
  Add a game to a user's library.
*/
app.post("/addToLibrary", function(request, response) {
  console.log("POST addToLibrary request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("ERROR: Failed to Connect");
      return;
    }
    console.log("connection established");

    var userData = request.body;
    var userID = userData.userID;
    var gameID = userData.gameID;

    userID = mysql.escape(userID);
    gameID = mysql.escape(gameID);

    var query = format("CALL add_game_to_library({0}, {1});", userID, gameID);
    console.log("QUERY: " + query);

    // Do not send any response because the client will not process any data.
    pool.query(query, function(error) {
      if (error) {
        console.log("ERROR: " + error.message);
        return;
      }
      console.log("ADD game success");
      response.send(true);
    });
    connection.release();
  });
});

/*
  Add the given two users to the friends table.
*/
app.post("/addFriend", function(request, response) {
  console.log("POST addFriend request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("ERROR: Failed to Connect");
      return;
    }
    console.log("connection established");

    var userIDsJSON = request.body;
    var userID1 = userIDsJSON.userID1;
    var userID2 = userIDsJSON.userID2;

    userID1 = mysql.escape(userID1);
    userID2 = mysql.escape(userID2);

    var query = format("SET @status = -1; CALL add_friend({0}, {1}, @status); SELECT @status AS status;", userID1, userID2);

    pool.query(query, function(error, rows) {
      if (error) {
        console.log("ERROR: " + error.message);
        return;
      }
      console.log("RESPONSE: " + JSON.stringify(rows));
      console.log("ROW 2: " + JSON.stringify(rows[2]));
      response.send(rows[2]);
    });
    connection.release();
  });
});

/*
  Get matchings for a user.
*/
app.post("/matchings", function(request, response) {
  console.log("POST matchings request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("ERROR: Failed to Connect");
      return;
    }
    console.log("connection established");

    var matchIDJSON = request.body;
    var matchID = matchIDJSON.matchID;

    matchID = mysql.escape(matchID);

    var query = format("CALL match_function({0});", matchID);

    pool.query(query, function(error, rows) {
      if (error) {
        console.log("ERROR: " + error.message);
        return;
      }
      console.log("RESPONSE: " + JSON.stringify(rows));
      response.send(rows);
    });

    connection.release();
  });
});

/*
  Adds a message to the message history of two users.
*/
app.post("/messagePush", function(request, response) {
  console.log("POST messagePush request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("ERROR: Failed to Connect");
      return;
    }
    console.log("connection established");

    var messageJSON = request.body;
    var inboxID = messageJSON.inboxID;
    var chatUserID = messageJSON.chatUserID;
    var message = messageJSON.message;

    inboxID = mysql.escape(inboxID);
    chatUserID = mysql.escape(chatUserID);
    message = mysql.escape(message);

    var query = format("CALL add_message({0}, {1}, {2}); CALL get_message_history({0}, {1});", inboxID, chatUserID, message);
    console.log("QUERY: " + query);

    pool.query(query, function(error, rows) {
      if (error) {
        console.log("ERROR: " + error.message);
        return;
      }
      console.log("RESPONSE: " + JSON.stringify(rows));
      response.send(rows);
    });
    connection.release();
  });
});

/*
  Get the chat history between two users.
*/
app.post("/messageHistory", function(request, response) {
  console.log("POST messageHistory request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("ERROR: Failed to Connect");
      return;
    }
    console.log("connection established");

    var userIDsJSON = request.body;
    var inboxID = userIDsJSON.inboxID;
    var chatUserID = userIDsJSON.chatUserID;

    console.log("inboxID: " + inboxID);
    console.log("chatUserID: " + chatUserID);

    inboxID = mysql.escape(inboxID);
    chatUserID = mysql.escape(chatUserID);

    var query = format("CALL get_message_history({0}, {1});", inboxID, chatUserID);
    console.log("QUERY: " + query);

    pool.query(query, function(error, rows) {
      if (error) {
        console.log("ERROR: " + error.message);
        return;
      }

      console.log("RESPONSE: " + JSON.stringify(rows));
      response.send(rows);
    });
    connection.release();
  });
});

/*
  Get friendList of a given user
*/
app.post("/friendList", function(request, response) {
  console.log("POST friendList request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("ERROR: Failed to Connect");
      return;
    }
    console.log("connection established");

    var userIDJSON = request.body;
    var userID = userIDJSON.UserID;

    console.log("getting friendlist of: " + userID);

    userID = mysql.escape(userID);

    var query = format("CALL get_friends_list({0});", userID);
    console.log("QUERY: " + query);

    pool.query(query, function(error, rows) {
      if (error) {
        console.log("ERROR: " + error.message);
        return;
      }

      console.log("RESPONSE: " + JSON.stringify(rows));
      console.log("ROW 0: " + JSON.stringify(rows[0]));
      response.send(rows);
    });
    connection.release();
  });
});

/*
  Get Game given a gameID.
*/
app.post("/getGame", function(request, response) {
  console.log("POST getGame request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("ERROR: Failed to Connect");
      return;
    }
    console.log("connection established");

    var gameIDJSON = request.body;
    var gameID = gameIDJSON.gameID;

    console.log("GameID Received: " + gameID);

    gameID = mysql.escape(gameID);

    var query = format("CALL get_game_by_id({0});", gameID);

    pool.query(query, function(error, rows) {
      if (error) {
        console.log("ERROR: " + error.message);
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
      console.log("ERROR: Failed to Connect");
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
    pool.query(query, function(error, rows) {
      if (error) {
        console.log("ERROR: " + error.message);
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
      console.log("ERROR: Failed to Connect");
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
    var decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      // Send the authStatus on failure to decrypt.
      console.log("error: " + err.message);
      response.send(authStatus);
      return;
    }

    console.log("DECODED: " + JSON.stringify(decoded));

    // Create login_function query.
    var query = format("SET @status = -1; CALL login_function({0}, {1}, @status); SELECT @status AS status;", decoded.email, decoded.password);

    console.log("QUERY: " + query);

    pool.query(query, function(error, rows) {
      if (error) {
        console.log("ERROR: " + error.message);
        response.send(false);
        return;
      }
      console.log("RESPONSE: " + JSON.stringify(rows));
      console.log("ROW 1: " + JSON.stringify(rows[1]));
      console.log("USERID arg: " + JSON.stringify(userID));

      /* eslint-disable */
      if (userID == rows[1][0].UserID) {
        console.log("VERIFIED");
        authStatus.status = true;
      }
      /* eslint-disable */

      response.send(authStatus);
    });

    // Release connection.
    connection.release();
  });
});

// /*
//   Authenticate the user by evaluating the sent JWT.
// */
// app.post("/authenticate", function(request, response) {
//   console.log("POST authenticate request...");
//   pool.getConnection(function(error, connection) {
//     if (error) {
//       console.log("ERROR: Failed to Connect");
//       return;
//     }
//     console.log("connection established");
//
//     // Get JWT in JSON format.
//     /*
//       jwtJSON = {
//         userID: <id>,
//         jwt: <encrypted data>
//       }
//     */
//     var jwtJSON = request.body;
//     console.log("JWT server: " + JSON.stringify(jwtJSON.jwt));
//
//     // Get encrypted data.
//     var token = jwtJSON.jwt;
//
//     var authentication = {
//       jwt: "",
//       UserID: ""
//     };
//
//     // Decode the data.
//     // Note: decoded does not need to be escaped as jwt can only hold data already escaped when the user initally logged in.
//     var decoded;
//     try {
//       decoded = jwt.verify(token, secret);
//     } catch (err) {
//       console.log("error: " + err.message);
//       authentication.error = -1;
//       response.send(authentication);
//       return;
//     }
//
//     console.log("DECODED: " + JSON.stringify(decoded));
//
//     // Resign jwt.
//     var userData = {
//       email: decoded.email,
//       password: decoded.password
//     };
//
//     authentication.jwt = jwt.sign(userData, secret, {expiresIn: "10h"});
//
//     // Create login_function query.
//     var query = format("SET @UserID = -1; CALL login_function({0}, {1}, @UserID); SELECT @UserID AS UserID;", decoded.email, decoded.password);
//
//     console.log("QUERY: " + query);
//
//     pool.query(query, function(error, rows) {
//       if (error) {
//         console.log("ERROR: " + error.message);
//         response.send(false);
//         return;
//       }
//       console.log("RESPONSE: " + JSON.stringify(rows));
//
//       authentication.UserID = rows[1][0].UserID;
//
//       console.log("authentication data: " + JSON.stringify(authentication));
//       response.send(authentication);
//     });
//
//     // Release connection.
//     connection.release();
//   });
// });

/*
  Sign users in by calling the login_function stored procedure.
  Returns the result of the query in a JSON web token (JWT).
*/
app.post("/signin", function(request, response) {
  console.log("POST signin request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("ERROR: Failed to Connect");
      return;
    }

    // Get data sent.
    var user = request.body;

    // Escape bad characters.
    var email = mysql.escape(user.email);
    var password = mysql.escape(user.password);

    // Log to console.
    console.log("email: " + email);
    console.log("password: " + password);

    // Create login_function query.
    var query = format("SET @Status = -1; CALL login_function({0}, {1}, @Status); SELECT @Status AS Status", email, password);

    console.log("QUERY: " + query);

    // Check if user is in User table.
    pool.query(query, function(error, rows) {
      if (error) {
        console.log("ERROR: " + error.message);
        return;
      }

      // Use to determine where data is located.
      console.log("ROWS: " + JSON.stringify(rows));
      console.log("ROW 1: " + JSON.stringify(rows[1][0]));
      console.log("ROW 3: " + JSON.stringify(rows[3][0]));

      // Set up data to be encrypted.
      var userData = {
        email: email,
        password: password
      };

      // Assume user status is -1 (error).
      var userID = -1;
      if (rows[3][0].Status === 0) {
        userID = rows[1][0].UserID;
      }
      // Encrypt.
      userData = jwt.sign(userData, secret, {expiresIn: "10h"});
      var authentication = {
        UserID: userID,
        jwt: userData
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
      console.log("ERROR: Failed to Connect");
      return;
    }
    // Get data sent.
    var user = request.body;

    // Escape bad characters.
    var email = mysql.escape(user.email);
    var password = mysql.escape(user.password);
    var timezone = mysql.escape(user.timezone);
    var hash = bcrypt.hashSync(password, saltRounds);

    // Create create_user query.
    var query = format("SET @status = -1; CALL create_user({0}, {1}, {2}, @status); SELECT @status AS status;", email, password, timezone);

    console.log("QUERY: " + query);

    // Insert the user.
    pool.query(query, function(error, rows) {
      if (error) {
        console.log("ERROR: " + error.message);
        return;
      }

      console.log("RESPONSE: " + JSON.stringify(rows));
      var status = rows[3][0].status;

      var userData = {
        email: email,
        password: password
      };

      userData = jwt.sign(userData, secret, {expiresIn: "10h"});

      var authentication = {
        status: status,
        UserID: -1,
        jwt: userData
      };

      // Encrypt.
      if (status === 0) {
        authentication.UserID = rows[1][0].UserID;
      }

      response.send(authentication);
    });

    // Release connection.
    connection.release();
  });
});

app.post("/createPreference", function(request, response) {
  console.log("POST createPreference request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("ERROR: Failed to Connect");
      return;
    }
    //get data sent
    var preference = request.body;
    var platform = preference.platform;
    var genre = preference.genre;

    //create query
    var query = format("CALL add_preference({0}, {1});", genre, platform);

    console.log("QUERY: " + query);

    //insert the preference
    pool.query(query, function(error, rows) {
      if (error) {
        console.log("ERROR: " + error.message);
        return;
      }

      console.log("RESPONSE: " + JSON.stringify(rows));
      response.send(rows);
    });
    connection.release();
  });
});

app.post("/associatePreference", function(request, response) {
  console.log("POST associatePreference request...");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("ERROR: Failed to Connect");
      return;
    }
    //get data sent
    var userPreference = request.body;
    var preferenceID = userPreference.preferenceID;
    var userID = userPreference.userID;

    //create query
    var query = format("CALL user_add_pref({0}, {1});", userID, preferenceID);

    console.log("QUERY: " + query);

    //run the query
    pool.query(query, function(error, rows) {
      if (error) {
        console.log("ERROR: " + error.message);
        return;
      }

      console.log("RESPONSE: " + JSON.stringify(rows));
      response.send(rows);
    });
    connection.release();
  });
});

// ---------TEST REQUEST/Templates------------------------------------

/*
app.get("/test", function(request, response) {
  console.log("GET test request");
  pool.getConnection(function(error, connection) {
    if (error) {
      console.log("ERROR: Failed to Connect");
      return;
    }
    console.log("connection established");
    pool.query("SELECT * FROM User", function(error, rows, fields) {
      console.log("query completed");
      connection.release();
      if (error) {
        console.log("ERROR: " + error.message);
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
*/
// ---------TEST REQUEST/Templates------------------------------------

// Have the server listen on port 3333.
app.listen(3333, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server at localhost:3333");
  }
});
