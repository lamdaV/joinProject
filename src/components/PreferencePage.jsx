var React = require("react");
var Reflux = require("reflux");
var UserActions = require("../reflux/userActions.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");

/* global localStorage */
var PreferencePage = React.createClass({
  mixins: [Reflux.listenTo(AuthStore, "verify")],

  propTypes: {
    params: React.PropTypes.object
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return ({preferenceID: ""});
  },

  verify: function(event, status) {
    if (status) {
      console.log("preference verify passed");
      if (localStorage.getItem("UserID") === this.props.params.preferenceID) {
        this.setState({preferenceID: this.props.params.preferenceID});
      } else {
        this.context.router.push("/home");
      }
    } else {
      console.log("preference verify failed");
      UserActions.logout();
      this.context.router.push("/home");
    }
  },

  componentWillMount: function() {
    AuthActions.postAuthenticate();
  },

  render: function() {
    return (
      <h1> Preference of User: {this.state.preferenceID}</h1>
    );
  }
});

module.exports = PreferencePage;
