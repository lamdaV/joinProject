var React = require("react");

var MIN_PASSWORD_LENGTH = 8;

var PasswordField = React.createClass({
  /*
    Define propTypes.
  */
  propTypes: {
    validityAlert: React.PropTypes.bool,
    formError: React.PropTypes.bool,
    matchError: React.PropTypes.bool
  },

  /*
    Set default values for optional props.
  */
  getDefaultProps: function() {
    return {
      validityAlert: true,
      formError: true,
      matchError: false
    };
  },

  /*
    Set the intial state values.
  */
  getInitialState: function() {
    return ({hasChanged: false, isValid: true, password: ""});
  },

  /*
    When the component is not focus, check if the length of the password is valid.
  */
  onBlur: function() {
    if (this.state.password.length < MIN_PASSWORD_LENGTH) {
      this.setState({isValid: false});
    } else {
      this.setState({isValid: true});
    }
  },

  /*
    Clear the password.
  */
  clear: function() {
    this.setState({isValid: true, password: ""});
  },

  /*
    Handle inputs from the field as they are comming in.
  */
  onChange: function(event) {
    this.setState({hasChanged: true, password: event.target.value});
  },

  /*
    Render the component.
  */
  render: function() {
    var divStyle = {
      marginTop: 10
    };

    // Set the formClass values.
    var formClass;
    if (this.props.formError) {
      formClass = this.state.isValid ? "col-sm-12 form-group" : "col-sm-12 form-group has-error";
    } else {
      formClass = "col-sm-12  form-group";
    }

    var labelText = "Password";

    return (
      <div className = {formClass}>
        <label htmlFor = "password"> {labelText} </label>
        <input id = "password" className = "form-control" type = "password" onBlur = {this.onBlur} onChange = {this.onChange} placeholder = "Password" value = {this.state.password}></input>

        {/* Error Messages */}
        {(!this.state.isValid && this.props.validityAlert) ?
          <div style = {divStyle} className = "alert alert-danger"> Error: Invalid Password. </div> : null}

        {(this.props.matchError) ?
          <div style = {divStyle} className = "col-sm-12 alert alert-danger"> Error: Passwords do not match. </div> : null}
      </div>
    );
  }
});

module.exports = PasswordField;
