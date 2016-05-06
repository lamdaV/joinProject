var React = require("react");
var Reflux = require("reflux");
var UserActions = require("../reflux/userActions.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");

var UserProfilePage = React.createClass({
  mixins: [Reflux.listenTo(AuthStore, "verify")],

  getInitialState: function() {
    return ({userID: ""});
  },

  contextTypes: {
    router: React.PropTypes.object
  },

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

  componentDidMount: function() {
    console.log("userprofile mounting...");
    console.log("profile props UserID: " + this.props.params.userID);

    // Authenticate User.
    AuthActions.postAuthenticate();
    this.setState({userID: this.props.params.userID});
  },

  componentWillReceiveProps: function(nextProps) {
    AuthActions.postAuthenticate();
    this.setState({userID: nextProps.params.userID});
  },

  render: function() {
    return (
      <h1>User Profile Page for UserID: {this.state.userID}</h1>
    );
  }
});

module.exports = UserProfilePage;
