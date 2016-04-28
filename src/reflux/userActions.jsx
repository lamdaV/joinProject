var Reflux = require("reflux");

var UserActions = Reflux.createActions([
  "postValidateUser",
  "postCreateUser",
  "postIsAuthenticated",
  "logout"
]);

module.exports = UserActions;
