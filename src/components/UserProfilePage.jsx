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

  componentWillReceiveProps: function() {
    // TODO: Route from profile to profile properly.
    // if (typeof nextProps !== "undefined") {
    //   this.setState({userID: nextProps.params.userID});
    // } else {
    //   console.log("params: " + JSON.stringify(this.props.params));
    //   console.log("pathname: " + this.props.location.pathname);
    //   // this.context.router.push(this.props.location.pathname);
    //   this.setState({userID: this.props.params.userID});
    // }
    this.setState({userID: nextProps.params.productID});
  },

  render: function() {
    return (
      <h1>User Profile Page for UserID: {this.state.userID}</h1>
    );
  }
});

module.exports = UserProfilePage;
