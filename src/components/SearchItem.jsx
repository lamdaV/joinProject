var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var NavItemMixIn = require("../nav/NavItemMixIn.jsx");

var SearchItem = React.createClass({
  mixins: [NavItemMixIn],

  propTypes: {
    item: React.PropTypes.object.isRequired,
    linkStyle: React.PropTypes.object
  },

  render: function() {
    var href = "/game/" + this.props.item.GameID;

    return (
      <li className = {this.state.hover ? "active" : ""} onMouseOver = {this.mouseOver} onMouseOut = {this.mouseOut}>
        <Link style = {this.props.linkStyle} to = {href}>
          {/* Text alignment using bootstrap grid system */}
          <div className = "row">
            {/* Title */}
            <div className = "col-sm-4">
              {this.props.item.Title}
            </div>

            {/* Price */}
            <div className = "col-sm-offset-4 col-sm-4">
              {this.props.item.Price}
            </div>
          </div>
        </Link>
      </li>
    );
  }
});

module.exports = SearchItem;
