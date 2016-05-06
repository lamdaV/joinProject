var React = require("react");
var Reflux = require("reflux");
var UserActions = require("../reflux/userActions.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");

var UserProfilePage = React.createClass({
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
    Set the intial state values.
  */
  getInitialState: function() {
    return ({userID: this.props.params.userID});
  },

  /*
    If the user is authenticate, do nothing. Otherwise, log the user out and push to home.
  */
  verify: function(events, status) {
    // If user is authenticated, do nothing.
    // Otherwise, logout and let Base handle the rest.
    if (status) {
      console.log("profile verify passed");
    } else {
      console.log("profile verify failed");
      UserActions.logout();
      this.context.router.push("/home");
    }
  },

  /*
    Authenticate before mounting.
  */
  componentDidMount: function() {
    console.log("userprofile mounting...");
    console.log("profile props UserID: " + this.props.params.userID);

    // Authenticate User.
    AuthActions.postAuthenticate();
  },

  /*
    Authenticate as component gets new props.
  */
  componentWillReceiveProps: function(nextProps) {
    AuthActions.postAuthenticate();
    this.setState({userID: nextProps.params.userID});
  },

  /*
    Render the component.
  */
  render: function() {
    return (
      <h1>User Profile Page for UserID: {this.state.userID}</h1>
    );
  }
});

module.exports = UserProfilePage;
