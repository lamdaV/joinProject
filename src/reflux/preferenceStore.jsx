var http = require("../services/httpService.js");
var Reflux = require("reflux");
var PreferenceActions = require("./preferenceActions.jsx");

// global localStorate
var PreferenceStore = Reflux.createStore({
  //listen to PreferenceActions
  listenables: [PreferenceActions],

  init: function() {
    this.jwt = localStorate.getItem("jwt");
  },

  //create a preference
  postCreatePreference: function(platform, genre) {
    var preference = {
      platform: platform,
      genre: genre
    };

    http.post("/createPreference", preference).then(function(dataJSON) {
      console.log("preference create: " + JSON.stringify(dataJSON));
    });
  },

  //associate a preference with a user
  postAssociatePreference: function(preferenceID, userID) {
    var userPreference = {
      preferenceID: preferenceID,
      userID: userID
    };

    http.post("/associatePreference", userPreference).then(function(dataJSON) {
      console.log("preference associate: " + JSON.stringify(dataJSON));
    });
  }
});

module.exports = PreferenceStore;
