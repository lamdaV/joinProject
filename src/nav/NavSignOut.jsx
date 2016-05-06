var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var NavItemMixIn = require("./NavItemMixIn.jsx");
var UserActions = require("../reflux/userActions.jsx");

var NavItem = React.createClass({
  /*
    Set "Abstract Class."
  */
  mixins: [NavItemMixIn],

  /*
    Define propTypes.
  */
  propTypes: {
    linkStyle: React.PropTypes.object
  },

  /*
    Set router for dynamic pushing.
  */
  contextTypes: {
    router: React.PropTypes.object
  },

  /*
    Handle the sign out.
  */
  handleSignOut: function(event) {
    event.preventDefault();
    UserActions.logout();
    this.context.router.push("/home");
  },

  /*
    Render the component.
  */
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
