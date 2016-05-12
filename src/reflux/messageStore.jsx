var http = require("../services/httpService.js");
var Reflux = require("reflux");
var MessageActions = require("./messageActions.jsx");

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
      friends: null,
      messages: null
    };
  },

  /*
    Get the friends list of the logged in user.
  */
  postFriendList: function(userID) {
    console.log("postFriendList called");
    var userIDJSON = {
      UserID: userID
    };

    http.post("/friendList", userIDJSON).then(function(dataJSON) {
      console.log("friendList received: " + JSON.stringify(dataJSON));
      this.inboxData.friends = dataJSON[0];

      this.returnStatus();
    }.bind(this));
  },

  /*
    TODO: Method stub
  */
  getUnreadCount: function() {
    // Remember to add arguments.
  },

  /*
    TODO: Method stub
  */
  postMessageHistory: function(inboxID, chatUserID) {
    console.log("postMessageHistory called");
    var userIDs = {
      inboxID: inboxID,
      chatUserID: chatUserID
    };

    http.post("/messageHistory", userIDs).then(function(dataJSON) {
      console.log("messageHistory received: " + JSON.stringify(dataJSON));
      this.inboxData.messages = dataJSON[0];
      this.returnStatus();
    }.bind(this));
  },

  /*
    TODO: Method stub
  */
  postMessagePush: function(inboxID, chatUserID, message) {
    console.log("postMessagePush called");
    var messageJSON = {
      inboxID: inboxID,
      chatUserID: chatUserID,
      message: message
    };

    http.post("/messagePush", messageJSON).then(function(dataJSON) {
      console.log("messagePush received: " + JSON.stringify(dataJSON[1]));
      this.inboxData.messages = dataJSON[1];
      this.returnStatus();
    }.bind(this));
  },

  /*
    Push changes to all listers.
  */
  returnStatus: function() {
    this.trigger("change", this.inboxData);
  }
});

module.exports = MessageStore;
