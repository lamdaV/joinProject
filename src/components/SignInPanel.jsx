var React = require("react");
var EmailField = require("./EmailField.jsx");
var PasswordField = require("./PasswordField.jsx");
var Reflux = require("reflux");
var UserStore = require("../reflux/userStore.jsx");
var UserActions = require('../reflux/userActions.jsx');

var SignInPanel = React.createClass({
  /*
    Listen to the UserStore.
  */
  mixins: [Reflux.listenTo(UserStore, "userValidation")],

  /*
    Define propTypes.
  */
  propTypes: {
    headerColor: React.PropTypes.string
  },

  /*
    Set router for dynamic pushing.
  */
  contextTypes: {
    router: React.PropTypes.object
  },

  /*
    Set intial state values.
  */
  getInitialState: function() {
    return ({error: false});
  },

  /*
    Handle data returned from attempted sign in.
  */
  userValidation: function(event, data) {
    /* eslint-disable */
    if (data.UserID === -1) {
      // TODO: Improve UI.
      this.refs.passwordField.clear();
      alert("Invalid Email or Password");
      return;
    }
    /* eslint-disable */

    if (data.UserID > 0 && data.UserID !== null) {
      this.context.router.push("/profile/" + data.UserID);
    } else if (data.length === 0) {
      console.log("Do not alert!");
    }
  },

  /*
    Send field data to the server.
  */
  handleSubmit: function(event) {
    // TODO: Setup SQL handling and appropriate routing.
    event.preventDefault();
    var email = this.refs.emailField.state.email;
    var password = this.refs.passwordField.state.password;

    console.log("Email: " + email);
    console.log("Password: " + password);

    if (email.length > 0 && password.length > 0) {
      UserActions.postValidateUser(email, password);
    }
  },

  /*
    Render the component.
  */
  render: function() {
    var divStyle = {
      marginTop: 10
    };

    var buttonStyle = {
      background: "#563d7c"
    };

    var panelHeaderStyle = {};

    if (this.props.headerColor) {
      panelHeaderStyle.background = this.props.headerColor;
    }

    return (
      <div style = {divStyle} className = "col-xs-6 col-sm-6 col-lg-6">
        <div className = "panel panel-primary">
          <div style = {panelHeaderStyle} className = "panel-heading">
            <h3 className = "text-center"> Sign In </h3>
          </div>

          <div className = "panel-body">
            <form onSubmit = {this.handleSubmit}>
              {/* Username field */}
              <div className = "row">
                <EmailField validityAlert = {false} ref = "emailField" />
              </div>

              {/* Password field */}
              <div className = "row">
                <PasswordField validityAlert = {false} formError = {false} ref = "passwordField" />
              </div>

              {/* Sign in button */}
              <div style = {divStyle} className = "row">
                <div className = "col-xs-12 col-sm-12 col-lg-12">
                  <button style = {buttonStyle} className = "btn btn-primary"> Sign in </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = SignInPanel;
