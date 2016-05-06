var React = require("react");
var Validator = require("email-validator");

var EmailField = React.createClass({
  getDefaultProps: function() {
    return {
      validityAlert: true
    };
  },

  getInitialState: function() {
    return ({hasChanged: false, isValid: true, email: ""});
  },

  onBlur: function() {
    this.setState({isValid: Validator.validate(this.state.email)});
  },

  clear: function() {
    this.setState({isValid: true, email: ""});
  },

  onChange: function(event) {
    this.setState({hasChanged: true, email: event.target.value});
  },

  render: function() {
    var formClass = this.state.isValid ? "col-sm-12 form-group" : "col-sm-12 form-group has-error";

    var divStyle = {
      marginTop: 10
    };

    return (
      <div className = {formClass}>
        <label htmlFor = "email"> Email: </label>
        <input id = "email" className = "form-control" onBlur = {this.onBlur} onChange = {this.onChange} placeholder = "Email" value = {this.state.email}></input>
        {(!this.state.isValid && this.props.validityAlert) ?
          <div style = {divStyle} className = "alert alert-danger"> Error: Invalid Email Address. </div> : null}
      </div>
    );
  }
});

module.exports = EmailField;
