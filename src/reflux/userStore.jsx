var http = require("../services/httpService.js");
var Reflux = require("reflux");
var UserActions = require("./userActions.jsx");

var UserStore = Reflux.createStore({
  listenables: [UserActions],
  getValidateUser: function(email, password) {
    var user = {
      "email": email,
      "password": password
    };

    http.get("/signin", user).then(function(dataJSON) {
      this.user = dataJSON;
      this.returnStatus();
    }.bind(this));
  },

  returnStatus: function() {
    this.trigger("change", this.user);
  }
});

module.exports = UserStore;
