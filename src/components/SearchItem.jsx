var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var NavItemMixIn = require("../nav/NavItemMixIn.jsx");

var SearchItem = React.createClass({
  mixins: [NavItemMixIn],

  render: function() {
    var href = "/game/" + this.props.item.GameID;
    var displayTitle = this.props.item.Title + " " + this.props.item.Price


    return (
      <li className = {this.state.hover ? "active": ""} onMouseOver = {this.mouseOver} onMouseOut = {this.mouseOut}>
        <Link style = {this.props.linkStyle} to = {href}>
          {displayTitle}
        </Link>
      </li>
    );
  }
});

module.exports = SearchItem;
