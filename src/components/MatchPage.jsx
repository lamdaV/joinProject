var React = require("react");
var Reflux = require("reflux");
var MatchResults = require("./MatchResults.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var UserActions = require("../reflux/userActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");

var MatchPage = React.createClass({
  mixins: [Reflux.listenTo(AuthStore, "verify")],

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return ({matchID: ""});
  },

  verify: function(event, status) {
    if (status) {
      console.log("match verify passed");
      if (localStorage.getItem("UserID") === this.props.params.matchID) {
        this.setState({matchID: this.props.params.matchID});
      } else {
        this.context.router.push("/home");
      }
    } else {
      console.log("match verify failed");
      UserActions.logout();
      this.context.router.push("/home");
    }
  },

  componentWillMount: function() {
    console.log("matchID: " + this.props.params.matchID);
    AuthActions.postAuthenticate();
  },

  render: function() {
    return (
      <div>
        <h1> Matchings Page {this.state.matchID} </h1>
        <MatchResults />
      </div>
    );
  }
});

module.exports = MatchPage;
