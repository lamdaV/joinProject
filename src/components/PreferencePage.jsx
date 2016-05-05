var React = require("react");

var PreferencePage = React.createClass({

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return ({preferenceID: ""});
  },

  componentWillMount: function() {
    this.setState({preferenceID: this.props.params.preferenceID});
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({preferenceID: nextProps.params.preferenceID});
  },

  render: function() {
    return(
      <h1> Preference of User: {this.state.preferenceID}</h1>
    );
  }
});

module.exports = PreferencePage;
