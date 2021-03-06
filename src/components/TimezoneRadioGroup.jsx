var React = require("react");
var RadioGroup = require("react-radio-group");

var TimezoneRadioGroup = React.createClass({
  /*
    Define propTypes.
  */
  propTypes: {
    validityAlert: React.PropTypes.bool
  },

  /*
    Set default values for optional props.
  */
  getDefaultProps: function() {
    return {
      validityAlert: true
    };
  },

  /*
    Set intial state values.
  */
  getInitialState: function() {
    return ({hasChanged: false, isValid: true, selectedValue: ""});
  },

  /*
    Check that a radio butotn is selected.
  */
  checkValidity: function() {
    if (this.state.selectedValue === "") {
      this.setState({isValid: false});
    } else {
      this.setState({isValid: true});
    }
  },

  /*
    Handle changes between radio buttons.
  */
  handleChange: function(event) {
    this.setState({hasChanged: true, selectedValue: event});
  },

  /*
    Render the component.
  */
  render: function() {
    var divStyle = {
      marginTop: 10
    };

    return (
      <div className = "col-sm-12 form-group">
        <label htmlFor = "timezone"> Time Zone: </label>
        <RadioGroup id = "timezone" name = "timezone" selectedValue = {this.state.selectedValue} onChange = {this.handleChange}>
          {Radio => (
            <div className = "row">
              <label className = "col-sm-3">
                <Radio value = "pacific"/> Pacific
              </label>
              <label className = "col-sm-3">
                <Radio value = "mountain"/> Mountain
              </label>
              <label className = "col-sm-3">
                <Radio value = "central"/> Central
              </label>
              <label className = "col-sm-3">
                <Radio value = "eastern"/> Eastern
              </label>
            </div>
          )}
        </RadioGroup>

        {(!this.state.isValid && this.props.validityAlert) ?
          <div style = {divStyle} className = "alert alert-danger"> Error: Please select a time zone. </div> : null}
      </div>
    );
  }
});

module.exports = TimezoneRadioGroup;
