var React = require("react");
var Reflux = require("reflux");
var GameContentPanel = require("./GameContentPanel.jsx");
var GameStore = require("../reflux/gameStore.jsx");
var GameActions = require("../reflux/gameActions.jsx");

var GamePage = React.createClass({
  mixins: [Reflux.listenTo(GameStore, "setGameData")],

  getInitialState: function() {
    return ({gameID: "", gameData: "", gameTag: ""});
  },

  setGameData: function(event, data) {
    var gameData = data.game;
    var gameTag = data.tag;
    console.log("setGameData game: " + JSON.stringify(gameData));
    console.log("setGameData tag: " + JSON.stringify(gameTag));
    this.setState({gameData: gameData, gameTag: gameTag});
  },

  componentDidMount: function() {
    GameActions.postGetGame(this.props.params.gameID);
    this.setState({gameID: this.props.params.gameID});
  },

  componentWillReceiveProps: function(nextProps) {
    GameActions.postGetGame(nextProps.params.gameID);
    this.setState({gameID: nextProps.params.gameID});
  },

  render: function() {
    console.log("state gameData: " + JSON.stringify(this.state.gameData));
    return (
      <div>
        {/* TODO: remove header after testing.*/}
        <h1>Game ID: {this.state.gameID}</h1>

        <div className = "panel-group">
          <GameContentPanel gameData = {this.state.gameData} gameTag = {this.state.gameTag} headerColor = "#563d7c" />
        </div>
      </div>
    );
  }
});

module.exports = GamePage;
