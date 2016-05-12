var React = require("react");
var ReactRouter = require("react-router");
var NavItemMixIn = require("../nav/NavItemMixIn.jsx");
var Link = ReactRouter.Link;

var FriendItem = React.createClass({
  mixins: [NavItemMixIn],

  /*
    Definine propTypes.
  */
  propTypes: {
    linkStyle: React.PropTypes.object,
    email: React.PropTypes.string.isRequired,
    UserID: React.PropTypes.number.isRequired,
    propogator: React.PropTypes.func.isRequired
  },

  handleClick: function(event) {
    event.preventDefault();
    console.log("friendItem sending UserID: " + this.props.UserID);
    this.props.propogator(this.props.UserID, this.props.email);
  },

  render: function() {
    return (
      <li className = {this.state.hover ? "active" : ""} onMouseOver = {this.mouseOver} onMouseOut = {this.mouseOut}>
        <Link onClick = {this.handleClick} style = {this.props.linkStyle} to = "">
          {this.props.email}
        </Link>
      </li>
    );
  }
});

module.exports = FriendItem;
