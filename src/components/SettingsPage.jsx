var React = require("react");
var Reflux = require("reflux");
var UserActions = require("../reflux/userActions.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");

/* global localStorage */
var SettingsPage = React.createClass({
  mixins: [Reflux.listenTo(AuthStore, "verify")],

  propTypes: {
    params: React.PropTypes.object
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return ({settingID: ""});
  },

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

  componentWillMount: function() {
    AuthActions.postAuthenticate();
  },

  render: function() {
    return (
      <h1> Settings of User: {this.state.settingID}</h1>
    );
  }
});

module.exports = SettingsPage;
