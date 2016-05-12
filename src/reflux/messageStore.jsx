var http = require("../services/httpService.js");
var Reflux = require("reflux");
var MessageActions = require("./messageActions.jsx");

/* global localStorage */
var MessageStore = Reflux.createStore({
  /*
    Listen to GameActions.
  */
  listenables: [MessageActions],

  /*
    Initialize inboxData.
  */
  init: function() {
    console.log("MessageStore init...");
    this.inboxData = {
      friends: null
    };
  },

  /*
    Get the friends list of the logged in user.
  */
  postFriendList: function(userID) {
    console.log("postFriendList called");
    var userID = {
      UserID: userID
    };

    http.post("/friendList", userID).then(function(dataJSON) {
      console.log("friendList received: " + JSON.stringify(dataJSON));
      this.inboxData.friends = dataJSON[0];

      this.returnStatus();
    }.bind(this));
  },

  /*
    TODO: Method stub
  */
  getUnreadCount: function(arg) {

  },

  /*
    TODO: Method stub
  */
  postMessageHistory: function(arg) {

  },

  /*
    TODO: Method stub
  */
  postMessagePush: function(arg) {

  },

  /*
    Push changes to all listers.
  */
  returnStatus: function() {
    this.trigger("change", this.inboxData);
  }
});

module.exports = MessageStore;
