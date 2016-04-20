var React = require("react");

var MIN_PASSWORD_LENGTH = 5;

var PasswordField = React.createClass({
  getDefaultProps: function() {
    return {
      validityAlert: true
    };
  },

  getInitialState: function() {
    return ({hasChanged: false, isValid: true, password: ""});
  },

  onBlur: function(data) {
    if (this.state.password.length < MIN_PASSWORD_LENGTH) {
      this.setState({isValid: false});
    } else {
      this.setState({isValid: true});
    }
  },

  clear: function() {
    this.setState({isValid: true, password: ""});
  },

  onChange: function(event) {
    this.setState({hasChanged: true, password: event.target.value});
  },

  render: function() {
    var divStyle = {
      marginTop: 10
    };

    var formClass = this.state.isValid ? "col-sm-12 form-group" : "col-sm-12 form-group has-error";

    return (
      <div className = {formClass}>
        <label htmlFor = "password"> Password: </label>
        <input id = "password" className = "form-control" type = "password" onBlur = {this.onBlur} onChange = {this.onChange} placeholder = "Password" value = {this.state.password}></input>
        {(!this.state.isValid  && this.props.validityAlert) ?
          <div style = {divStyle} className = "alert alert-danger"> Error: Invalid Password. </div> : null}
      </div>
    );
  }
});

module.exports = PasswordField;
