var React = require("react");
var Reflux = require("reflux");
var MatchResults = require("./MatchResults.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var UserActions = require("../reflux/userActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");

/* global localStorage */
var MatchPage = React.createClass({
  /*
    Listen to the AuthStore.
  */
  mixins: [Reflux.listenTo(AuthStore, "verify")],

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
    return ({matchID: ""});
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
  },

  /*
    Render the component.
  */
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
