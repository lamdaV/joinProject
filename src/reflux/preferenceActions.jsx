var Reflux = require("reflux");

var PreferenceActions = Reflux.createActions([
  "postCreatePreference",
  "postAssociatePreference"
]);

module.exports = PreferenceActions;
