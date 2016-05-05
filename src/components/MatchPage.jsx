var React = require("react");
var MatchResults = require("./MatchResults.jsx");
var UserActions = require("../reflux/userActions.jsx");

var Matchings = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return ({matchID: ""});
  },

  componentWillMount: function() {
    UserActions.postIsAuthenticated();
    console.log("matchID: " + this.props.params.matchID);
    console.log("in match userID: " + localStorage.getItem("UserID"));
    if (localStorage.getItem("UserID") === this.props.params.matchID) {
      this.setState({matchID: this.props.params.matchID});
    } else {
      UserActions.logout();
      this.context.router.push("/home");
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({matchID: nextProps.params.matchID});
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

module.exports = Matchings;
