var http = require("../services/httpService.js");
var Reflux = require("reflux");
var UserActions = require("./userActions.jsx");

/* global localStorage */
var UserStore = Reflux.createStore({
  /*
    Listen to UserActions.
  */
  listenables: [UserActions],

  /*
    Initialize jwt.
  */
  init: function() {
    this.jwt = localStorage.getItem("jwt");
  },

  /*
    Sign the user in.
  */
  postValidateUser: function(email, password) {
    var user = {
      email: email,
      password: password
    };

    http.post("/signin", user).then(function(dataJSON) {
      this.user = dataJSON;
      if (this.user.UserID !== null && this.user.UserID !== -1) {
        this.saveToken();
      }
      this.returnStatus();
    }.bind(this));
  },

  /*
    Create a user.
  */
  postCreateUser: function(email, password, timezone) {
    var user = {
      email: email,
      password: password,
      timezone: timezone
    };

    http.post("/create", user).then(function(dataJSON) {
      this.user = dataJSON;
      console.log("user create: " + JSON.stringify(this.user));
      // Do not save if a status is returned.
      if (this.user.status === 0) {
        this.saveToken();
      }
      this.returnStatus();
    }.bind(this));
  },

  /*
    Log the user out.
  */
  logout: function() {
    console.log("logging out...");
    localStorage.clear();
    this.jwt = "";
    this.user = this.jwt;
    this.returnStatus();
  },

  /*
    Adds a given gameID to the users library
  */
  postAddToLibrary: function(userID, gameID) {
    var userData = {
      userID: userID,
      gameID: gameID
    };

    http.post("/addToLibrary", userData);
  },

  /*
    Saves the jwt data to localStorage.
  */
  saveToken: function() {
    localStorage.setItem("jwt", this.user.jwt);
    localStorage.setItem("UserID", this.user.UserID);
  },

  /*
    Send data to those listening to the Store.
  */
  returnStatus: function() {
    this.trigger("change", this.user);
  }
});

module.exports = UserStore;
