var Reflux = require("reflux");

var UserActions = Reflux.createActions([
  "postValidateUser",
  "postCreateUser",
  "postIsAuthenticated"
]);

module.exports = UserActions;
