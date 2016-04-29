var React = require("react");
// var Link = ReactRouter.Link;
var Reflux = require("reflux");
var GameActions = require("../reflux/gameActions.jsx");
var GameStore = require("../reflux/gameStore.jsx");

var SearchResults = React.createClass({
  mixins: [Reflux.listenTo(GameStore, "displayResults")],

  getInitialState: function() {
    return ({searchQuery: "", results: {}});
  },

  displayResults: function(event, data) {
    console.log("DATA: " + JSON.stringify(data));
    // this.setState({})
  },

  componentDidMount: function() {
    this.setState({searchQuery: this.props.params.searchQuery});
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({searchQuery: nextProps.params.searchQuery});
  },

  render: function() {
    // var createSearchItem = function(item, index) {
    //   return (
    //     <SearchItem linkStyle = {linkStyle} key = {item.title + index} href = {item.href} title = {item.title} />
    //   );
    // };
    // <div className = "collapse navbar-collapse" id = "nav-collapse">
    //   <ul className = "nav navbar-nav nav-pills">
    //     {this.state.results.map(createSearchItem)}
    //   </ul>
    // </div>

    return (
      <h1> search page </h1>
    );
  }
});

module.exports = SearchResults;
