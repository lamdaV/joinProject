var Reflux = require("reflux");

var GameActions = Reflux.createActions([
  "postSearchGame",
  "postGetGame",
  "postIsInLibrary"
]);

module.exports = GameActions;
