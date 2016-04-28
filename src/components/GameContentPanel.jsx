var React = require("react");

var GameContentPanel = React.createClass({
  getInitialState: function() {
    return({title: "", rating: "", price: ""})
  },

  componentWillMount: function() {
    // TODO: rely on database data. probably props from above.
    this.setState({title: "Dark Souls 3", rating: "M", price: "59.99"});
  },

  render: function() {
    var divStyle = {
      marginTop: 10
    };

    var detailPanelStyle = {
      minHeight: 240,
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
    };

    return (
      <div style = {divStyle}>
        <div className = "col-xs-9 col-sm-9">
          <div style = {detailPanelStyle} className = "panel panel-primary">
            {/*Game title*/}
            <div style = {panelHeaderStyle} className = "panel-heading">
              <h1 className = "text-center"> {this.state.title} </h1>
            </div>

            {/*Game Details should go here*/}
            <div className = "panel-body">
              <h3> Rating: {this.state.rating} </h3>
              {/*TODO: List tags here Potentially make as separate row*/}
              <h3> Tags: </h3>
            </div>
          </div>
        </div>

        {/*Price*/}
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
