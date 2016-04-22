var React = require("react");
var EmailField = require("./EmailField.jsx");
var PasswordField = require("./PasswordField.jsx");
var TimezoneRadioGroup = require("./TimezoneRadioGroup.jsx");

var CreateAccountForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return ({matchError: false});
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var isValid = this.checkValidity();
    console.log("Valid: " + isValid);

    // TODO: Transition to the correct page.
    if (isValid) {
      console.log("Routing...");
      this.context.router.push("/testpage");
    } else {
      console.log("Not all fields are valid");
    }
  },

  checkValidity: function() {
    this.refs.emailField.onBlur();
    this.refs.passwordField.onBlur();
    this.checkPassword();
    this.refs.timezoneRadio.checkValidity();

    var hasChanged = this.refs.emailField.state.hasChanged && this.refs.passwordField.state.hasChanged && this.refs.timezoneRadio.state.hasChanged;

    var isValid = this.refs.emailField.state.isValid &&
    this.refs.passwordField.state.isValid && this.refs.timezoneRadio.state.isValid;

    var isPasswordSame = this.refs.passwordField.state.password === this.refs.passwordFieldCheck.state.password;

    console.log("isPasswordSame: " + isPasswordSame);

    return hasChanged && isValid && isPasswordSame;
  },

  checkPassword: function() {
    var password = this.refs.passwordField.state.password;
    var passwordCheck = this.refs.passwordFieldCheck.state.password;

    if (password === passwordCheck && password.length != 0 && passwordCheck.length != 0) {
      this.setState({matchError: false});
    } else {
      this.setState({matchError: true});
    }
  },

  render: function() {
    var panelBodyStyle = {
      minHeight: 150
    };

    return (
      <div className = "col-sm-12">
        <div className = "panel panel-primary">
          <div style = {panelBodyStyle} className = "panel panel-body">
            <form onSubmit = {this.handleSubmit}>
              <div className = "row">
                <EmailField ref = "emailField"/>
              </div>

              <div className = "row" >
                <PasswordField ref = "passwordField"/>
              </div>

              <div className = "row" onBlur = {this.checkPassword}>
                <PasswordField ref = "passwordFieldCheck" labelText = "Re-enter Password" validityAlert = {false} matchError = {this.state.matchError}/>
              </div>

              <div className = "row">
              <TimezoneRadioGroup ref = "timezoneRadio"/>
              </div>

              <div className = "row">
                <div className = "col-sm-12 col-lg-12">
                  <button className = "btn btn-primary"> Next </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CreateAccountForm;
