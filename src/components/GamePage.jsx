var React = require("react");
var Reflux = require("reflux");
var GameContentPanel = require("./GameContentPanel.jsx");
var GameStore = require("../reflux/gameStore.jsx");
var GameActions = require("../reflux/gameActions.jsx");

var GamePage = React.createClass({
  mixins: [Reflux.listenTo(GameStore, "displayResults")],

  getInitialState: function() {
    return ({gameID: ""});
  },

  componentDidMount: function() {
    // GameActions.
    this.setState({gameID: this.props.params.gameID});
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({gameID: nextProps.params.gameID});
  },

  render: function() {
    return (
      <div>
        {/* TODO: remove header after testing.*/}
        <h1>Game ID: {this.state.gameID}</h1>

        <div className = "panel-group">
          <GameContentPanel headerColor = "#563d7c" />
        </div>
      </div>
    );
  }
});

module.exports = GamePage;
