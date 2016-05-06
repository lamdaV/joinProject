var React = require("react");

var GameContentPanel = React.createClass({
  getInitialState: function() {
    return ({title: "", rating: "", price: "", tags: null});
  },

  componentWillMount: function() {
    // Set some temp values.
    this.setState({title: "PlaceHolderTitle", rating: "A", price: "NaN"});
  },

  componentWillReceiveProps: function(nextProps) {
    console.log("GameContentPanel receiving props...");
    console.log("props data: " + JSON.stringify(nextProps.gameData));
    console.log("props tag: " + JSON.stringify(nextProps.gameTag));

    if (nextProps.gameData) {
      this.setState({title: nextProps.gameData.Title, rating: nextProps.gameData.Rating, price: nextProps.gameData.Price});
    }

    if (nextProps.gameTag) {
      this.setState({tags: nextProps.gameTag});
    }
  },

  render: function() {
    console.log("tag: " + this.state.tags);
    console.log("tag boolean: " + this.state.tags !== "");
    var divStyle = {
      marginTop: 10
    };

    var detailPanelStyle = {
      minHeight: 240
    };

    var pricePanelStyle = {
      minHeight: 240
    };

    var priceFontStyle = {
      marginTop: 80,
      color: "white",
      fontStyle: "Calibri",
      fontSize: 36
    };

    var panelHeaderStyle = {

    };

    if (this.props.headerColor) {
      panelHeaderStyle.background = this.props.headerColor;
      pricePanelStyle.background = this.props.headerColor;
    }

    var createTagLabel = function(item, index) {
      return (
        <span className = "label label-info" key = {item.TagName + index}> {item.TagName} </span>
      );
    };

    return (
      <div style = {divStyle}>
        <div className = "col-xs-9 col-sm-9">
          <div style = {detailPanelStyle} className = "panel panel-primary">
            {/* Game title */}
            <div style = {panelHeaderStyle} className = "panel-heading">
              <h1 className = "text-center"> {this.state.title} </h1>
            </div>

            {/* Game Details should go here */}
            <div className = "panel-body">
              <h3> Rating: {this.state.rating} </h3>
              {/* TODO: List tags here Potentially make as separate row */}
              <h3> Tags: </h3>
              {this.state.tags ? this.state.tags.map(createTagLabel) : null}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className = "col-xs-3 col-sm-3">
          <div className = "panel panel-default">
            <div style = {pricePanelStyle} className = "panel-heading">
              <div style = {priceFontStyle} className = "row text-center">
                ${this.state.price}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = GameContentPanel;
