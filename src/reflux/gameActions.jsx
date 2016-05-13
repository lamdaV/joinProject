var Reflux = require("reflux");

var GameActions = Reflux.createActions([
  "postSearchGame",
  "postGetGame",
  "postIsInLibrary",
  "postGetLibrary",
  "postDeleteGameFromLibrary"
]);

module.exports = GameActions;
