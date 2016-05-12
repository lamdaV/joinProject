var http = require("../services/httpService.js");
var Reflux = require("reflux");
var MatchActions = require("./matchActions.jsx");

var MessageStore = Reflux.createStore({
  /*
    Listen to MatchActions.
  */
  listenables: [MatchActions],

  init: function() {
    this.matches = {
      data: null,
      email: null
    };
  },

  /*
    Get top 100 matchings for a given user.
  */
  postMatchings: function(matchID) {
    console.log("postMatchings called");

    var matchIDJSON = {
      matchID: matchID
    };

    http.post("/matchings", matchIDJSON).then(function(dataJSON) {
      console.log("matchings received: " + JSON.stringify(dataJSON));
      this.matches.data = dataJSON[0];
      this.returnStatus();
    }.bind(this));
  },

  /*
    Get the email of a given user.
  */
  postGetEmail: function(userID) {
    console.log("postGetEmail called");

    var userIDJSON = {
      userID: userID
    };

    http.post("/matchEmail", userIDJSON).then(function(dataJSON) {
      console.log("matchEmail received: " + JSON.stringify(dataJSON));
      this.matches.email = dataJSON[0];
      this.returnStatus();
    }.bind(this));
  },

  /*
    Push changes to all listers.
  */
  returnStatus: function() {
    this.trigger("change", this.matches);
  }
});

module.exports = MessageStore;
