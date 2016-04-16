var React = require("react");
var BrowserHistory = require("react-router").browserHistory;

var CreateAccountPanel = React.createClass({
  handleSignUp: function() {
    //TODO: HTML transfer.
    console.log("Moving to Create Account page...");
    this.props.onClick();
    // Sets url but does not update page.
    // BrowserHistory.push("/testpage");
  },

  render: function() {
    var divStyle = {
      marginTop: 10
    };

    var panelBodyStyle = {
      minHeight: 150
    };

    return (
      <div style = {divStyle} className = "col-xs-6 col-sm-6 col-lg-6">
        <div className = "panel panel-primary">
          <div className = "panel-heading">
            <h3 className = "text-center"> Create an Account </h3>
          </div>

          <div style = {panelBodyStyle} className = "row panel-body text-center">
            <button onClick = {this.handleSignUp} className = "btn btn-primary center-block"> Sign Up </button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CreateAccountPanel;
