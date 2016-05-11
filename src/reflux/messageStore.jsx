var http = require("../services/httpService.js");
var Reflux = require("reflux");
var MessageActions = require("./MessageActions.jsx");

/* global localStorage */
var MessageStore = Reflux.createStore({

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
    this.trigger("change", this.authStatus);
  }
});

module.exports = MessageStore;
