var React = require("react");
var EmailField = require("./EmailField.jsx");
var PasswordField = require("./PasswordField.jsx");
var Reflux = require("reflux");
var UserActions = require("../reflux/userActions.jsx");
var UserStore = require("../reflux/userStore.jsx");

var SignInPanel = React.createClass({
  mixins: [Reflux.listenTo(UserStore, "userValidation")],

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return ({error: false});
  },

  userValidation: function(event, data) {
    // Variable for stringification.
    // TODO: clean up logging.
    var dataCopy = data;
    console.log("userValidation data: " + JSON.stringify(dataCopy));
    console.log("userID: " + data.userID);
    if (data.userID != null) {
      this.context.router.push("/profile/" + data.userID);
    } else {
      // TODO: figure out how to handle failed logins
      alert("Invalid Email or Password");
    }
  },

  handleSubmit: function(event) {
    //TODO: Setup SQL handling and appropriate routing.
    event.preventDefault();
    var email = this.refs.emailField.state.email;
    var password = this.refs.passwordField.state.password;

    console.log("Email: " + email);
    console.log("Password: " + password);

    if (email.length > 0 && password.length > 0) {
      UserActions.postValidateUser(email, password);
    }
  },

  render: function() {
    var divStyle = {
      marginTop: 10
    };

    var panelHeaderStyle = {};

    if (this.props.headerColor) {
      panelHeaderStyle.background = this.props.headerColor;
    };

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
                  <button className = "btn btn-primary"> Sign in </button>
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
