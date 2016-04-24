var Reflux = require("reflux");

var UserActions = Reflux.createActions([
  "postValidateUser",
  "postCreateUser"
]);

module.exports = UserActions;
