var React = require("react");

var InboxPage = React.createClass({
  getInitialState: function() {
    return ({inboxID: ""});
  },

  componentWillMount: function() {
    this.setState({inboxID: this.props.params.inboxID});
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({inboxID: nextProps.params.inboxID});
  },

  render: function() {
    return(
      <h1>Inbox of User: {this.state.inboxID}</h1>
    );
  }
});

module.exports = InboxPage;
