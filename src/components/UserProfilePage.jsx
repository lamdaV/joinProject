var React = require("react");

var Page1 = React.createClass({
  getInitialState: function() {
    return ({userID: ""});
  },

  componentDidMount: function() {
    this.setState({userID: this.props.params.userID});
  },

  componentWillReceiveProps: function() {
    this.setState({userID: nextProps.params.userID});
  },

  render: function() {
    return (
      <h1>User Profile Page for UserID: {this.state.userID}</h1>
    );
  }
});

module.exports = Page1;
