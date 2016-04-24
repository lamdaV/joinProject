var React = require("react");
var NavBar = require("../nav/NavBar.jsx");

// TODO: Set this correctly.
var navLinks = [
  {
    title: "Sign In",
    href: "/"
  },
  {
    title: "Create An Account",
    href: "/create"
  },
  {
    title: "Games",
    href: "/game/1"
  }
];

var Base = React.createClass({
  render: function() {
    var childrenStyle = {
      marginTop: 80
    }
    return (
      <div>
        <div className = "row">
          <NavBar bgColor = "#563d7c" titleColor = "#fff" linkColor = "cyan" navData = {navLinks} brandName = "Join" />
        </div>

        <div style = {childrenStyle}>
          {this.props.children}
        </div>

        <h1>Generic Footer</h1>
      </div>
    );
  }
});

module.exports = Base;
