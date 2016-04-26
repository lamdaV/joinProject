var http = require("../services/httpService.js");
var Reflux = require("reflux");
var UserActions = require("./userActions.jsx");

var UserStore = Reflux.createStore({
  listenables: [UserActions],

  init: function() {
    this.jwt = localStorage.getItem("jwt");
    console.log("jwt init: " + JSON.stringify(this.jwt));
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
        this.saveToken();
        this.returnStatus();
      }.bind(this));
    }
  },

  saveToken: function() {
    localStorage.setItem("jwt", this.user.data);
  },

  returnStatus: function() {
    this.trigger("change", this.user);
  }
});

module.exports = UserStore;
