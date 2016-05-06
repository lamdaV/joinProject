var Reflux = require("reflux");

var UserActions = Reflux.createActions([
  "postValidateUser",
  "postCreateUser",
  "logout"
]);

module.exports = UserActions;
