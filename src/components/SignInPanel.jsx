var React = require("react");
var EmailField = require("./EmailField.jsx");
var PasswordField = require("./PasswordField.jsx");

var SignInPanel = React.createClass({
  getInitialState: function() {
      return {usernameText: "", passwordText: ""};
  },

  handleSubmit: function(event) {
    //TODO: Setup SQL handling and appropriate routing.
    event.preventDefault();
    console.log("Email: " + this.refs.fieldEmail.state.email);
    console.log("Password: " + this.refs.fieldPassword.state.password);
    alert("sql stuff should happen.");
  },

  render: function() {
    var divStyle = {
      marginTop: 10
    };

    return (
      <div style = {divStyle} className = "col-xs-6 col-sm-6 col-lg-6">
        <div className = "panel panel-primary">
          <div className = "panel-heading">
            <h3 className = "text-center"> Sign In </h3>
          </div>

          <div className = "panel-body">
            <form onSubmit = {this.handleSubmit}>
              {/* Username field */}
              <div className = "row">
                <EmailField validityAlert = {false} ref = "fieldEmail" />
              </div>

              {/* Password field */}
              <div className = "row">
                <PasswordField ref = "fieldPassword" />
              </div>

              {/* Sign in button */}
              <div style = {divStyle} className = "row">
                <button className = "btn btn-primary col-sm-offset-10"> Sign in </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = SignInPanel;
