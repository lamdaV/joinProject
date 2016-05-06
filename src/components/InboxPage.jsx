var React = require("react");
var Reflux = require("reflux");
var UserActions = require("../reflux/userActions.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");

var InboxPage = React.createClass({
  // Listen to the AuthStore.
  mixins: [Reflux.listenTo(AuthStore, "verify")],

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return ({inboxID: ""});
  },

  verify: function(event, status) {
    if (status) {
      console.log("inbox verify passed");
      if (this.state.inboxID !== localStorage.getItem("UserID")) {
        console.log("inbox illegal access");
        UserActions.logout();
        this.context.router.push("/home");
      }
    } else {
      console.log("inbox verify failed");
      UserActions.logout();
      this.context.router.push("/home");
    }
  },

  componentWillMount: function() {
    AuthActions.postAuthenticate();
    this.setState({inboxID: this.props.params.inboxID});
  },

  componentWillReceiveProps: function(nextProps) {
    AuthActions.postAuthenticate();
    this.setState({inboxID: nextProps.params.inboxID});
  },

  render: function() {
    return (
      <h1>Inbox of User: {this.state.inboxID}</h1>
    );
  }
});

module.exports = InboxPage;
