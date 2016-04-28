var React = require("react");
var NavBar = require("../nav/NavBar.jsx");
var Reflux = require("reflux");
var UserActions = require("../reflux/userActions.jsx");
var UserStore = require("../reflux/userStore.jsx");

// TODO: Set this correctly.
var initialNavLinks = [
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
  },
];

var Base = React.createClass({
  mixins: [Reflux.listenTo(UserStore, "updateNavBar")],

  getInitialState: function() {
    return ({navLinks: initialNavLinks});
  },

  updateNavBar: function(event, data) {
    if (data.userID != null) {
      var nextLinks = [
        {
          title: "Profile",
          href: "/profile/" + data.userID
        },
        {
          title: "Other User",
          href: "/profile/99"
        },
        {
          title: "Dark Souls 3",
          href: "/game/1"
        }
      ];
      this.setState({navLinks: nextLinks});
    }
  },

  render: function() {
    var childrenStyle = {
      marginTop: 80
    };

    return (
      <div>
        <NavBar bgColor = "#563d7c" titleColor = "#fff" linkColor = "cyan" navData = {this.state.navLinks} brandName = "Join" />

        <div className = "container">
          <div style = {childrenStyle} className = "row">
            {this.props.children}
          </div>
        </div>

        <h1>Generic Footer</h1>
      </div>
    );
  }
});

module.exports = Base;
