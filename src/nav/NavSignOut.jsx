var React = require("react");
var ReactRouter = require("react-router");
var PropTypes = React.PropTypes;
var Link = ReactRouter.Link;
var NavItemMixIn = require("./NavItemMixIn.jsx");
var UserActions = require("../reflux/userActions.jsx");

var NavItem = React.createClass({
  mixins: [NavItemMixIn],
  propTypes: {
    style: PropTypes.object
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  handleSignOut: function(event) {
    event.preventDefault();
    UserActions.logout();
    this.context.router.push("/home");
  },

  render: function() {
    return (
      <li className = {this.state.hover ? "active" : ""} onMouseOver = {this.mouseOver} onMouseOut = {this.mouseOut}>
        <Link onClick = {this.handleSignOut} style = {this.props.linkStyle} to = "#">
            Sign Out
        </Link>
      </li>
    );
  }
});

module.exports = NavItem;
