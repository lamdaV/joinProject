var React = require("react");

var MIN_PASSWORD_LENGTH = 5;

var PasswordField = React.createClass({
  getDefaultProps: function() {
    return {
      validityAlert: true,
      formError: true,
      matchError: false
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
    console.log("in passwordfield on change");
    this.setState({hasChanged: true, password: event.target.value});
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({})
  },

  render: function() {
    var divStyle = {
      marginTop: 10
    };

    if (this.props.formError) {
      var formClass = this.state.isValid ? "col-sm-12 form-group" : "col-sm-12 form-group has-error";
    } else {
      var formClass = "col-sm-12  form-group";
    }

    var labelText = "Password"


    return (
      <div className = {formClass}>
        <label htmlFor = "password"> {labelText} </label>
        <input id = "password" className = "form-control" type = "password" onBlur = {this.onBlur} onChange = {this.onChange} placeholder = "Password" value = {this.state.password}></input>

        {/*Error Messages*/}
        {(!this.state.isValid  && this.props.validityAlert) ?
          <div style = {divStyle} className = "alert alert-danger"> Error: Invalid Password. </div> : null}

        {(this.props.matchError) ?
          <div style = {divStyle} className = "col-sm-12 alert alert-danger"> Error: Passwords do not match. </div> : null}
      </div>
    );
  }
});

module.exports = PasswordField;
