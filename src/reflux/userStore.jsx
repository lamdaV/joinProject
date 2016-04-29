var http = require("../services/httpService.js");
var Reflux = require("reflux");
var UserActions = require("./userActions.jsx");

var UserStore = Reflux.createStore({
  listenables: [UserActions],

  init: function() {
    this.jwt = localStorage.getItem("jwt");
    if (this.jwt) {
      console.log("jwt init: " + JSON.stringify(this.jwt));
    }
  },

  postValidateUser: function(email, password) {
    var user = {
      "email": email,
      "password": password
    };

    http.post("/signin", user).then(function(dataJSON) {
      this.user = dataJSON;
      if (this.user.UserID !== null) {
        this.saveToken();
      }
      this.returnStatus();
    }.bind(this));
  },

  postCreateUser: function(email, password, timezone) {
    var user = {
      "email": email,
      "password": password,
      "timezone": timezone
    };

    http.post("/create", user).then(function(dataJSON) {
      this.user = dataJSON;
      console.log("user create: " + JSON.stringify(this.user))
      // Do not save is a status is returned.
      if (this.user.status === 0) {
        this.saveToken();
      }
      this.returnStatus();

    }.bind(this));
  },

  postIsAuthenticated: function() {
    if (this.jwt) {
      var jwtJSON = {
        "jwt": this.jwt
      };

      http.post("/authenticate", jwtJSON).then(function(dataJSON) {
        this.user = dataJSON;
        console.log("authenticate user: " + JSON.stringify(this.user));
        var isAuthenticated = localStorage.getItem("UserID") == this.user.UserID

        if (this.user.error == -1) {
          localStorage.clear();
          this.returnStatus();
        }

        if (isAuthenticated) {
          this.saveToken();
          this.returnStatus();
        }
        return isAuthenticated;
      }.bind(this));
    }
  },

  logout: function() {
    console.log("logging out...")
    localStorage.clear();
    this.jwt = "";
    this.user = this.jwt;
    this.returnStatus();
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
