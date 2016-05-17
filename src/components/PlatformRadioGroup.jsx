var React = require("react");
var RadioGroup = require("react-radio-group");

var PlatformRadioGroup = React.createClass({

  propTypes: {
    validityAlert: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      validityAlert: true
    };
  },

  getInitialState: function() {
    return ({hasChanged: false, isValid: true, selectedValue: ""});
  },

  /*
    Check that an option is selected
  */
  checkValidity: function() {
    this.setState({isValid: this.state.selectedValue !== ""});
  },

  /*
    Handle changes between radio buttons
  */
  handleChange: function(event) {
    this.setState({hasChanged: true, selectedValue: event});
  },

  render: function() {
    return (
      <div className = "col-sm-12 form-group">
        <label htmlFor = "platform"> Platform: </label>
        <RadioGroup id = "platform" name = "platform" selectedValue = {this.state.selectedValue} onChange = {this.handleChange}>
          {Radio => (
            <div className = "row">
              <label className = "col-sm-3">
                <Radio value = "computer" checked/> Computer
              </label>
              <label className = "col-sm-3">
                <Radio value = "playstation"/> PlayStation
              </label>
              <label className = "col-sm-3">
                <Radio value = "xbox"/> Xbox
              </label>
              <label className = "col-sm-3">
                <Radio value = "wii"/> Wii
              </label>
            </div>
          )}
        </RadioGroup>

        {(!this.state.isValid && this.props.validityAlert) ?
          <div className = "alert alert-danger"> Error: Please select a platform. </div> : null}
      </div>
    );
  }
});

module.exports = PlatformRadioGroup;