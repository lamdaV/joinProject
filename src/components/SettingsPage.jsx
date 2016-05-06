var React = require("react");
var Reflux = require("reflux");
var UserActions = require("../reflux/userActions.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");

/* global localStorage */
var SettingsPage = React.createClass({
  /*
    Listen to the AuthStore.
  */
  mixins: [Reflux.listenTo(AuthStore, "verify")],

  /*
    Define propTypes.
  */
  propTypes: {
    params: React.PropTypes.object
  },

  /*
    Set router for dynamic pushing.
  */
  contextTypes: {
    router: React.PropTypes.object
  },

  /*
    Set initial state values.
  */
  getInitialState: function() {
    return ({settingID: ""});
  },

  /*
    If the user is authenticated and the user is not trying to access someone else's settings page, set the state for settingID. Otherwise, push to home.
  */
  verify: function(event, status) {
    if (status) {
      console.log("setting verify passed");
      if (localStorage.getItem("UserID") === this.props.params.settingID) {
        this.setState({settingID: this.props.params.settingID});
      } else {
        this.context.router.push("/home");
      }
    } else {
      console.log("setting verify failed");
      UserActions.logout();
      this.context.router.push("/home");
    }
  },

  /*
    Authenticate before mounting.
  */
  componentWillMount: function() {
    AuthActions.postAuthenticate();
  },

  /*
    Render the component.
  */
  render: function() {
    return (
      <h1> Settings of User: {this.state.settingID}</h1>
    );
  }
});

module.exports = SettingsPage;
