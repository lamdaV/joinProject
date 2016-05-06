var React = require('react');
var ReactRouter = require('react-router');
var UserActions = require("../reflux/userActions.jsx");
var Link = ReactRouter.Link;

var NavDropdownItem = React.createClass({
  getInitialState: function() {
    return ({accountSettingRef: "", preferenceRef: ""});
  },

  componentWillMount: function() {
    var accountSettingRef = "/settings/" + localStorage.getItem("UserID");
    var preferenceRef = "/preference/" + localStorage.getItem("UserID");

    this.setState({accountSettingRef: accountSettingRef, preferenceRef: preferenceRef});
  },

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
