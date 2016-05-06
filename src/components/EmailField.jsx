var React = require("react");
var Validator = require("email-validator");

var EmailField = React.createClass({
  /*
    Define propTypes.
  */
  propTypes: {
    validityAlert: React.PropTypes.bool
  },

  /*
    Set default values of optional props.
  */
  getDefaultProps: function() {
    return {
      validityAlert: true
    };
  },

  /*
    Set the intial state values.
  */
  getInitialState: function() {
    return ({hasChanged: false, isValid: true, email: ""});
  },

  /*
    Once focus os off on this component, validate the email.
  */
  onBlur: function() {
    this.setState({isValid: Validator.validate(this.state.email)});
  },

  /*
    Clear the field inputs.
  */
  clear: function() {
    this.setState({isValid: true, email: ""});
  },

  /*
    Set the state value everytime the component receives input.
  */
  onChange: function(event) {
    this.setState({hasChanged: true, email: event.target.value});
  },

  /*
    Render the component.
  */
  render: function() {
    var formClass = this.state.isValid ? "col-sm-12 form-group" : "col-sm-12 form-group has-error";

    var divStyle = {
      marginTop: 10
    };

    return (
      <div className = {formClass}>
        <label htmlFor = "email"> Email: </label>
        <input id = "email" className = "form-control" onBlur = {this.onBlur} onChange = {this.onChange} placeholder = "Email" value = {this.state.email}></input>

        {/* Error messageing */}
        {(!this.state.isValid && this.props.validityAlert) ?
          <div style = {divStyle} className = "alert alert-danger"> Error: Invalid Email Address. </div> : null}
      </div>
    );
  }
});

module.exports = EmailField;
