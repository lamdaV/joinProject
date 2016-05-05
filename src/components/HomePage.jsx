var React = require("react");
var SignInPanel = require("./SignInPanel.jsx");
var CreateAccountPanel = require("./CreateAccountPanel.jsx");
var UserActions = require("../reflux/userActions.jsx");

var HomePage = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  componentWillMount: function() {
    // If the user is authenticated skip the signin page.
    UserActions.postIsAuthenticated();
    if (localStorage.getItem("UserID") !== "" && localStorage.getItem("UserID") !== null) {
      console.log("homepage authenticated");
      this.context.router.push("/profile/" + localStorage.getItem("UserID"));
    } else {
      console.log("home mounting...");
    }
  },

  render: function() {
    return (
      <div>
        <div className = "panel-group">
          <SignInPanel headerColor = "#563d7c"></SignInPanel>
          <CreateAccountPanel headerColor = "#563d7c"></CreateAccountPanel>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
