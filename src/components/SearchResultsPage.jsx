var React = require("react");
var SearchItem = require("./SearchItem.jsx");
var Reflux = require("reflux");
var GameActions = require("../reflux/gameActions.jsx");
var GameStore = require("../reflux/gameStore.jsx");

var SearchResultsPage = React.createClass({
  mixins: [Reflux.listenTo(GameStore, "displayResults")],

  getInitialState: function() {
    return ({searchQuery: "", results: null});
  },

  displayResults: function(event, data) {
    console.log("display data: " + JSON.stringify(data));
    this.setState({results: data});
  },

  componentDidMount: function() {
    console.log("searchquery did mount: " + this.props.params.searchQuery);
    GameStore.postSearchGame(this.props.params.searchQuery);
    this.setState({searchQuery: this.props.params.searchQuery});
  },

  componentWillReceiveProps: function(nextProps) {
    console.log("search receiveProps: " + nextProps.params.searchQuery);
    GameStore.postSearchGame(nextProps.params.searchQuery);
    this.setState({searchQuery: nextProps.params.searchQuery});
  },

  render: function() {
    console.log("results: " + JSON.stringify(this.state.results));
    var linkStyle = {
      color: "magenta"
    };

    var createSearchItem = function(item, index) {
      return (
        <SearchItem linkStyle = {linkStyle} key = {item.Title + item.GameID + index} item = {item} />
      );
    };

    return (
      <div>
        <h1> Searching for: {this.state.searchQuery}</h1>
        {/* <div className = "collapse navbar-collapse" id = "nav-collapse"> */}
        <div className = "col-sm-12">
          <ul className = "nav nav-pills nav-stacked">
            {this.state.results ? this.state.results.map(createSearchItem) : null}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SearchResultsPage;
