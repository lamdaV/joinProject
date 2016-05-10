var React = require("react");
var NavItemMixIn = require("../nav/NavItemMixIn.jsx");

var FriendItem = React.createClass({
  mixins: [NavItemMixIn],

  /*
    Definine propTypes.
  */
  propTypes: {
    email: React.PropTypes.string,
    UserID: React.PropTypes.number,
    propogator: React.PropTypes.func
  },

  handleClick: function(event) {
    event.preventDefault();
    console.log("friendItem sending UserID: " + this.props.UserID);
    this.props.propogator(this.props.UserID);
  },

  render: function() {
    return (
      <li className = {this.state.hover ? "active" : ""} onMouseOver = {this.mouseOver} onMouseOut = {this.mouseOut} onClick = {this.handleClick}>
      {/* TODO: switch <a> with <Link> */}
        {/* <Link style = {this.props.linkStyle} to = {this.props.href}>
          {this.props.title}
          {isInbox ? <span className = "badge">24</span> : null}
        </Link> */}
        <a href = "">
          {this.props.email}
        </a>
      </li>
    );
  }
});

module.exports = FriendItem;
