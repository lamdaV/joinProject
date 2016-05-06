var React = require("react");

var TimezoneField = React.createClass({
  getDefaultProps: function() {
    return {
      validityAlert: true
    };
  },

  getInitialState: function() {
    return ({isValid: true, timezone: ""});
  },

  onBlur: function() {
    var data = this.state.timezone;
    data = data.toLowerCase();

    if (data === "pacific" || data === "mountain" || data === "central" || data === "eastern") {
      this.setState({isValid: true});
    } else {
      this.setState({isValid: false});
    }
  },

  onChange: function(event) {
    this.setState({timezone: event.target.value});
  },

  render: function() {
    var formClass = this.state.isValid ? "col-sm-12 form-group" : "col-sm-12 form-group has-error";

    var divStyle = {
      marginTop: 10
    };

    return (
      <div className = {formClass}>
        <label htmlFor = "timezone"> Time Zone: </label>
        <input id = "timezone" className = "form-control" onBlur = {this.onBlur} onChange = {this.onChange} placeholder = "Pacific, Mountain, Central, or Eastern" value = {this.state.timezone}></input>
        {(!this.state.isValid && this.props.validityAlert) ?
          <div style = {divStyle} className = "alert alert-danger"> Error: Invalid Time Zone. </div> : null}
      </div>
    );
  }
});

module.exports = TimezoneField;
