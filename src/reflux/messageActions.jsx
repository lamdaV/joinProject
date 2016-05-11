var Reflux = require("reflux");

var MessageActions = Reflux.createActions([
  "getUnreadCount",
  "postMessageHistory",
  "postMessagePush"
]);

module.exports = MessageActions;
