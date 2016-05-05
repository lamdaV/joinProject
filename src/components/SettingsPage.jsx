var React = require("react");
var UserActions = require("../reflux/userActions.jsx");

var SettingsPage = React.createClass({

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return ({settingID: ""});
  },

  componentWillMount: function() {
    this.setState({settingID: this.props.params.settingID});
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
