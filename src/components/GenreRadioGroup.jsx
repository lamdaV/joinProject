var React = require("react");
var RadioGroup = require("react-radio-group");

var GenreRadioGroup = React.createClass({

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
        <label htmlFor = "genre"> Genre: </label>
        <RadioGroup id = "genre" name = "genre" selectedValue = {this.state.selectedValue} onChange = {this.handleChange}>
          {Radio => (
            <div className = "row">
              <label className = "col-sm-3">
                <Radio value = "rpg" checked/> RPG
              </label>
              <label className = "col-sm-3">
                <Radio value = "shooter"/> Shooter
              </label>
              <label className = "col-sm-3">
                <Radio value = "adventure"/> Adventure
              </label>
              <label className = "col-sm-3">
                <Radio value = "arcade"/> Arcade
              </label>
            </div>
          )}
        </RadioGroup>

        {(!this.state.isValid && this.props.validityAlert) ?
          <div className = "alert alert-danger"> Error: Please select a genre. </div> : null}
      </div>
    );
  }
});

module.exports = GenreRadioGroup;
