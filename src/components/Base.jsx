var React = require("react");
var NavBar = require("../nav/NavBar.jsx");
var Reflux = require("reflux");
var UserActions = require("../reflux/userActions.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");

var initialNavLinks = [
  {
    title: "Sign In",
    href: "/"
  },
  {
    title: "Create An Account",
    href: "/create"
  }
];

/* global localStorage */
var Base = React.createClass({
  /*
    Listen to the AuthStore.
  */
  mixins: [Reflux.listenTo(AuthStore, "updateNavBar")],

  /*
    Define propTypes.
  */
  propTypes: {
    children: React.PropTypes.object
  },

  /*
    Set router for dynamic pushing.
  */
  contextTypes: {
    router: React.PropTypes.object
  },

  /*
    Set the state.
  */
  getInitialState: function() {
    AuthActions.postAuthenticate();
    return ({navLinks: initialNavLinks, canSignOut: false, brandLink: "/home"});
  },

  /*
    Update the navbar based on authStatus.
  */
  updateNavBar: function(event, status) {
    console.log("base authStatus: " + status);
    var nextLinks = initialNavLinks;
    var canSignOut = false;
    var brandLink = "/home";
    var userProfileLink;

    // If authenticated, update the navbar.
    if (status) {
      userProfileLink = "/profile/" + localStorage.getItem("UserID");
      nextLinks = [
        {
          title: "Profile",
          href: userProfileLink
        },
        // TODO: Remove when done testing
        {
          title: "Other User",
          href: "/profile/99"
        },
        {
          title: "Game Test",
          href: "/game/1001"
        },
        {
          title: "MatchMe",
          href: "/match/" + localStorage.getItem("UserID")
        },
        {
          title: "Inbox",
          href: "/inbox/" + localStorage.getItem("UserID")
        }
      ];
      canSignOut = true;
    // Otherwise, boot the user off.
    } else {
      console.log("BASE: User not authenticated");
      UserActions.logout();
      this.context.router.push("/home");
    }

    // Update brandLink when possible.
    if (userProfileLink) {
      brandLink = userProfileLink;
    }

    // Set the state to re-render.
    this.setState({navLinks: nextLinks, canSignOut: canSignOut, brandLink: brandLink});
  },

  /*
    Render the component.
  */
  render: function() {
    var childrenStyle = {
      marginTop: 80
    };

    return (
      <div>
        {/* Header/Navbar */}
        <NavBar bgColor = "#563d7c" titleColor = "#fff" linkColor = "cyan" navData = {this.state.navLinks} brandName = "Join" brandLink = {this.state.brandLink} enableSignOut = {this.state.canSignOut}/>

        {/* Content */}
        <div className = "container">
          <div style = {childrenStyle} className = "row">
            {this.props.children}
          </div>
        </div>

        {/* Footer */}
        <div className = "container">
          <div className = "row">
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Base;
