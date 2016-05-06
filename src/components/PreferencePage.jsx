var React = require("react");
var Reflux = require("reflux");
var UserActions = require("../reflux/userActions.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");

/* global localStorage */
var PreferencePage = React.createClass({
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
    Set router to dynamic pushing.
  */
  contextTypes: {
    router: React.PropTypes.object
  },

  /*
    Set initial state values.
  */
  getInitialState: function() {
    return ({preferenceID: ""});
  },

  /*
    If user is authenticated and the user is not trying to access someone else's preference page, setState to the props preferenceID. Otherwise, push to home.
  */
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
      <h1> Preference of User: {this.state.preferenceID}</h1>
    );
  }
});

module.exports = PreferencePage;
