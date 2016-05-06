var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

/* global localStorage */
var NavDropdownItem = React.createClass({
  /*
    Define propTypes.
  */
  propTypes: {
    linkStyle: React.PropTypes.object
  },

  /*
    Set initial state values.
  */
  getInitialState: function() {
    return ({accountSettingRef: "", preferenceRef: ""});
  },

  /*
    Set links when mounting.
  */
  componentWillMount: function() {
    var accountSettingRef = "/settings/" + localStorage.getItem("UserID");
    var preferenceRef = "/preference/" + localStorage.getItem("UserID");

    this.setState({accountSettingRef: accountSettingRef, preferenceRef: preferenceRef});
  },

  /*
    Render the component.
  */
  render: function() {
    var linkStyle = {
      color: this.props.linkStyle.color,
      background: "#563d7c"
    };

    return (
        <li className="dropdown" style = {linkStyle}>
          <a href = "#" className = "dropdown-toggle" data-toggle = "dropdown" role = "button" aria-haspopup = "true" aria-expanded = "false" style = {linkStyle}>
            Settings
            <span style = {linkStyle} className="caret"></span>
          </a>
          <ul style = {linkStyle} className = "dropdown-menu">
            <li>
              <Link style = {linkStyle} to = {this.state.accountSettingRef}>
                Account Settings
              </Link>
            </li>
            <li>
              <Link style = {linkStyle} to = {this.state.preferenceRef}>
                Preferences
              </Link>
            </li>
          </ul>
        </li>
    );
  }
});

module.exports = NavDropdownItem;
