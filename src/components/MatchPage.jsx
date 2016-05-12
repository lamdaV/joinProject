var React = require("react");
var Reflux = require("reflux");
var MatchResults = require("./MatchResults.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var UserActions = require("../reflux/userActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");
var MatchActions = require("../reflux/matchActions.jsx");
var MatchStore = require("../reflux/matchStore.jsx");

/* global localStorage */
var MatchPage = React.createClass({
  /*
    Listen to the AuthStore.
  */
  mixins: [Reflux.listenTo(AuthStore, "verify"), Reflux.listenTo(MatchStore, "setMatchings")],

  /*
    Define proptypes.
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
    Set initial state values.
  */
  getInitialState: function() {
    return ({matchID: this.props.params.matchID, matchings: null});
  },

  setMatchings: function(event, matches) {
    if (matches.data !== this.state.matchings) {
      console.log("setMatchings data: " + JSON.stringify(matches.data));
      this.setState({matchings: matches.data});
    }
  },

  /*
    If the User is authenticated and the user is not attempting to access someone else's MatchPage. Otherwise, push to home.
  */
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

  /*
    Authenticate before mounting the component.
  */
  componentWillMount: function() {
    console.log("matchID: " + this.props.params.matchID);
    AuthActions.postAuthenticate();
    MatchActions.postMatchings(this.state.matchID);
  },

  /*
    Create a MatchingResult. Use with map function.
  */
  createMatchingResult: function(item, index) {
    return (
      <MatchResults key = {item.UserID + index} userID = {item.UserID} score = {item.pointTotal} />
    );
  },

  /*
    Render the component.
  */
  render: function() {
    return (
      <div>
        <h1> Matchings Page {this.state.matchID} </h1>
        {this.state.matchings === null ? null : this.state.matchings.map(this.createMatchingResult)}
      </div>
    );
  }
});

module.exports = MatchPage;
