var React = require("react");

var PasswordField = React.createClass({
  getInitialState: function() {
    return ({isValid: true, password: ""});
  },

  onBlur: function(data) {
    //TODO: password validation.
  },

  clear: function() {
    this.setState({isValid: true, password: ""});
  },

  onChange: function(data) {
    this.setState({password: data.target.value});
  },

  render: function() {
    var formClass = this.state.isValid ? "col-sm-12 form-group" : "col-sm-12 form-group has-error";

    return (
      <div className = {formClass}>
        <label htmlFor = "password"> Password: </label>
        <input id = "password" className = "form-control" type = "password" onBlur = {this.onBlur} onChange = {this.onChange} placeholder = "Password" value = {this.state.password}></input>
      </div>
    );
  }
});

module.exports = PasswordField;
