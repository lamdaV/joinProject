var React = require("react");
var UserActions = require("../reflux/userActions.jsx");

var UserProfilePage = React.createClass({
  getInitialState: function() {
    return ({userID: ""});
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  componentDidMount: function() {
    console.log("userprofile mounting...");
    console.log("profile check 1: " + localStorage.getItem("UserID"));
    console.log("profile check 2: " + this.props.params.userID);
    if (localStorage.getItem("UserID") === this.props.params.userID) {
      this.setState({userID: this.props.params.userID});
    } else {
      UserActions.logout();
      this.context.router.push("/home");
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({userID: nextProps.params.userID});
  },

  render: function() {
    return (
      <h1>User Profile Page for UserID: {this.state.userID}</h1>
    );
  }
});

module.exports = UserProfilePage;
