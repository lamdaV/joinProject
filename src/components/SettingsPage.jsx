var React = require("react");
var Reflux = require("reflux");
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
    console.log("verify status: " + status);
    if (status) {
      this.setState({settingID: this.props.params.settingID});
    }
  },

  componentWillMount: function() {
    console.log("settings page mount...");
    AuthActions.postAuthenticate();
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({nextProps: nextProps.params.settingID});
  },

  render: function() {
    return(
      <h1> Settings of User: {this.state.settingID}</h1>
    );
  }
});

module.exports = SettingsPage;
