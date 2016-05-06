var React = require("react");
var ReactRouter = require("react-router");
var PropTypes = React.PropTypes;
var Link = ReactRouter.Link;
var NavItemMixIn = require("./NavItemMixIn.jsx");

var NavItem = React.createClass({
  /*
    Set up "abstract class."
  */
  mixins: [NavItemMixIn],

  /*
    Define propTypes.
  */
  propTypes: {
    linkStyle: React.PropTypes.object,
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    style: PropTypes.object
  },

  /*
    Render the component.
  */
  render: function() {
    var isInbox = this.props.title === "Inbox";
    return (
      <li className = {this.state.hover ? "active" : ""} onMouseOver = {this.mouseOver} onMouseOut = {this.mouseOut}>
        <Link style = {this.props.linkStyle} to = {this.props.href}>
          {this.props.title}
          {isInbox ? <span className = "badge">24</span> : null}
        </Link>
      </li>
    );
  }
});

module.exports = NavItem;
