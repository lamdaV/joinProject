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

  postSearchGame: function(searchText) {
    console.log("searchText: " + searchText);
    var searchQuery = {
      "query": searchText
    }
    http.post("/searchGame", searchQuery).then(function(dataJSON) {
      this.search = dataJSON;
      console.log("search data: " + JSON.stringify(this.search));
      this.returnStatus();
    }.bind(this));
  },

  returnStatus: function() {
    this.trigger("change", this.search);
  }
});

module.exports = UserStore;
