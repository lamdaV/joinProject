var React = require("react");

var NavItem = React.createClass({
  getInitialState: function() {
    return ({hover: false});
  },

  mouseOver: function(event) {
    this.setState({hover: true});
  },

  mouseOut: function(event) {
    this.setState({hover: false});
  },

  render: function() {
    return (
      <li className = {this.state.hover ? "active": ""} onMouseOver = {this.mouseOver} onMouseOut = {this.mouseOut}>
        <a style = {this.props.linkStyle} href = {this.props.href}>{this.props.title}</a>
      </li>
    );
  }
});

module.exports = NavItem;
