var React = require("react");
var Reflux = require("reflux");
var SignInPanel = require("./SignInPanel.jsx");
var CreateAccountPanel = require("./CreateAccountPanel.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");

/* global localStorage */
var HomePage = React.createClass({
  /*
    Listen to the AuthStore.
  */
  mixins: [Reflux.listenTo(AuthStore, "verify")],

  /*
    Set router for dynamic pushing.
  */
  contextTypes: {
    router: React.PropTypes.object
  },

  /*
    Push the user to their profile if they are authenticated.
  */
  verify: function(event, status) {
    // If authenticated, do not show the sign in page.
    if (status) {
      console.log("home page verify passed...");
      this.context.router.push("/profile/" + localStorage.getItem("UserID"));
    } else {
      console.log("home page verify failed");
    }
  },

  /*
    Authenticate before mounting.
  */
  componentWillMount: function() {
    // If the user is authenticated skip the signin page.
    console.log("home page mounting...");
    AuthActions.postAuthenticate();
  },

  /*
    Render the component.
  */
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
