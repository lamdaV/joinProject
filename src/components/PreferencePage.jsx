var React = require("react");
var Reflux = require("reflux");
var UserActions = require("../reflux/userActions.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");

var PreferencePage = React.createClass({
  mixins: [Reflux.listenTo(AuthStore, "verify")],

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return ({preferenceID: ""});
  },

  verify: function(event, status) {
    if (status) {
      console.log("preference verify passed");
    } else {
      console.log("preference verify failed");
      UserActions.logout();
      this.context.router.push("/home");
    }
  },

  componentWillMount: function() {
    AuthActions.postAuthenticate();
    this.setState({preferenceID: this.props.params.preferenceID});
  },

  componentWillReceiveProps: function(nextProps) {
    AuthActions.postAuthenticate();
    this.setState({preferenceID: nextProps.params.preferenceID});
  },

  render: function() {
    return(
      <h1> Preference of User: {this.state.preferenceID}</h1>
    );
  }
});

module.exports = PreferencePage;
