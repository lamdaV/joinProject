var http = require("../services/httpService.js");
var Reflux = require("reflux");
var UserActions = require("./userActions.jsx");

var UserStore = Reflux.createStore({
  listenables: [UserActions],

  init: function() {
    this.jwt = localStorage.getItem("jwt");
    if (this.jwt) {
      console.log("jwt init: " + JSON.stringify(this.jwt));
      this.postIsAuthenticated();
    }
  },

  postValidateUser: function(email, password) {
    var user = {
      "email": email,
      "password": password
    };

    http.post("/signin", user).then(function(dataJSON) {
      this.user = dataJSON;
      this.saveToken();
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
      this.saveToken();
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
        this.saveToken();
        this.returnStatus();
        return this.user.isValid;
      }.bind(this));
    }
  },

  logout: function() {
    console.log("logging out...")
    localStorage.removeItem("jwt");
    console.log("localStorage: " + localStorage.getItem("jwt"));
    this.jwt = "";
    this.user = this.jwt;
    this.returnStatus();
  },

  /*
    Saves the jwt data to localStorage.
  */
  saveToken: function() {
    localStorage.setItem("jwt", this.user.jwt);
  },

  /*
    Send data to those listening to the Store.
  */
  returnStatus: function() {
    this.trigger("change", this.user);
  }
});

module.exports = UserStore;
