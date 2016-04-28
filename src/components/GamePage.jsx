var React = require("react");
var GameContentPanel = require("./GameContentPanel.jsx");

var GamePage = React.createClass({
  getInitialState: function() {
    return ({gameID: ""});
  },

  componentDidMount: function() {
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
