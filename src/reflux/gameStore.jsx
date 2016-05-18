var http = require("../services/httpService.js");
var Reflux = require("reflux");
var GameActions = require("./gameActions.jsx");

/* global localStorage */
var GameStore = Reflux.createStore({
  /*
    Listen to GameActions.
  */
  listenables: [GameActions],

  /*
    Initialize store jwt.
  */
  init: function() {
    this.jwt = localStorage.getItem("jwt");
    if (this.jwt) {
      console.log("gameStore jwt init: " + JSON.stringify(this.jwt));
    }

    this.gameData = {
      searchData: null,
      details: null,
      isInLibrary: null,
      library: null
    };
  },

  /*
    Search for game by title.
  */
  postSearchGame: function(searchText) {
    console.log("searchText: " + searchText);
    var searchQuery = {
      query: searchText
    };

    http.post("/searchGame", searchQuery).then(function(dataJSON) {
      this.gameData.searchData = dataJSON;
      console.log("search data: " + JSON.stringify(this.search));
      this.returnStatus();
    }.bind(this));
  },

  /*
    Get Game by ID.
  */
  postGetGame: function(gameID) {
    console.log("getting gameID: " + gameID);

    this.gameData.details = null;
    var gameIDJSON = {
      gameID: gameID
    };

    http.post("/getGame", gameIDJSON).then(function(dataJSON) {
      var dataJSONSimplified = {
        game: dataJSON[0][0],
        tag: dataJSON[1],
        platform: dataJSON[2]
      };

      this.gameData.details = dataJSONSimplified;
      console.log("getGame data: " + JSON.stringify(this.gameData.details));
      this.returnStatus();
    }.bind(this));
  },

  /*
    Check if the given gameID is already in the user's library.
  */
  postIsInLibrary: function(userID, gameID) {
    console.log("isInLibrary Store");
    this.gameData.isInLibrary = null;
    var userData = {
      userID: userID,
      gameID: gameID
    };

    http.post("/isInLibrary", userData).then(function(dataJSON) {
      console.log("isInLibrary data: " + JSON.stringify(dataJSON));
      this.gameData.isInLibrary = dataJSON[0][0];
      this.returnStatus();
    }.bind(this));
  },

  /*
    Get the user library.
  */
  postGetLibrary: function(userID) {
    console.log("getLibrary: " + userID);
    this.gameData.library = null;
    var userData = {
      userID: userID
    };

    http.post("/getLibrary", userData).then(function(dataJSON) {
      console.log("getLibrary data: " + JSON.stringify(dataJSON));
      this.gameData.library = dataJSON[0];
      this.returnStatus();
    }.bind(this));
  },

  postDeleteGameFromLibrary: function(userID, gameID) {
    console.log("deleteGameFromLibrary: " + userID);
    var userData = {
      userID: userID,
      gameID: gameID
    };

    http.post("/deleteGameFromLibrary", userData);
  },

  /*
    Push changes to all listeners.
  */
  returnStatus: function() {
    this.trigger("change", this.gameData);
  }
});

module.exports = GameStore;
