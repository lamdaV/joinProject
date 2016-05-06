var React = require("react");
var Reflux = require("reflux");
var UserActions = require("../reflux/userActions.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");

var SettingsPage = React.createClass({
  mixins: [Reflux.listenTo(AuthStore, "verify")],

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return ({settingID: ""});
  },

  verify: function(event, status) {
    if (status) {
      console.log("setting verify passed");
    } else {
      console.log("setting verify failed");
      UserActions.logout();
      this.context.router.push("/home");
    }
  },

  componentWillMount: function() {
    AuthActions.postAuthenticate();
    this.setState({settingID: this.props.params.settingID});
  },

  componentWillReceiveProps: function(nextProps) {
    AuthActions.postAuthenticate();
    this.setState({nextProps: nextProps.params.settingID});
  },

  render: function() {
    return (
      <h1> Settings of User: {this.state.settingID}</h1>
    );
  }
});

module.exports = SettingsPage;
