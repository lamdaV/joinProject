var Reflux = require("reflux");

var UserActions = Reflux.createActions([
  "postValidateUser",
  "postCreateUser",
  "postAddToLibrary",
  "logout"
]);

module.exports = UserActions;
