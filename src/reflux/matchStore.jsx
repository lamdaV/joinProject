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
      removeID: null
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
    Add the two given users to the friends table.
  */
  postAddFriend: function(userID1, userID2) {
    var userIDsJSON = {
      userID1: userID1,
      userID2: userID2
    };

    this.matches.removeID = null;

    http.post("/addFriend", userIDsJSON).then(function(dataJSON) {
      console.log("addFriend received: " + JSON.stringify(dataJSON));
      if (dataJSON[0].status === 0) {
        this.matches.removeID = userID2;
      }
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
