var React = require("react");
var EmailField = require("./EmailField.jsx");
var PasswordField = require("./PasswordField.jsx");
var TimezoneField = require("./TimezoneField.jsx");

var CreateAccountForm = React.createClass({
  onSubmit: function() {
    var isValid = this.checkValidity();
    if (isValid) {
      console.log("routing...");
      //TODO: transition to next page.
    } else {
      console.log("not all fields are valid");
    }
  },

  checkValidity: function() {
    this.refs.emailField.onBlur();
    this.refs.passwordField.onBlur();
    this.refs.timezoneField.onBlur();

    return this.refs.emailField.state.isValid && (this.refs.emailField.state.email.length != 0) && this.refs.passwordField.state.isValid && this.refs.timezoneField.state.isValid && (this.refs.timezoneField.state.timezone.length != 0);
  },

  render: function() {
    var panelBodyStyle = {
      minHeight: 150
    };

    return (
      <div className = "col-sm-12">
        <div className = "panel panel-primary">
          <div style = {panelBodyStyle} className = "panel panel-body">
            <form onSubmit = {this.onSubmit}>
              <div className = "row">
                <EmailField ref = "emailField"/>
              </div>

              <div className = "row">
                <PasswordField ref = "passwordField"/>
              </div>

              <div className = "row">
                <TimezoneField ref = "timezoneField"/>
              </div>

              <div className = "row">
                <button className = "btn btn-primary col-sm-offset-11"> Next </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CreateAccountForm;
