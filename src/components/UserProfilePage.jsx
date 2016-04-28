var React = require("react");

var UserProfilePage = React.createClass({
  getInitialState: function() {
    return ({userID: ""});
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  componentDidMount: function() {
    this.setState({userID: this.props.params.userID});
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({userID: nextProps.params.userID});
  },

  render: function() {
    return (
      <h1>User Profile Page for UserID: {this.state.userID}</h1>
    );
  }
});

module.exports = UserProfilePage;
