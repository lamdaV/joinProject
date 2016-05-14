var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var NavItemMixIn = require("../nav/NavItemMixIn.jsx");

var LibraryItem = React.createClass({
  /*
    Set up "Abstract Class"
  */
  mixins: [NavItemMixIn],

  /*
    Define propTypes.
  */
  propTypes: {
    item: React.PropTypes.object.isRequired,
    libraryID: React.PropTypes.string.isRequired,
    deletePropogator: React.PropTypes.func.isRequired,
    linkStyle: React.PropTypes.object
  },

  handleDelete: function(event) {
    event.preventDefault();
    console.log("handle Delete");
    this.props.deletePropogator(this.props.item.GameID);
  },

  /*
    Render the component.
  */
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

            <div className = "col-sm-offset-4 col-sm-4 text-right">
              <button className = "btn btn-danger" type = "button" onClick = {this.handleDelete} > Delete </button>
            </div>
          </div>
        </Link>
      </li>
    );
  }
});

module.exports = LibraryItem;
