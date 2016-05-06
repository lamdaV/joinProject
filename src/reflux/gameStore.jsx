var http = require("../services/httpService.js");
var Reflux = require("reflux");
var GameActions = require("./gameActions.jsx");

/* global localStorage */
var GameStore = Reflux.createStore({
  listenables: [GameActions],

  init: function() {
    this.jwt = localStorage.getItem("jwt");
    if (this.jwt) {
      console.log("gameStore jwt init: " + JSON.stringify(this.jwt));
    }
  },

  postSearchGame: function(searchText) {
    console.log("searchText: " + searchText);
    var searchQuery = {
      query: searchText
    };

    http.post("/searchGame", searchQuery).then(function(dataJSON) {
      this.search = dataJSON;
      console.log("search data: " + JSON.stringify(this.search));
      this.returnStatus();
    }.bind(this));
  },

  postGetGame: function(gameID) {
    console.log("getting gameID: " + gameID);

    var gameIDJSON = {
      gameID: gameID
    };

    http.post("/getGame", gameIDJSON).then(function(dataJSON) {
      var dataJSONSimplified = {
        game: dataJSON[0][0],
        tag: dataJSON[1]
      };

      this.search = dataJSONSimplified;
      console.log("getGame data: " + JSON.stringify(this.search));
      this.returnStatus();
    }.bind(this));
  },

  returnStatus: function() {
    this.trigger("change", this.search);
  }
});

module.exports = GameStore;
