var React = require("react");
var NavBar = require("../nav/NavBar.jsx");
var Reflux = require("reflux");
var UserActions = require("../reflux/userActions.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");

// TODO: Set this correctly.
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

var Base = React.createClass({
  // Listen to the AuthStore.
  mixins: [Reflux.listenTo(AuthStore, "updateNavBar")],

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    AuthActions.postAuthenticate();
    return ({navLinks: initialNavLinks, canSignOut: false, brandLink: "/home"});
  },

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

  render: function() {
    var childrenStyle = {
      marginTop: 80
    };

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
