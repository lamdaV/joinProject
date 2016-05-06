var http = require("../services/httpService.js");
var Reflux = require("reflux");
var authActions = require("./authActions.jsx");

/* global localStorage */
var authStore = Reflux.createStore({
  /*
    Listen to AuthActions.
  */
  listenables: [authActions],

  /*
    Authenticate the User.
  */
  postAuthenticate: function() {
    console.log("in postAuthenticate");
    if (!localStorage.getItem("jwt")) {
      console.log("postAuthenticate: jwt does not exist.");
      this.authStatus = false;
      this.returnStatus();
      return;
    }

    var jwt = {
      jwt: localStorage.getItem("jwt"),
      UserID: localStorage.getItem("UserID")
    };

    http.post("/authentication", jwt).then(function(dataJSON) {
      console.log("authStatus received: " + JSON.stringify(dataJSON));
      this.authStatus = dataJSON.status;
      this.returnStatus();
    }.bind(this));
  },

  /*
    Push changes to all listers.
  */
  returnStatus: function() {
    this.trigger("change", this.authStatus);
  }
});

module.exports = authStore;
