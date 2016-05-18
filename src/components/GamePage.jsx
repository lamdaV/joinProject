var React = require("react");
var Reflux = require("reflux");
var GameContentPanel = require("./GameContentPanel.jsx");
var GameStore = require("../reflux/gameStore.jsx");
var GameActions = require("../reflux/gameActions.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");

/* global localStorage */
var GamePage = React.createClass({
  /*
    Listen to the GameStore.
  */
  mixins: [Reflux.listenTo(GameStore, "setGameData"), Reflux.listenTo(AuthStore, "verify")],

  /*
    Define propTypes.
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
    Set the initial state.
  */
  getInitialState: function() {
    return ({gameID: this.props.params.gameID, gameData: null, gameTag: null, gamePlatform: null, isLoggedIn: false, userID: ""});
  },

  /*
    Once data is received from GameStore, set the state accordingly.
  */
  setGameData: function(event, gameData) {
    if (gameData.details) {
      var gameSpecs = gameData.details.game;
      var gameTag = gameData.details.tag;
      var gamePlatform = gameData.details.platform;
      console.log("setGameData game: " + JSON.stringify(gameSpecs));
      console.log("setGameData tag: " + JSON.stringify(gameTag));
      console.log("setGameData platform: " + JSON.stringify(gamePlatform));
      this.setState({gameData: gameSpecs, gameTag: gameTag, gamePlatform: gamePlatform});
    }
  },

  /*
    Ensure the user is logged in before showing the Add to Library button.
  */
  verify: function(event, status) {
    if (status) {
      console.log("gamePage verify passed");
      this.setState({isLoggedIn: true, userID: localStorage.getItem("UserID")});
    } else {
      console.log("gamePage verify failed");
    }
  },

  /*
    Call postGetGame when component is about to mount.
  */
  componentWillMount: function() {
    AuthActions.postAuthenticate();
    GameActions.postGetGame(this.props.params.gameID);
  },

  /*
    Call postGetGame if new props are received.
  */
  componentWillReceiveProps: function(nextProps) {
    AuthActions.postAuthenticate();
    GameActions.postGetGame(nextProps.params.gameID);
    this.setState({gameID: nextProps.params.gameID});
  },

  /*
    Render the component.
  */
  render: function() {
    console.log("state gameData: " + JSON.stringify(this.state.gameData));
    return (
      <div>
        <div className = "panel-group">
          <GameContentPanel gameData = {this.state.gameData} gameTag = {this.state.gameTag} gamePlatform = {this.state.gamePlatform} headerColor = "#563d7c" gameID = {this.state.gameID} isLoggedIn = {this.state.isLoggedIn} userID = {this.state.userID} />
        </div>
      </div>
    );
  }
});

module.exports = GamePage;
