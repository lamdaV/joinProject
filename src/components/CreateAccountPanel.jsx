var React = require("react");

var CreateAccountPanel = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  handleSignUp: function() {
    console.log("Moving to Create Account page...");
    this.context.router.push("/create");
  },

  render: function() {
    var divStyle = {
      marginTop: 10
    };

    var panelBodyStyle = {
      minHeight: 225
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
