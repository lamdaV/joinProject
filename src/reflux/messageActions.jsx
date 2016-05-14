var Reflux = require("reflux");

var MessageActions = Reflux.createActions([
  "postFriendList",
  "getUnreadCount",
  "postMessageHistory",
  "postMessagePush",
  "postDeleteFriend"
]);

module.exports = MessageActions;
