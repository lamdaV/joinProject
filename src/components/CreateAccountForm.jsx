var React = require("react");
var EmailField = require("./EmailField.jsx");
var PasswordField = require("./PasswordField.jsx");
var TimezoneRadioGroup = require("./TimezoneRadioGroup.jsx");
var Reflux = require("reflux");
var AuthActions = require("../reflux/authActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");
var UserActions = require("../reflux/userActions.jsx");
var UserStore = require("../reflux/userStore.jsx");

/* global localStorage */
var CreateAccountForm = React.createClass({
  // Listen to the UserStore.
  mixins: [Reflux.listenTo(UserStore, "createUser"), Reflux.listenTo(AuthStore, "verify")],

  // Define router for dynamic pushing.
  contextTypes: {
    router: React.PropTypes.object
  },

  /*
    Set initial state.
  */
  getInitialState: function() {
    return ({matchError: false, errorUserNotUnique: false});
  },

  // Update the component based on authStatus.
  verify: function(event, status) {
    // If user is already signed in, do not allow user to create another account.
    if (status) {
      console.log("create form verify passed");
      this.context.router.push("/profile/" + localStorage.getItem("UserID"));
    } else {
      console.log("create form verify failed");
    }
  },

  /*
    Create a user based on UserStore.
  */
  createUser: function(event, data) {
    console.log("userValidation data: " + JSON.stringify(data));
    console.log("userID: " + data.UserID);
    console.log("status: " + data.status);

    // TODO: change where this is routed. (possibly preference page)
    // Route the User creation was successful.
    if (data.UserID > 0 && data.status === 0) {
      console.log("Routing...");
      this.context.router.push("/profile/" + data.UserID);
    // User Exists, setState to render UI response.
    } else if (data.status === 2) {
      console.log("User already exists...");
      this.setState({errorUserNotUnique: true});
    } else {
      console.log("failed to create");
    }
  },

  /*
    Handle the submission of data.
  */
  handleSubmit: function(event) {
    // TODO: BUG: If user failed to submit once and it was caught, the user must click next twice.
    // Do not do button default.
    event.preventDefault();

    // Evaluate field validity.
    var isValid = this.checkValidity();

    // Get each field variable.
    var email = this.refs.emailField.state.email;
    var password = this.refs.passwordField.state.password;
    var timezone = this.refs.timezoneRadio.state.selectedValue;

    // Log.
    console.log("email: " + email);
    console.log("password: " + password);
    console.log("timezone: " + timezone);

    // Send a UserStore action to create a user.
    if (isValid) {
      UserActions.postCreateUser(email, password, timezone);
    } else {
      console.log("Not all fields are valid");
    }
  },

  /*
    Evaluate that the fields are all valid.
  */
  checkValidity: function() {
    this.refs.emailField.onBlur();
    this.refs.passwordField.onBlur();
    this.checkPassword();
    this.refs.timezoneRadio.checkValidity();

    var hasChanged = this.refs.emailField.state.hasChanged && this.refs.passwordField.state.hasChanged && this.refs.timezoneRadio.state.hasChanged;

    var isValid = this.refs.emailField.state.isValid &&
    this.refs.passwordField.state.isValid && this.refs.timezoneRadio.state.isValid;

    var isPasswordSame = this.refs.passwordField.state.password === this.refs.passwordFieldCheck.state.password;

    return hasChanged && isValid && isPasswordSame;
  },

  /*
    Evaluates the retyped password is correct.
  */
  checkPassword: function() {
    var password = this.refs.passwordField.state.password;
    var passwordCheck = this.refs.passwordFieldCheck.state.password;

    if (password === passwordCheck && password.length !== 0 && passwordCheck.length !== 0) {
      this.setState({matchError: false});
    } else {
      this.setState({matchError: true});
    }
  },

  /*
    Authticate when the component is ready to mount.
  */
  componentWillMount: function() {
    // If the user is authenticated skip the signin page.
    console.log("create form mounting...");
    if (localStorage.getItem("UserID") && localStorage.getItem("jwt")) {
      AuthActions.postAuthenticate();
    }
  },

  /*
    Render the component.
  */
  render: function() {
    var panelBodyStyle = {
      minHeight: 150
    };

    var buttonStyle = {
      background: "#563d7c"
    };

    return (
      <div className = "col-sm-12">
        <div className = "panel panel-primary">
          <div style = {panelBodyStyle} className = "panel panel-body">
            <form onSubmit = {this.handleSubmit}>
              {/* Email Field */}
              <div className = "row">
                <EmailField ref = "emailField"/>
              </div>

              {/* Password Field */}
              <div className = "row" >
                <PasswordField ref = "passwordField"/>
              </div>

              {/* Re:Password field */}
              <div className = "row" onBlur = {this.checkPassword}>
                <PasswordField ref = "passwordFieldCheck" labelText = "Re-enter Password" validityAlert = {false} matchError = {this.state.matchError}/>
              </div>

              {/* Timezone radios */}
              <div className = "row">
              <TimezoneRadioGroup ref = "timezoneRadio"/>
              </div>

              {/* Next Button*/}
              <div className = "row">
                <div className = "col-sm-12 col-lg-12">
                  <button className = "btn btn-primary" style = {buttonStyle}> Next </button>
                </div>
              </div>

              {/* Dynamic Error */}
              {this.state.errorUserNotUnique ?
              <div className = "row">
                <div className = "col-sm-12 alert alert-danger">
                  Error: User already exists.
                </div>
              </div> : null}

            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CreateAccountForm;
