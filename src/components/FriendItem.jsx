var React = require("react");
var ReactRouter = require("react-router");
var NavItemMixIn = require("../nav/NavItemMixIn.jsx");
var Link = ReactRouter.Link;

// CONSTANTS
var LEFT_CLICK = 1;
var RIGHT_CLICK = 3;

var FriendItem = React.createClass({

  /*
    Definine propTypes.
  */
  propTypes: {
    linkStyle: React.PropTypes.object,
    email: React.PropTypes.string.isRequired,
    UserID: React.PropTypes.number.isRequired,
    propogator: React.PropTypes.func.isRequired,
    deletePropogator: React.PropTypes.func.isRequired
  },

  /*
  Set initial state values.
  */
  getInitialState: function() {
    return ({hover: false, showDelete: false});
  },

  /*
    Handle component mouse is over.
  */
  mouseOver: function() {
    this.setState({hover: true});
  },

  /*
    Handle component mouse is out.
  */
  mouseLeave: function() {
    this.setState({hover: false, showDelete: false});
  },

  handleLeftClick: function(event) {
    event.preventDefault();
    if (event.nativeEvent.which === LEFT_CLICK) {
      console.log("friendItem sending UserID: " + this.props.UserID);
      this.props.propogator(this.props.UserID, this.props.email);
    }
  },

  handleRightClick: function(event) {
    event.preventDefault();
    if (event.nativeEvent.which === RIGHT_CLICK) {
      console.log("showing delete button...");
      this.setState({showDelete: true});
    }
  },

  handleDelete: function(event) {
    event.preventDefault();
    console.log("deleting friend: " + this.props.UserID);
    this.props.deletePropogator(this.props.UserID);
  },

  render: function() {
    return (
      <li className = {this.state.hover ? "active" : ""} onMouseOver = {this.mouseOver} onMouseLeave = {this.mouseLeave} onContextMenu = {this.handleRightClick} >
        <Link onClick = {this.handleLeftClick} style = {this.props.linkStyle} to = "">
          {
            this.state.showDelete ?
              <div className = "row">
                <div className = "col-sm-8">
                  {this.props.email}
                </div>

                <div className = "col-sm-4">
                  <button className = "btn btn-danger" onClick = {this.handleDelete} type = "button">
                    Delete
                  </button>
                </div>
              </div>
            :
            <div className = "row">
              <div className = "col-sm-12">
                {this.props.email}
              </div>
            </div>
          }
        </Link>
      </li>
    );
  }
});

module.exports = FriendItem;
