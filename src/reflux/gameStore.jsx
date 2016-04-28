var http = require("../services/httpService.js");
var Reflux = require("reflux");
var GameActions = require("./gameActions.jsx");

var UserStore = Reflux.createStore({
  listenables: [GameActions],

  init: function() {
    this.jwt = localStorage.getItem("jwt");
    if (this.jwt) {
      console.log("jwt init: " + JSON.stringify(this.jwt));
      this.postIsAuthenticated();
    }
  },

  postGameData: function() {
    // http.post("/gameData", )
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


  // TODO: Consider caching large data.
  saveToken: function() {
    localStorage.setItem("jwt", this.user.jwt);
  },

  returnStatus: function() {
    this.trigger("change", this.user);
  }
});

module.exports = UserStore;
