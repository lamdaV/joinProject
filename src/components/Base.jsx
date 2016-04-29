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

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    console.log("base init: " + UserActions.postIsAuthenticated());
    return ({navLinks: initialNavLinks, canSignOut: false, brandLink: "/home"});
  },

  updateNavBar: function(event, data) {
    console.log("base data: " + JSON.stringify(data));
    var nextLinks = initialNavLinks;
    var canSignOut = false;
    var brandLink = "/home";
    if (data.length != 0 && data.UserID !== null && data.UserID == localStorage.getItem("UserID")) {
      var userProfileLink = "/profile/" + data.UserID;
      var nextLinks = [
        {
          title: "Profile",
          href: userProfileLink
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

      canSignOut = true;
    } else {
      this.context.router.push("/#");
    }

    if (userProfileLink) {
      brandLink = userProfileLink;
    }

    this.setState({navLinks: nextLinks, canSignOut: canSignOut, brandLink: brandLink});
  },

  render: function() {
    var childrenStyle = {
      marginTop: 80
    };

    // TODO: why does it need this childrenStyle?!?!
    return (
      <div>
        <NavBar bgColor = "#563d7c" titleColor = "#fff" linkColor = "cyan" navData = {this.state.navLinks} brandName = "Join" brandLink = {this.state.brandLink} enableSignOut = {this.state.canSignOut}/>

        <div className = "container">
          <div style = {childrenStyle} className = "row">
            {this.props.children}
          </div>
        </div>

        <div className = "container">
          <div className = "row">
            <h1>Generic Footer</h1>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Base;
