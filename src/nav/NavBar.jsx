var React = require("react");
var NavItem = require("./NavItem.jsx");
var ReactRouter = require("react-router");
var Reflux = require("reflux");

var UserActions = require("../reflux/userActions.jsx");
var Link = ReactRouter.Link;

var NavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return ({searchQuery: ""});
  },

  handleSignOut: function() {
    UserActions.logout();
    this.context.router.push("/home");
  },

  handleSearchSubmit: function(event) {
    event.preventDefault();
    console.log("submitting: " + this.state.searchQuery);
    this.context.router.push("/search/" + this.state.searchQuery);
  },

  handleSearchChange: function(event) {
    console.log("searchQuery: " + event.target.value);
    this.setState({searchQuery: event.target.value});
  },

  render: function() {
    var navStyle = {
      WebkitBoxShadow: "0 0 4px rgba(0, 0, 0, 0.4)",
      MozBoxShadow: "0 0 0 4px rgba(0, 0, 0, 0.4)",
      boxShadow: "0 0 0 4px rgba(0, 0, 0, 0.4)",
      textShadow: "0 -1px 0 rgba(0,0,0,.15)",
      borderRadius: 0,
    };

    var titleStyle = {};

    var linkStyle = {};

    // Optional Props
    if (this.props.bgColor) {
      navStyle.background = this.props.bgColor;
    };

    if (this.props.titleColor) {
      titleStyle.color = this.props.titleColor;
    };

    if (this.props.linkColor) {
      linkStyle.color = this.props.linkColor;
    };

    var createLinkItem = function(item, index) {
      return (
        <NavItem linkStyle = {linkStyle} key = {item.title + index} href = {item.href} title = {item.title} />
      );
    };

    return (
      <div>
        <nav style = {navStyle} className = "navbar navbar-default navbar-fixed-top">
          <div className = "navbar-header">

            {/*Navbar collapsable button*/}
            <button type = "button" className = "navbar-toggle" data-toggle = "collapse" data-target = "#nav-collapse">
              <span className = "icon-bar"></span>
              <span className = "icon-bar"></span>
              <span className = "icon-bar"></span>
            </button>

            {/*Branding image*/}
            <Link style = {titleStyle} className = "navbar-brand" to = "/home"> {this.props.brandName} </Link>
          </div>

          {/*Collapsed Items*/}
          <div className = "collapse navbar-collapse" id = "nav-collapse">
            <ul className = "nav navbar-nav nav-pills">
              {this.props.navData.map(createLinkItem)}
            </ul>

            {/*signout*/}
            {/*TODO: Get Pill to work*/}
            <div onSubmit = {this.handleSignOut} onClick = {this.handleSignOut} className = "navbar-nav nav-pills">
              {/*<ul className = "nav navbar-nav nav-pills">
                  <NavItem linkStyle = {linkStyle} href = "/" key = "signoutPill" id = "121" title = "Sign Out"></NavItem>
              </ul>*/}
              <button type="submit" className ="btn btn-default">Sign Out</button>
            </div>

            {/*Search*/}
            {/*TODO: Make search components*/}
            <div>
              <form className = "navbar-form navbar-right">
                <div className = "form-group">
                  <input onChange = {this.handleSearchChange} type="text" className ="form-control" placeholder="Search" value = {this.state.searchQuery} />
                </div>

                <button onClick = {this.handleSearchSubmit} type="submit" className ="btn btn-default">Submit</button>
              </form>
            </div>

          </div>

        </nav>
      </div>
    );
  }
});

module.exports = NavBar;
