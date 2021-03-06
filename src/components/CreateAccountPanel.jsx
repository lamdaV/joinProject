var React = require("react");

var CreateAccountPanel = React.createClass({
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
    Move to the CreateAccountForm page.
  */
  handleSignUp: function(event) {
    event.preventDefault();
    console.log("Moving to Create Account page...");
    this.context.router.push("/create");
  },

  /*
    Render the component.
  */
  render: function() {
    var divStyle = {
      marginTop: 10
    };

    var panelBodyStyle = {
      minHeight: 225
    };

    var panelHeaderStyle = {};

    var buttonStyle = {
      background: "#563d7c"
    };

    if (this.props.headerColor) {
      panelHeaderStyle.background = this.props.headerColor;
    }

    return (
      <div style = {divStyle} className = "col-xs-6 col-sm-6 col-lg-6">
        {/* Create Account Header */}
        <div className = "panel panel-primary">
          <div style = {panelHeaderStyle} className = "panel-heading">
            <h3 className = "text-center"> Create an Account </h3>
          </div>

          {/* Sign up button */}
          <div style = {panelBodyStyle} onSubmit = {this.handleSignUp} className = "row panel-body text-center">
            <button style = {buttonStyle} onClick = {this.handleSignUp} className = "btn btn-primary center-block"> Sign Up </button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CreateAccountPanel;
