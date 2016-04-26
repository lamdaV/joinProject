var React = require("react");
var SignInPanel = require("./SignInPanel.jsx");
var CreateAccountPanel = require("./CreateAccountPanel.jsx");
var UserActions = require("../reflux/userActions.jsx");

var HomePage = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  componentWillMount: function() {
    // If the user is authenticated skip the signup page.
    if (localStorage.getItem("jwt")) {
      if (UserActions.postIsAuthenticated()) {
        this.context.router.push("/testpage");
      }
    }
  },

  render: function() {
    return (
      <div className = "row">
        <div className = "panel-group">
          <SignInPanel headerColor = "#563d7c"></SignInPanel>
          <CreateAccountPanel headerColor = "#563d7c"></CreateAccountPanel>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
