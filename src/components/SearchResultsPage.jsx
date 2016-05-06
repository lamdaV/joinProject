var React = require("react");
var SearchItem = require("./SearchItem.jsx");
var Reflux = require("reflux");
var GameStore = require("../reflux/gameStore.jsx");

var SearchResultsPage = React.createClass({
  /*
    Listen to the GameStore.
  */
  mixins: [Reflux.listenTo(GameStore, "displayResults")],

  /*
    Define propTypes.
  */
  propTypes: {
    params: React.PropTypes.object
  },

  /*
    Set the intial state values.
  */
  getInitialState: function() {
    return ({searchQuery: this.props.params.searchQuery, results: null});
  },

  /*
    Display the results from the search query.
  */
  displayResults: function(event, data) {
    console.log("display data: " + JSON.stringify(data));
    this.setState({results: data});
  },

  /*
    Before mounting send a search query.
  */
  componentDidMount: function() {
    console.log("searchquery did mount: " + this.props.params.searchQuery);
    GameStore.postSearchGame(this.props.params.searchQuery);
  },

  /*
    Update and send search query with new props.
  */
  componentWillReceiveProps: function(nextProps) {
    console.log("search receiveProps: " + nextProps.params.searchQuery);
    GameStore.postSearchGame(nextProps.params.searchQuery);
    this.setState({searchQuery: nextProps.params.searchQuery});
  },

  /*
    Render the component.
  */
  render: function() {
    console.log("results: " + JSON.stringify(this.state.results));
    var linkStyle = {
      color: "magenta"
    };

    // Create the search items. Useed with map.
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
