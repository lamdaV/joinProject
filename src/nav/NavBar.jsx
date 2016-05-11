var React = require("react");
var NavItem = require("./NavItem.jsx");
var NavSignOut = require("./NavSignOut.jsx");
var NavDropdownItem = require("./NavDropdownItem.jsx");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;

var NavBar = React.createClass({
  /*
    Define propTypes.
  */
  propTypes: {
    bgColor: React.PropTypes.string,
    titleColor: React.PropTypes.string,
    linkColor: React.PropTypes.string,
    brandLink: React.PropTypes.string.isRequired,
    brandName: React.PropTypes.string.isRequired,
    enableSignOut: React.PropTypes.bool.isRequired,
    navData: React.PropTypes.array.isRequired
  },

  /*
    Set router for dynamic pushing.
  */
  contextTypes: {
    router: React.PropTypes.object
  },

  /*
    Set inital state values.
  */
  getInitialState: function() {
    return ({searchQuery: ""});
  },

  /*
    Handle search query by pushing to search page.
  */
  handleSearchSubmit: function(event) {
    event.preventDefault();
    console.log("submitting: " + this.state.searchQuery);
    this.setState({searchQuery: ""});
    this.context.router.push("/search/" + this.state.searchQuery);
  },

  /*
    Handle search inputs.
  */
  handleSearchChange: function(event) {
    console.log("searchQuery: " + event.target.value);
    this.setState({searchQuery: event.target.value});
  },

  /*
    Render the component.
  */
  render: function() {
    var navStyle = {
      WebkitBoxShadow: "0 0 4px rgba(0, 0, 0, 0.4)",
      MozBoxShadow: "0 0 0 4px rgba(0, 0, 0, 0.4)",
      boxShadow: "0 0 0 4px rgba(0, 0, 0, 0.4)",
      textShadow: "0 -1px 0 rgba(0,0,0,.15)",
      borderRadius: 0
    };

    var titleStyle = {};

    var linkStyle = {};

    // Optional Props
    if (this.props.bgColor) {
      navStyle.background = this.props.bgColor;
    }

    if (this.props.titleColor) {
      titleStyle.color = this.props.titleColor;
    }

    if (this.props.linkColor) {
      linkStyle.color = this.props.linkColor + "!important";
    }

    // Create link items. Used with map.
    var createLinkItem = function(item, index) {
      return (
        <NavItem linkStyle = {linkStyle} key = {item.title + index} href = {item.href} title = {item.title} />
      );
    };

    return (
      <div>
        <nav style = {navStyle} className = "navbar navbar-default navbar-fixed-top">
          <div className = "navbar-header">

            {/* Navbar collapsable button */}
            <button type = "button" className = "navbar-toggle collapsed" data-toggle = "collapse" data-target = "#nav-collapse">
              <span className = "sr-only">Toggle Navigation</span>
              <span className = "icon-bar"></span>
              <span className = "icon-bar"></span>
              <span className = "icon-bar"></span>
            </button>

            {/* Branding image */}
            <Link style = {titleStyle} className = "navbar-brand" to = {this.props.brandLink}> {this.props.brandName} </Link>
          </div>

          {/* Collapsed Items */}
          <div className = "collapse navbar-collapse" id = "nav-collapse">
            <ul className = "nav navbar-nav nav-pills">
              {this.props.enableSignOut ? <NavDropdownItem linkStyle = {linkStyle} /> : null}
              {this.props.navData.map(createLinkItem)}
              {this.props.enableSignOut ? <NavSignOut linkStyle = {linkStyle}/> : null}
            </ul>

            {/* signout */}
            {/* {this.props.enableSignOut ? <div onSubmit = {this.handleSignOut} onClick = {this.handleSignOut} className = "navbar-nav nav-pills">
            </div> : null} */}

            {/* Search */}
            <div>
              <form className = "navbar-form navbar-right">
                <div className = "form-group">
                  <input onChange = {this.handleSearchChange} type = "text" className = "form-control" placeholder = "Search" value = {this.state.searchQuery} />
                </div>

                <button onClick = {this.handleSearchSubmit} type = "submit" className = "btn btn-default">
                  <span className = "glyphicon glyphicon-search"></span>
                </button>
              </form>
            </div>

          </div>

        </nav>
      </div>
    );
  }
});

module.exports = NavBar;
